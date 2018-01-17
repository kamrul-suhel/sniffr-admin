<?php

namespace App\Http\Controllers\Client;

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
use App\Client;
use App\Comment;
use App\Campaign;
use App\VideoCategory;
use App\VideoCollection;
use App\VideoShotType;

use App\Jobs\QueueEmail;

use App\Libraries\ImageHandler;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use App\Http\Controllers\Controller;

use App\Notifications\ClientAction;

class ClientVideosController extends Controller {

    protected $rules = []; //WE SHOULD PROBABLY ADD RULES TO THIS

    /**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('client');
    }
    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function index(Request $request, $state = 'all')
    {
        $request->session()->put('current_state', $state);
        $search_value = Input::get('s');
        $campaign_id = Input::get('campaign_id') ? Input::get('campaign_id') : session('campaign_id');
        $user = Auth::user();

        $campaigns = Campaign::where('client_id', $user->client_id)->get();
        $campaign = Campaign::find($campaign_id);

        // Video list
        $videos = new Video;

        if($campaign_id){
            $request->session()->put('campaign_id', $campaign_id);
            $videos = $videos->whereHas('campaigns', function ($q) use($campaign_id) {
                $q->where('id', $campaign_id);
            });
        }else{
            $videos = $videos->whereHas('campaigns', function ($q) use($campaigns) {
                $q->whereIn('id', $campaigns->pluck('id'));
            });
        }

        if(!empty($search_value)){
            $videos = Video::where(function($query) use($search_value){
                $query->where('title', 'LIKE', '%'.$search_value.'%');
            })->orWhereHas('tags', function ($q) use($search_value){
                $q->where('name', 'LIKE', '%'.$search_value.'%');
            });
        }

        if($state != 'all'){
            $videos = $videos->whereHas('campaigns', function ($q) use($state) {
                $q->where('state', $state);
            });
        }

        $videos = $videos->orderBy('licensed_at', 'desc')->paginate(9);

        $data = array(
            'state' => $state,
            'videos' => $videos,
            'user' => $user,
            'campaign' => $campaign,
            'campaigns' => $campaigns,
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        );

        return view('client.videos.index', $data);
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

        $video = Video::where('alpha_id', $id)->first();
        $client = Client::find(Auth::user()->client_id);
        
        $campaigns[session('campaign_id')]['state'] = $state;
        $video->campaigns()->sync($campaigns);

        // Send email
        if($state == 'yes'){
            $message = 'Thanks for choosing this video';
        }else if($state == 'maybe'){
            $message = 'You might use this video';
        }else if($state == 'no'){
            $message = 'We\'ll continue searching for suitable videos';
        }

        $video->notify(new ClientAction($video, $state, $client->name));

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => $message, 'state' => $state, 'remove' => ($state == 'all' ? 'yes' : 'no'), 'video_id' => $video->id]);
        } else {
            return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'Successfully '.ucfirst($state).' Video', 'note_type' => 'success') );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function request(Request $request, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();
        $client = Client::find(Auth::user()->client_id);
        
        $video->notify(new ClientAction($video, 'request', $client->name));

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'We\'ll do our best to get the video file ASAP', 'state' => 'request', 'current_state' => session('current_state'), 'video_id' => $video->id]);
        } else {
            return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'We\'ll do our best to get the video file ASAP', 'note_type' => 'success') );
        }
    }

    public function statusapi($state, $id)
    {
        $video = Video::where('alpha_id', $id)->first();
        $video->state = $state;

        // Send email
        if($video->state == 'accepted'){
            $video->more_details_code = str_random(30);
            $video->more_details_sent = now();

            // Move video to Youtube
            if($video->file){
                $file = file_get_contents($video->file);
                $fileName = basename($video->file);

                file_put_contents('/tmp/'.$fileName, $file);

                $file = new UploadedFile (
                    '/tmp/'.$fileName,
                    $fileName,
                    $video->mime,
                    filesize('/tmp/'.$fileName),
                    null,
                    false
                );

                // Upload it to youtube
                $response = MyYoutube::upload($file, ['title' => $video->title], 'unlisted');
                $youtubeId  = $response->getVideoId();

                $video->youtube_id = $youtubeId;
            }

            // Send thanks notification email (via queue after 2mins)
            QueueEmail::dispatch($video->id, 'submission_accepted');
        }else if($video->state == 'rejected'){
            // Send thanks notification email (via queue after 2mins)
            QueueEmail::dispatch($video->id, 'submission_rejected');
        }else if($video->state == 'licensed'){
            $video->licensed_at = now();

            // Make youtube video public
            if($video->youtube_id){
                MyYoutube::setStatus($video->youtube_id, 'public');
            }

            // Send thanks notification email (via queue after 2mins)
            QueueEmail::dispatch($video->id, 'submission_licensed');
        }

        $video->save();

        return response()->json(['status' => 'success', 'message' => 'Successfully '.ucfirst($state).' Video', 'state' => $state, 'video_id' => $video->id]);
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
            $fileOriginalName = pathinfo(Input::file('file')->getClientOriginalName(), PATHINFO_FILENAME);

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
        $video->state = 'new';
        $video->rights = Input::get('rights');
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
        $video = Video::where('alpha_id', $id)->first();

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
        if($video->youtube_id){ // Fetches video duration on update and is youtube if none
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

            //$data['image'] = ImageHandler::uploadImage($data['image'], 'images');
        }

        // Many to many cmapaigns
        $video->campaigns()->sync(Input::get('campaigns'));

        if(empty($data['active'])){
            $data['active'] = 0;
        }

        if(empty($data['featured'])){
            $data['featured'] = 0;
        }

        $video->update($data);

        return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Successfully Updated Video!', 'note_type' => 'success') );
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
        if($video->youtube_id){
            $response = MyYoutube::setStatus($video->youtube_id, 'private');

            if(!$response){ // There is no youtube video, remove the id
                $video->youtube_id = '';
            }
        }

        $video->delete();
        $video->save();

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'Successfully Removed Video', 'video_id' => $video->id]);
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
