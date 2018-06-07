<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Illuminate\Http\UploadedFile;
use Youtube;
use Redirect;
use PDF;
use League\Csv\Reader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\Tag;
use App\Video;
use App\Contact;
use App\Comment;
use App\Campaign;
use App\VideoCategory;
use App\VideoCollection;
use App\VideoShotType;
use App\Jobs\QueueEmail;
use App\Jobs\QueueVideo;
use App\Jobs\QueueVideoImport;
use App\Jobs\QueueVideoYoutubeUpload;
use App\Jobs\QueueVideoAnalysis;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use App\Http\Controllers\Controller;
use App\Notifications\SubmissionAlert;
use Carbon\Carbon as Carbon;

class AdminVideosController extends Controller
{
    /**
     * AdminVideosController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * @param Request $request
     * @param string $state
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request, $state = 'all')
    {
        $search_value = $request->input('search_value', null);
        $category_value = $request->input('category');
        $collection_value = $request->input('collection');
        $shot_value = $request->input('shot_type');
        $rights = $request->input('rights');

        $videos = new Video;

        if ($search_value) {
            $videos = $videos->where(function ($query) use ($search_value) {
                $query->where('title', 'LIKE', '%' . $search_value . '%')
                    ->orWhereHas('tags', function ($q) use ($search_value) {
                        $q->where('name', 'LIKE', '%' . $search_value . '%');
                    })
                    ->orWhereHas('contact', function ($q) use ($search_value) {
                        $q->where('email', 'LIKE', '%' . $search_value . '%');
                    })
                    ->orWhere('alpha_id', $search_value);
            });
        }

        if (!empty($category_value)) {
            $videos = $videos->where('video_category_id', $category_value);
        }

        if (!empty($collection_value)) {
            $videos = $videos->where('video_collection_id', $collection_value);
        }

        if (!empty($shot_value)) {
            $videos = $videos->where('video_shottype_id', $shot_value);
        }

        if (!empty($rights)) {
            $videos = $videos->where('rights', $rights);
        }

        if ($state != 'all') {
            if ($state == 'deleted') {
                $videos = $videos->onlyTrashed();
            }
            $videos = $videos->where('state', $state);

            session(['state' => $state]);
        }

        $videos = $videos->orderBy('created_at', 'DESC')->paginate(24);

        $data = [
            'state' => $state,
            'videos' => $videos,
            'user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        ];

        return view('admin.videos.index', $data);
    }

    /**
     * @param Request $request
     * @param $state
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function status(Request $request, $state, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();
        $previous_state = $video->state;
        $video->state = $state;

        // Send email
        if ($video->state == 'accepted') {
            $video->more_details_code = str_random(30);
            $video->more_details_sent = now();

            // Set to process for youtube and analysis
            if (empty($video->youtube_id) && $video->file) {
                QueueVideoYoutubeUpload::dispatch($video->id)
                    ->delay(now()->addSeconds(5));
            }

            // Send thanks notification email
            QueueEmail::dispatch($video->id, 'submission_accepted');

        } elseif ($video->state == 'rejected') {
            // Send thanks notification email
            QueueEmail::dispatch($video->id, 'submission_rejected');
        } elseif ($video->state == 'restricted' || $video->state == 'problem') {
            if (!empty($video->youtube_id) && $video->file) {
                // Make youtube video unlisted
                Youtube::setStatus($video->youtube_id, 'unlisted');
            }
        } elseif ($video->state == 'licensed') {
            // Check if licensed_at has already been set so we don't send contact/user another email
            if (!$video->licensed_at) {
                // Check if there is a contact for the video
                if (isset($video->contact->id)) {
                    // Send thanks notification email (via queue after 2mins)
                    QueueEmail::dispatch($video->id, 'submission_licensed')
                        ->delay(now()->addMinutes(2));
                    // added delay, just in case the youtube encoding needs to process
                }
            }
            // Also, need to check if video file has been moved for analysis + youtube (on licensed state only)
            if ($video->youtube_id && $video->file) {
                // Make youtube video public (if not NSFW)
                if (!$video->nsfw) {
                    Youtube::setStatus($video->youtube_id, 'public');
                }
            } else {
                // Set to process for youtube and analysis (if video not already on youtube)
                if (!$video->youtube_id && $video->file) {
                    $video->notify(new SubmissionAlert('MIKE ALERT for license video without youtubeid (Id: ' . $video->alpha_id . ')'));
                    QueueVideoYoutubeUpload::dispatch($video->id)
                        ->delay(now()->addSeconds(5));
                }
            }
            $video->licensed_at = now();
        }

        // Set user so we know who last changed the state of a video (helpful for youtube duplications)
        $video->user_id = (!empty(Auth::id()) ? Auth::id() : NULL);

        // Save video data to database
        $video->save();

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => 'Successfully ' . ucfirst($state) . ' Video',
                'state' => $state,
                'remove' => 'yes',
                'video_id' => $video->id,
                'video_alpha_id' => $video->alpha_id,
                'previous_state' => $previous_state,
            ]);
        }

        return Redirect::to('admin/videos/edit/' . $id . '/?previous_state=' . $previous_state)
            ->with([
                'note' => 'Successfully Updated Video',
                'note_type' => 'success',
            ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remind($id)
    {
        $video = Video::where('alpha_id', $id)->first();

        $video->more_details_sent = now();
        $video->reminders = $video->reminders ? $video->reminders + 1 : 1;
        $video->save();

        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'details_reminder');

        return Redirect::to('admin/videos/edit/' . $id)->with([
            'note' => 'Reminder sent',
            'note_type' => 'success',
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
            'user' => Auth::user(),
            'contact' => null,
            'contacts' => Contact::all(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'users' => User::all(),
            'creators' => Contact::orderBy('created_at', 'desc')->get(),
            'video' => null,
            'tags' => null,
        ];

        return view('admin.videos.create_edit', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $video = new Video();
        $video->alpha_id = VideoHelper::quickRandom();
        $video->title = $request->input('title');
        $video->description = $request->input('description');
        $video->contact_id = $request->input('creator_id');
        $video->user_id = Auth::user()->id;
        $video->save();

        return redirect()->route('videos.index')->with([
            'note' => 'New Video Successfully Added!',
            'note_type' => 'success',
        ]);
    }

    /**
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function edit(Request $request, string $id)
    {
        $video = Video::with('currentContract')
            ->where('alpha_id', $id)
            ->withTrashed()
            ->first();

        if (!$video) {
            return Redirect::to('admin/videos/')->with([
                'note' => 'Sorry, we could not find the video',
                'note_type' => 'error',
            ]);
        }

        $video_state = ($request->input('previous_state')) ? : $video->state;
        $next = Video::where('id', '<', $video->id)->where('state', '=', $video_state)
            ->orderBy('id', 'desc')
            ->first();

        $previous = Video::where('id', '>', $video->id)
            ->where('state', '=', $video_state)
            ->orderBy('id', 'asc')->first();

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'tags' => $video->tags,
            'previous' => $previous,
            'next' => $next,
            'contact' => $video->contact,
            'post_route' => url('admin/videos/update'),
            'button_text' => 'Update Video',
            'user' => Auth::user(),
            'contacts' => Contact::all(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'users' => User::all(),
            'creators' => Contact::orderBy('created_at', 'desc')->get(),
        ];

        return view('admin.videos.create_edit', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $video = Video::where('alpha_id', $request->input('id'))->first();

        if(!$video) {
            abort(404);
        }

        $tags = $request->input('tags', null);

        if ($tags) {
            $this->addUpdateVideoTags($video, $tags);
        }

        // update video information in Youtube
        $this->setSnippet($video, $request->input('title'), $request->input('description'), $tags);

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $imageUrl = $this->saveImageFile($imageFile);
            $video->image = $imageUrl;
        }

        //handle file upload to S3 and Youtube ingestion
        if ($request->hasFile('file')) {
            $videoFile = $request->file('file');
            $video->file = $this->saveVideoFile($videoFile);
            $video->mime = $videoFile->getMimeType();
            //TODO: should the old video in youtube be removed?
            $video->youtube_id = null;
        }

        if($request->input('campaigns')) {
            $campaigns = $this->saveCampaigns($request->input('campaigns'), $video);
            $video->campaigns()->sync($campaigns);
        }

        $duration = $request->input('duration', null);
        $video->duration = $this->getDuration($video, $duration);

        $video->user_id = Auth::id();
        $video->is_exclusive = ($request->input('is_exclusive')) ?: 0;
        $video->active = ($request->input('active')) ?: 0;
        $video->featured = ($request->input('featured')) ?: 0;
        $video->video_collection_id = $request->input('video_collection_id', null);
        $video->video_shottype_id = $request->input('video_shottype_id', null);
        $video->video_category_id = $request->input('video_category_id', null);
        $video->contact_id = $request->input('creator_id', null);
        $video->title = $request->input('title');
        $video->embed_code = $request->input('embed_code');
        $video->url = $request->input('url');
        $video->location = $request->input('location');
        $video->details = $request->input('details');
        $video->description = $request->input('description');

        $video->save();

        if ($request->hasFile('file')) {
            QueueVideo::dispatch($video->id, true)->delay(now()->addSeconds(5));
        }

        return Redirect::to('admin/videos/edit/' . $request->input('id'))->with([
            'note' => 'Successfully Updated Video!',
            'note_type' => 'success',
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \League\Csv\Exception
     */
    public function ingest(Request $request)
    {
        //increase memory limits and upload post size
        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '512M');
        ini_set('post_max_size', '512M');

