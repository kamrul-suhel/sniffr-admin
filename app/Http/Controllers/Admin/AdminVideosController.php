<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Youtube;
use MyYoutube;
use Redirect;
use Validator;
use DateTime;
use DateInterval;

use Google_Client;
use Google_Service_YouTube;

use League\Csv\Reader;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Tag;
use App\Menu;
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

use App\Libraries\ImageHandler;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use App\Http\Controllers\Controller;

class AdminVideosController extends Controller {

    protected $rules = []; //WE SHOULD PROBABLY ADD RULES TO THIS

    /**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }
    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function index(Request $request, $state = 'all')
    {
        $search_value = Input::get('s');
        $category_value = Input::get('category');
        $collection_value = Input::get('collection');
        $shot_value = Input::get('shot_type');
        $rights = Input::get('rights');

        $videos = new Video;

        if(!empty($search_value)){
            $videos = Video::where(function($query) use($search_value){
                $query->where('title', 'LIKE', '%'.$search_value.'%');
            })->orWhereHas('tags', function ($q) use($search_value){
                $q->where('name', 'LIKE', '%'.$search_value.'%');
            })->orWhere('alpha_id', $search_value);
        }

        if(!empty($category_value)){
            $videos = $videos->where('video_category_id', $category_value);
        }

        if(!empty($collection_value)){
            $videos = $videos->where('video_collection_id', $collection_value);
        }

        if(!empty($shot_value)){
            $videos = $videos->where('video_shottype_id', $shot_value);
        }

        if(!empty($rights)){
            $videos = $videos->where('rights', $rights);
        }

        if($state != 'all'){
            if($state == 'deleted'){
                $videos = $videos->onlyTrashed();
            }else{
                $videos = $videos->where('state', $state);
            }

            session(['state' => $state]);
        }

        $videos = $videos->orderBy('id', 'DESC')->paginate(24);

        $user = Auth::user();

        $data = array(
            'state' => $state,
            'videos' => $videos,
            'user' => $user,
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        );

        return view('admin.videos.index', $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function status(Request $request, $state, $id)
    {
        $isJson = $request->ajax();
        $video_process=0;

        $video = Video::where('alpha_id', $id)->first();
        $video->state = $state;

        // Send email
        if ($video->state == 'accepted'){

            $video->more_details_code = str_random(30);
            $video->more_details_sent = now();

            // Set to process for youtube and analysis
            $video_process=1;

            // Send thanks notification email
            QueueEmail::dispatch($video->id, 'submission_accepted');

        } else if($video->state == 'rejected'){

            // Send thanks notification email
            QueueEmail::dispatch($video->id, 'submission_rejected');

        } else if($video->state == 'restricted'||$video->state == 'problem'){

            if(!empty($video->youtube_id) && $video->file){

                // Make youtube video unlisted
                MyYoutube::setStatus($video->youtube_id, 'unlisted');

            }

        } else if($video->state == 'licensed'){

            // Check if licensed_at has already been set so we don't send contact/user another email
            if(empty($video->licensed_at)) {

                // Check if there is a contact for the video
                if(isset($video->contact->id)) {

                    // Send thanks notification email (via queue after 2mins)
                    QueueEmail::dispatch($video->id, 'submission_licensed')
                        ->delay(now()->addMinutes(2));
                        // added delay, just in case the youtube encoding needs to process
                }

            }

            // Also, need to check if video file has been moved for analysis + youtube (on licensed state only)
            if(!empty($video->youtube_id) && $video->file){

                // Make youtube video public
                MyYoutube::setStatus($video->youtube_id, 'public');

            } else {

                // Set to process for youtube and analysis
                $video_process=1;

            }

            $video->licensed_at = now();

        }

        // Save video data to database
        $video->save();

        // Process > Move video to Youtube and move video file to folder for analysis
        $fileName_watermark = false;
        if($video->file&&$video_process==1){

            // set watermark and non-watermark video files for processing

            $fileName = basename($video->file);
            if($video->file_watermark_dirty){
                $file_watermark = file_get_contents($video->file_watermark_dirty);
                $fileName_watermark = basename($video->file_watermark_dirty);
            }else if($video->file_watermark){
                $file_watermark = file_get_contents($video->file_watermark);
                $fileName_watermark = basename($video->file_watermark);
            }

            // Anaylsis (copies file over to another folder for analysis and suggested tag creation)

            $disk = Storage::disk('s3_sourcebucket');
            if($disk->has($fileName)==1){
                if($disk->exists(basename($fileName))) {
                    $disk->move(''.$fileName, 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.$fileName);
                }
            }

            // Youtube (retrieves video to temporary local and then uploads to youtube)

            if($fileName_watermark) {

                file_put_contents('/tmp/'.$fileName_watermark, $file_watermark);

                $file_watermark = new UploadedFile (
                    '/tmp/'.$fileName_watermark,
                    $fileName_watermark,
                    $video->mime,
                    filesize('/tmp/'.$fileName_watermark),
                    null,
                    false
                );

                // Upload it to youtube
                $response = MyYoutube::upload($file_watermark, ['title' => $video->title], 'unlisted');
                $youtubeId  = $response->getVideoId();

                $video->youtube_id = $youtubeId;

            }

            $video->save();
        }

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'Successfully '.ucfirst($state).' Video', 'state' => $state, 'remove' => 'yes', 'video_id' => $video->id]);
        } else {
            return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Successfully Updated Video', 'note_type' => 'success') );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function remind($id)
    {
        $video = Video::where('alpha_id', $id)->first();

        $video->more_details_sent = now();
        $video->reminders = $video->reminders ? $video->reminders+1 : 1;
        $video->save();

        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'details_reminder');

        return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Reminder sent', 'note_type' => 'success') );
    }

    /**
     * Show the form for creating a new video
     *
     * @return Response
     */
    public function create()
    {
        $data = array(
            'headline' => '<i class="fa fa-plus-circle"></i> New Video',
            'post_route' => url('admin/videos/store'),
            'button_text' => 'Add New Video',
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
        );
        return view('admin.videos.create_edit', $data);
    }

    /**
     * Store a newly created video in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($data = Input::all(), $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        //handle file upload to S3 and Youtube ingestion
        $filePath = $fileSize = $fileMimeType = $youtubeId = '';
        if($request->hasFile('file')){
            $fileOriginalName = strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/','', pathinfo(Input::file('file')->getClientOriginalName(), PATHINFO_FILENAME)));

            $fileName = time().'-'.$fileOriginalName.'.'.$request->file->getClientOriginalExtension();

            $file = $request->file('file');
            $fileMimeType = $file->getMimeType();
            $fileSize = $file->getClientSize();

            // Upload to S3
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $filePath = Storage::disk('s3')->url($fileName);
        }

        //get URL
        $url = Input::get('url');

        //if no video file or video url then try embed code
        if(!$filePath&&!$url) {
            $embed_code = Input::get('embed_code');
        } else {
            $embed_code = '';
        }

        // Duration
        if(isset($data['duration'])){
            $data['duration'] = TimeHelper::convert_HMS_to_seconds($data['duration']);
        }

        //add additional form data to db (with video file info)
        $video = new Video();
        $video->alpha_id = VideoHelper::quickRandom();
        $video->title = Input::get('title');
        $video->description = Input::get('description');
        $video->url = $url;
        $video->embed_code = $embed_code;
        $video->file = $filePath;
        $video->youtube_id = $youtubeId;
        $video->mime = $fileMimeType;
        $video->state = 'problem';
        $video->rights = Input::get('rights');
        $video->is_exclusive = 1;
        $video->image = $request->has('image') ? $request->input('image') : 'placeholder.gif';
        $video->date_filmed = Input::get('date_filmed');
        $video->details = Input::get('details');
        $video->video_category_id = Input::get('video_category_id');
        $video->video_collection_id = Input::get('video_collection_id');
        $video->video_shottype_id = Input::get('video_shottype_id');
        $video->contact_id = 0;
        $video->active = 0;
        $video->featured = 0;
        $user = Auth::user();
        $video->user_id = $user->id;
        $video->save();

        if($filePath){
            QueueVideo::dispatch($video->id)
                ->delay(now()->addSeconds(15));
        }

        //add to campaign (need to get this working)
        // $campaign = new Campaign();
        // $campaign->Input::get('campaigns');
        // $campaign->save();

        //adds tags
        $tags = trim(Input::get('tags'));
        if($tags) {
            $this->addUpdateVideoTags($video, $tags);
        }

        // $image = (isset($data['image'])) ? $data['image'] : '';
        // if(!empty($image)){
        //     $fileName = time().'.'.$request->file->getClientOriginalExtension();
        //     $file = $request->file('file');
        //     $fileMimeType = $file->getMimeType();
        //     $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
        //     $data['image'] = Storage::disk('s3')->url($fileName);
        //
        //     //$data['image'] = ImageHandler::uploadImage($data['image'], 'images');
        // } else {
        //     $data['image'] = 'placeholder.gif';
        // }
        //$video = Video::create($data);

        return Redirect::to('admin/videos')->with(array('note' => 'New Video Successfully Added!', 'note_type' => 'success') );
    }

    /**
     * Show the form for editing the specified video.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $video = Video::where('alpha_id', $id)->withTrashed()->first();

        $user = User::where('id', $video->user_id)->first();

        $data = array(
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'post_route' => url('admin/videos/update'),
            'button_text' => 'Update Video',
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'user' => $user
        );

        return view('admin.videos.create_edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request)
    {
        $input = Input::all();
        $id = $input['id'];
        $video = Video::where('alpha_id', $id)->first();

        $validator = Validator::make($data = $input, $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $tags = $data['tags'];
        unset($data['tags']);
        $this->addUpdateVideoTags($video, $tags);

        // Youtube integration
        if($video->youtube_id && $video->file && env('APP_ENV') != 'local') { // Fetches video duration on update and is youtube if none
            if(!$video->duration){
                $data['duration'] = TimeHelper::convert_seconds_to_HMS(MyYoutube::getDuration($video->youtube_id));
            }

            MyYoutube::setSnippet($video->youtube_id, $data['title'], $data['description'], explode(',',$tags));
        }

        // Duration
        if(isset($data['duration'])){
            $data['duration'] = TimeHelper::convert_HMS_to_seconds($data['duration']);
        }

        if(empty($data['image'])){
            unset($data['image']);
        } else {
            $fileName = time().'.'.$request->image->getClientOriginalExtension();
            $file = $request->file('image');
            $fileMimeType = $file->getMimeType();
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $data['image'] = Storage::disk('s3')->url($fileName);
        }

        //handle file upload to S3 and Youtube ingestion
        $filePath = $fileSize = $fileMimeType = $youtubeId = '';
        if($request->hasFile('file')){
            $fileOriginalName = strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/','', pathinfo(Input::file('file')->getClientOriginalName(), PATHINFO_FILENAME)));

            $fileName = time().'-'.$fileOriginalName.'.'.$request->file->getClientOriginalExtension();

            $file = $request->file('file');
            $fileMimeType = $file->getMimeType();
            $fileSize = $file->getClientSize();

            // Upload to S3
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $filePath = Storage::disk('s3')->url($fileName);
        }

        $video->file = $filePath;

        $selected_campaigns = $video->campaigns->pluck('id')->all();
        $campaigns = array();

        if(Input::get('campaigns')){
            // IAN:  Hmm, tough one, only want to set their state to new if their new.
            foreach(Input::get('campaigns') as $key => $campaign){
                if(in_array($campaign, $selected_campaigns)){
                    $campaigns[$campaign] = $campaign;
                }else{
                    $campaigns[$campaign]['state'] = 'new';
                }
            }
        }

        // Check if ex/nonex dropdown was changed for rights management make sure is_exclusive field is also changed
        if($request->rights=='nonex') {
            $video->is_exclusive = NULL;
        } else {
            $video->is_exclusive = 1;
        }

        $video->campaigns()->sync($campaigns);

        if(empty($data['active'])){
            $data['active'] = 0;
        }

        if(empty($data['featured'])){
            $data['featured'] = 0;
        }

        $video->update($data);

        return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Successfully Updated Video!', 'note_type' => 'success') );
    }

    /**
     * Show the form for creating a new video
     *
     * @return Response
     */
    public function upload(Request $request)
    {
        //increase memory limits and upload post size
        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '512M');
        ini_set('post_max_size', '512M');