        $brokenLinks = $problemLinks = $note = [];

        if ($request->hasFile('csv')) {
            //load the CSV document from a file path
            $csv = Reader::createFromPath(Input::file('csv'), 'r');
            $csv->setHeaderOffset(0);

            $header = $csv->getHeader(); //returns the CSV header record
            $records = $csv->getRecords(); //returns all the CSV records as an Iterator object
            $select_type = Input::get('type');
            $select_state = Input::get('state');
            $select_rights = Input::get('rights');
            $count = 0;

            foreach ($records as $record) {
                $link = trim($record['link']);
                $result = Video::where('url', $link)->get();

                if (!count($result)) { // Check if URL already exists within db
                    // Add contact details
                    if (isset($record['email'])) {
                        $contact = Contact::where('email', $record['email'])->first();

                        if (!$contact) { // IF contact exists
                            $contact = new Contact();
                            $contact->tel = (isset($record['tel']) ? $record['tel'] : ''); //might want to change phone to tel in CSV file
                            $contact->email = $record['email'];
                            $contact->save();
                        }
                    }

                    // Check if URL exists
                    if (filter_var($link, FILTER_VALIDATE_URL)) {
                        $count++;
                        // Add additional field data
                        $collection = VideoCollection::where('name', $record['category'])->first();
                        $video = new Video();
                        $video->contact_id = isset($contact) ? $contact->id : NULL;
                        $video->alpha_id = VideoHelper::quickRandom();
                        $video->title = $record['title'];
                        $video->state = $select_state;
                        $video->rights = $select_rights;
                        $video->video_collection_id = count($collection) ? $collection->id : null;

                        if (strpos($link, 'jotform') || strpos($link, 'drive.google.com') || strpos($link, 'dropbox')) { // Check if link is jotform
                            if ($select_type == 'both' || $select_type == 'files') {
                                $video->url = $link;
                                // Save video
                                $video->save();

                                // Add job to import queue
                                QueueVideoImport::dispatch($video->id, $link)
                                    ->delay(now()->addSeconds(5));
                            }
                        } else if (str_contains($link, 'http')) {
                            if ($select_type == 'both' || $select_type == 'urls') {
                                $linkDetails = VideoHelper::videoLinkChecker($link, $select_state);

                                $video->youtube_id = $linkDetails['youtube_id'];
                                $video->url = $linkDetails['url'];
                                $video->image = $linkDetails['image'];
                                $video->thumb = $linkDetails['thumb'];
                                $video->embed_code = $linkDetails['embed_code'];
                                $video->vertical = $linkDetails['vertical'];
                                $video->state = $linkDetails['state'];
                                // Save video
                                $video->save();

                                if ($linkDetails['state'] == 'problem') {
                                    $problemLinks[] = $record['title'] . ' : ' . $link;
                                }
                            }
                        }
                    } else {
                        $brokenLinks[] = $record['title'] . ' : ' . $link;
                    }
                }
            }

            if ($brokenLinks || $problemLinks) {
                $request->session()->flash('note', 'Some issues with link ingestion!');
                $request->session()->flash('note_type', 'error');
            } else {
                $request->session()->flash('note', 'Successfully Ingested CSV!');
                $request->session()->flash('note_type', 'success');
            }
        }