        $brokenLinks = $note =array();

        if($request->hasFile('csv')) {
            //load the CSV document from a file path
            $csv = Reader::createFromPath(Input::file('csv'), 'r');
            $csv->setHeaderOffset(0);

            $header = $csv->getHeader(); //returns the CSV header record
            $records = $csv->getRecords(); //returns all the CSV records as an Iterator object
            $select_type = Input::get('type');
            $select_state = Input::get('state');
            $select_rights = Input::get('rights');
            $count = 0;

            foreach($records as $record) {
                $link = trim($record['link']);
                $result = Video::where('url', $link)->get();

                if(!count($result)) { // Check if URL already exists within db
                    // Add contact details
                    if(isset($record['email'])) {
                        $contact = Contact::where('email',$record['email'])->first();

                        if(!$contact){ // IF contact exists
                            $contact = new Contact();
                            $contact->tel = (isset($record['tel']) ? $record['tel'] : '' ); //might want to change phone to tel in CSV file
                            $contact->email = $record['email'];
                            $contact->save();
                        }
                    }

                    // Check if URL exists
                    if(filter_var($link, FILTER_VALIDATE_URL)){
                        $count++;
                        // Add additional field data
                        $collection = VideoCollection::where('name', $record['category'])->first();
                        $video = new Video();
                        $video->contact_id = isset($contact) ? $contact->id : NULL;
                        $video->alpha_id = VideoHelper::quickRandom();
                        $video->title = $record['title'];
                        $video->state = $select_state;
                        $video->rights = $select_rights;
                        $video->video_collection_id = count($collection) ? $collection->id : 0;

                        if(strpos($link, 'jotform') || strpos($link, 'drive.google.com') || strpos($link, 'dropbox')) { // Check if link is jotform
                            if($select_type == 'both' || $select_type == 'files'){
                                $video->url = $link;
                                // Save video
                                $video->save();

                                // Add job to import queue
                                QueueVideoImport::dispatch($video->id, $link)
                                    ->delay(now()->addSeconds(5));
                            }
                        } else if(str_contains($link, 'http')){
                            if($select_type == 'both' || $select_type == 'urls'){
                                $linkDetails = VideoHelper::videoLinkChecker($link);

                                $video->youtube_id = $linkDetails['youtube_id'];
                                $video->url = $linkDetails['url'];
                                $video->image = $linkDetails['image'];
                                $video->thumb = $linkDetails['thumb'];
                                $video->embed_code = $linkDetails['embed_code'];
                                $video->vertical = $linkDetails['vertical'];
                                // Save video
                                $video->save();
                            }
                        }
                    } else {
                        $brokenLinks[] = $record['title'].' : '.$link;
                    }
                }
            }

            if($brokenLinks){
                $request->session()->flash('note', 'Some issues with link ingestion!');
                $request->session()->flash('note_type', 'error');
            }else{
                $request->session()->flash('note', 'Successfully Ingested CSV!');
                $request->session()->flash('note_type', 'success');
            }
        }

        $data = array(
            'post_route' => url('admin/videos/upload'),
            'button_text' => 'Upload Video CSV',
            'admin_user' => Auth::user(),
            'broken_links' => $brokenLinks
        );

        return view('admin.videos.upload', $data);
    }

    public function checkYoutube()
    {
        $videos = Video::where([['state', 'licensed'], ['file_watermark_dirty', '!=', NULL], ['youtube_id', NULL]])->limit(300)->get();
        echo 'Total Count: '.count($videos).'<br /><br />';
        foreach ($videos as $video) {
            echo $video->id.' : '.$video->title.'<br />';
            QueueVideoYoutubeUpload::dispatch($video->id)
                ->delay(now()->addSeconds(5));
        }

    }

    public function checkAnalysis()
    {
        set_time_limit(3200); // Unlimited timeout

        $videos = Video::where([['state', 'licensed'], ['file', '!=', NULL], ['file_watermark_dirty', '!=', NULL]])->get();
        $disk = Storage::disk('s3_sourcebucket');
        $count = 0;

        foreach ($videos as $video) {
            if($disk->exists(basename($video->file))) {
                //maybe check dynamodb also for next run
                $count++;
                echo 'SUCCESS: '.$video->alpha_id.' : '.$video->file.'<br />';
                QueueVideoAnalysis::dispatch($video->id)
                    ->delay(now()->addSeconds(5));
            } else {
                echo 'ALREADY DONE: '.$video->alpha_id.' : '.$video->file.'<br />';
            }
        }
        echo 'Total Count: '.$count.'<br /><br />';
    }

    public function comment($id)
    {
        $video = Video::where('alpha_id', $id)->first();

        if(Input::get('comment')){
            $comment = new Comment();
            $comment->comment = Input::get('comment');
            $comment->user_id = Auth::id();

            $video->comments()->save($comment);
        }

        return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Successfully Updated Video!', 'note_type' => 'success') );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();

        // Detach and delete any unused tags
        foreach($video->tags as $tag){
            $this->detachTagFromVideo($video, $tag->id);
            if(!$this->isTagContainedInAnyVideos($tag->name)){
                $tag->delete();
            }
        }

        $this->deleteVideoImages($video);

        // Hide on youtube
        if($video->youtube_id && $video->file){
            $response = MyYoutube::setStatus($video->youtube_id, 'private');

            if(!$response){ // There is no youtube video, remove the id
                $video->youtube_id = '';
            }
        }

        $video->delete();
        $video->save();

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'Successfully Removed Video', 'remove' => 'yes', 'video_id' => $video->alpha_id]);
        } else {
            return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'Successfully Deleted Video', 'note_type' => 'success') );
        }
    }

    public function restore(Request $request, $id)
    {
        $data = $request->session()->all();

        $video = Video::withTrashed()->where('alpha_id', $id)->first();

        // Hide on youtube
        if($video->youtube_id){
            $response = MyYoutube::setStatus($video->youtube_id, 'unlisted');

            if(!$response){ // There is no youtube video, remove the id
                $video->youtube_id = '';
            }
        }

        $video->restore();
        $video->save();

        return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'Successfully Restored Video', 'note_type' => 'success') );
    }

    private function addUpdateVideoTags($video, $tags){
        $tags = array_map('trim', explode(',', $tags));


        foreach($tags as $tag){

            $tag_id = $this->addTag($tag);
            $this->attachTagToVideo($video, $tag_id);
        }

        // Remove any tags that were removed from video
        foreach($video->tags as $tag){
            if(!in_array($tag->name, $tags)){
                $this->detachTagFromVideo($video, $tag->id);
                if(!$this->isTagContainedInAnyVideos($tag->name)){
                    $tag->delete();
                }
            }
        }
    }

    /**************************************************
    /*
    /*  PRIVATE FUNCTION
    /*  addTag( tag_name )
    /*
    /*  ADD NEW TAG if Tag does not exist
    /*  returns tag id
    /*
    /**************************************************/

    private function addTag($tag){
        $tag_exists = Tag::where('name', '=', $tag)->first();

        if($tag_exists){
            return $tag_exists->id;
        } else {
            $new_tag = new Tag;
            $new_tag->name = strtolower($tag);
            $new_tag->save();
            return $new_tag->id;
        }
    }

    /**************************************************
    /*
    /*  PRIVATE FUNCTION
    /*  attachTagToVideo( video object, tag id )
    /*
    /*  Attach a Tag to a Video
    /*
    /**************************************************/

    private function attachTagToVideo($video, $tag_id){
        // Add New Tags to video
        if (!$video->tags->contains($tag_id)) {
            $video->tags()->attach($tag_id);
        }
    }

    private function detachTagFromVideo($video, $tag_id){
        // Detach the pivot table
        $video->tags()->detach($tag_id);
    }

    public function isTagContainedInAnyVideos($tag_name){
        // Check if a tag is associated with any videos
        $tag = Tag::where('name', '=', $tag_name)->first();
        return (!empty($tag) && $tag->videos->count() > 0) ? true : false;
    }

    private function deleteVideoImages($video){
        $ext = pathinfo($video->image, PATHINFO_EXTENSION);
        if(file_exists(config('site.uploads_dir') . 'images/' . $video->image) && $video->image != 'placeholder.jpg'){
            @unlink(config('site.uploads_dir') . 'images/' . $video->image);
        }

        if(file_exists(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-large.' . $ext, $video->image) )  && $video->image != 'placeholder.jpg'){
            @unlink(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-large.' . $ext, $video->image) );
        }

        if(file_exists(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-medium.' . $ext, $video->image) )  && $video->image != 'placeholder.jpg'){
            @unlink(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-medium.' . $ext, $video->image) );
        }

        if(file_exists(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-small.' . $ext, $video->image) )  && $video->image != 'placeholder.jpg'){
            @unlink(config('site.uploads_dir') . 'images/' . str_replace('.' . $ext, '-small.' . $ext, $video->image) );
        }
    }

}