        $data = [
            'post_route' => url('admin/videos/ingest'),
            'button_text' => 'Upload Video CSV',
            'user' => Auth::user(),
            'broken_links' => $brokenLinks,
            'problem_links' => $problemLinks,
        ];

        return view('admin.videos.ingest', $data);
    }

    /**
     * TODO: where are we using this method
     */
    public function checkYoutube()
    {
        $videos = Video::where([
            ['state', 'licensed'],
            ['file_watermark_dirty', '!=', NULL],
            ['youtube_id', NULL],
            ['created_at', '>', Carbon::now()->subDays(30)->toDateTimeString()],
        ])->limit(300)->get();
        echo 'Total Count: ' . count($videos) . '<br /><br />';
        foreach ($videos as $video) {
            echo $video->id . ' : ' . $video->title . '<br />';
            QueueVideoYoutubeUpload::dispatch($video->id)
                ->delay(now()->addSeconds(5));
        }
    }

    /**
     * TODO: where are we using this method
     */
    public function checkWatermark()
    {
        $videos = Video::where([
            ['file', '!=', NULL],
            ['file_watermark', NULL],
            ['file_watermark_dirty', NULL],
            ['youtube_id', NULL],
            ['created_at', '>', Carbon::now()->subDays(30)->toDateTimeString()],
        ])->limit(100)->get();
        echo 'Total Count: ' . count($videos) . '<br /><br />';
        foreach ($videos as $video) {
            echo $video->id . ' : ' . $video->title . ' : ' . basename($video->file) . ' : ' . $video->created_at . '<br />';
        }

    }

    /**
     * TODO: where are we using this method
     */
    public function checkAnalysis()
    {
        set_time_limit(3200); // Unlimited timeout

        $videos = Video::where([
            ['state', 'licensed'],
            ['file', '!=', NULL],
            ['file_watermark_dirty', '!=', NULL],
        ])->get();
        $disk = Storage::disk('s3_sourcebucket');
        $count = 0;

        foreach ($videos as $video) {
            if ($disk->exists(basename($video->file))) {
                //maybe check dynamodb also for next run
                $count++;
                echo 'SUCCESS: ' . $video->alpha_id . ' : ' . $video->file . '<br />';
                QueueVideoAnalysis::dispatch($video->id)
                    ->delay(now()->addSeconds(5));
            }
            echo 'ALREADY DONE: ' . $video->alpha_id . ' : ' . $video->file . '<br />';
        }
        echo 'Total Count: ' . $count . '<br /><br />';
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function comment($id)
    {
        $video = Video::where('alpha_id', $id)->first();

        if (Input::get('comment')) {
            $comment = new Comment();
            $comment->comment = Input::get('comment');
            $comment->user_id = Auth::id();

            $video->comments()->save($comment);
        }

        return Redirect::to('admin/videos/edit/' . $id)->with([
            'note' => 'Successfully Updated Video!',
            'note_type' => 'success',
        ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy(Request $request, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();

        // Detach and delete any unused tags
        foreach ($video->tags as $tag) {
            $this->detachTagFromVideo($video, $tag->id);
            if (!$this->isTagContainedInAnyVideos($tag->name)) {
                $tag->delete();
            }
        }

        $this->deleteVideoImages($video);

        // Hide on youtube
        if ($video->youtube_id && $video->file) {
            $response = Youtube::setStatus($video->youtube_id, 'private');

            if (!$response) { // There is no youtube video, remove the id
                $video->youtube_id = '';
            }
        }

        $video->delete();
        $video->save();

        if ($isJson) {
            return response()->json([
                'status' => 'success', 'message' => 'Successfully Removed Video',
                'remove' => 'yes', 'video_id' => $video->alpha_id,
            ]);
        } else {
            return Redirect::to('admin/videos/' . session('state'))->with([
                'note' => 'Successfully Deleted Video',
                'note_type' => 'success',
            ]);
        }
    }

    public function restore(Request $request, $id)
    {
        $video = Video::withTrashed()->where('alpha_id', $id)->first();

        // Hide on youtube
        if ($video->youtube_id) {
            $response = Youtube::setStatus($video->youtube_id, 'unlisted');

            if (!$response) { // There is no youtube video, remove the id
                $video->youtube_id = '';
            }
        }

        $video->restore();
        $video->save();

        return Redirect::to('admin/videos/' . session('state'))->with([
            'note' => 'Successfully Restored Video',
            'note_type' => 'success',
        ]);
    }

    /**
     * @param Video $video
     * @param string $tags
     */
    private function addUpdateVideoTags(Video $video, string $tags)
    {
        $tags = array_map('trim', explode(',', $tags));

        foreach ($tags as $tag) {
            $tag_id = $this->addTag($tag);
            $this->attachTagToVideo($video, $tag_id);
        }

        // Remove any tags that were removed from video
        foreach ($video->tags as $tag) {
            if (!in_array($tag->name, $tags)) {
                $this->detachTagFromVideo($video, $tag->id);
                if (!$this->isTagContainedInAnyVideos($tag->name)) {
                    $tag->delete();
                }
            }
        }
    }

    /**
     * @param string $tag_string
     * @return int
     */
    private function addTag(string $tag_string)
    {
        $tag = Tag::firstOrCreate(['name' => $tag_string]);
        return $tag->id;
    }

    /**
     * @param $video
     * @param $tag_id
     */
    private function attachTagToVideo($video, $tag_id)
    {
        // Add New Tags to video
        if (!$video->tags->contains($tag_id)) {
            $video->tags()->attach($tag_id);
        }
    }

    /**
     * @param $video
     * @param $tag_id
     */
    private function detachTagFromVideo(Video $video, int $tag_id)
    {
        $video->tags()->detach($tag_id);
    }

    public function isTagContainedInAnyVideos($tag_name)
    {
        // Check if a tag is associated with any videos
        $tag = Tag::where('name', '=', $tag_name)->first();
        return (!empty($tag) && $tag->videos->count() > 0) ? true : false;
    }

    private function deleteVideoImages($video)
    {
        $ext = pathinfo($video->image, PATHINFO_EXTENSION);
        if (file_exists(config('site.uploads_dir') . $video->image) && $video->image != 'placeholder.png') {
            @unlink(config('site.uploads_dir') . 'images/' . $video->image);
        }

        if (file_exists(config('site.uploads_dir') . str_replace('.' . $ext, '-large.' . $ext, $video->image)) && $video->image != 'placeholder.png') {
            @unlink(config('site.uploads_dir') . str_replace('.' . $ext, '-large.' . $ext, $video->image));
        }

        if (file_exists(config('site.uploads_dir') . str_replace('.' . $ext, '-medium.' . $ext, $video->image)) && $video->image != 'placeholder.png') {
            @unlink(config('site.uploads_dir') . str_replace('.' . $ext, '-medium.' . $ext, $video->image));
        }

        if (file_exists(config('site.uploads_dir') . str_replace('.' . $ext, '-small.' . $ext, $video->image)) && $video->image != 'placeholder.png') {
            @unlink(config('site.uploads_dir') . str_replace('.' . $ext, '-small.' . $ext, $video->image));
        }
    }

    /**
     * This license is only for submited videos
     * @param $alpha_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function pdfview($alpha_id)
    {
        $video = Video::where('alpha_id', $alpha_id)
            ->first();

        if (!$video) {
            return Redirect::to('admin/videos/')->with([
                'note' => 'Sorry, we could not find the video',
                'note_type' => 'error',
            ]);
        }

        $data = [
            'terms' => config('settings.terms'),
            'video' => $video,
        ];

        $pdf = PDF::loadView('admin.videos.pdfview', $data);

        return $pdf->download($alpha_id . '.pdf');
    }

    public function nsfw($alpha_id = null)
    {
        $status = 'error';
        $message = 'This NSFW flag was not added or removed.';

        if ($alpha_id) {
            $video = Video::where('alpha_id', $alpha_id)->first();
            if ($video->id) {
                if ($video->nsfw == 1) {
                    $video->nsfw = NULL;
                    $message = 'Successfully removed NSFW flag.';
                } else {
                    $video->nsfw = 1;
                    $message = 'Successfully added NSFW flag.';
                }
                // Save video
                $video->save();
                $status = 'success';
            }
        }

        return Redirect::to('admin/videos/edit/' . $alpha_id)->with([
            'note' => $message,
            'note_type' => $status,
        ]);
    }

    /**
     * @param Video $video
     * @param string $duration
     * @return float|int|null|string
     */
    public function getDuration(Video $video, string $duration)
    {
        $durationInSeconds = null;
        // Youtube integration
        // Fetches video duration on update and is youtube if none
        if (($video->youtube_id) && ($video->file) && (config('app.env') != 'local') && (!$video->duration)) {
            $durationInSeconds = TimeHelper::convert_seconds_to_HMS(Youtube::getDuration($video->youtube_id));
        } elseif ($duration) {
            $durationInSeconds = TimeHelper::convert_HMS_to_seconds($duration, null);
        }

        return $durationInSeconds;
    }

    /**
     * @param Video $video
     * @param string $title
     * @param string $description
     * @param string|null $tags_string
     */
    private function setSnippet(Video $video, string $title = null, string $description = null, string $tags_string = null)
    {
        if (($video->youtube_id) && ($video->file) && (config('app.env') != 'local')) {
            $tags_array = explode(',', $tags_string);
            Youtube::setSnippet($video->youtube_id, $title, $description, $tags_array);
        }
    }

    /**
     * @param UploadedFile $videoFile
     * @return string
     */
    public function saveVideoFile(UploadedFile $videoFile)
    {
        $fileOriginalName = strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/', '', pathinfo($videoFile->getClientOriginalName(), PATHINFO_FILENAME)));

        $fileName = time() . '-' . $fileOriginalName . '.' . $videoFile->getClientOriginalExtension();

        // Upload to S3
        $stored = \Storage::disk('s3')->put($fileName, file_get_contents($videoFile), 'public');

        if (!$stored) {
            abort(500);
        }

        $filePath = \Storage::disk('s3')->url($fileName);

        return $filePath;
    }

    /**
     * @param UploadedFile $imageFile
     * @return string
     */
    private function saveImageFile(UploadedFile $imageFile)
    {
        $imageFileName = time() . '.' . $imageFile->getClientOriginalExtension();
        $t = \Storage::disk('s3')->put($imageFileName, file_get_contents($imageFile), 'public');

        if (!$t) {
            abort(500);
        }

        return \Storage::disk('s3')->url($imageFileName);
    }

    /**
     * @param array $new_campaigns
     * @param Video $video
     * @return array
     */
    public function saveCampaigns(array $new_campaigns, Video $video): array
    {
        $campaigns = [];
        $current_campaigns = $video->campaigns->pluck('id')->all();

        // IAN:  Hmm, tough one, only want to set their state to new if their new.
        if ($new_campaigns) {
            foreach ($new_campaigns as $key => $campaign) {
                if (in_array($campaign, $current_campaigns)) {
                    $campaigns[$campaign] = $campaign;
                } else {
                    $campaigns[$campaign]['state'] = 'new';
                }
            }
        }
        return $campaigns;
    }

}
