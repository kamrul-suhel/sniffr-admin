<?php

namespace App\Http\Controllers;

use View;
use Auth;
use Youtube;
use MyYoutube;
use Redirect;
use Validator;

use Google_Client;
use Google_Service_YouTube;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Tag;
use App\Menu;
use App\Video;
use App\Comment;
use App\Campaign;
use App\VideoCategory;


use App\Libraries\ImageHandler;

use App\Mail\DetailsReminder;
use App\Mail\SubmissionAccepted;
use App\Mail\SubmissionRejected;
use App\Mail\SubmissionLicensed;

class AdminVideosController extends Controller {

    protected $rules = [];

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function index($state = 'all')
    {
        $search_value = Input::get('s');

        $videos = new Video;

        if(!empty($search_value)){
            //$videos = $videos->where('title', 'LIKE', '%'.$search_value.'%');
            $videos = Video::where(function($query) use($search_value){
                $query->where('title', 'LIKE', '%'.$search_value.'%');
            })->orWhereHas('tags', function ($q) use($search_value){
                $q->where('name', 'LIKE', '%'.$search_value.'%');
            });
        }

        if($state != 'all'){
            $videos = $videos->where('state', $state);
            session(['state' => $state]);
        }

        $videos = $videos->orderBy('created_at', 'DESC')->paginate(9);


        $user = Auth::user();

        $data = array(
            'state' => $state,
            'videos' => $videos,
            'user' => $user,
            'admin_user' => Auth::user()
        );

        return view('admin.videos.index', $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function status($state, $id)
    {
        $video = Video::find($id);
        $video->state = $state;

        // Send email
        if($video->state == 'accepted'){
            $video->more_details_code = str_random(30);
            $video->more_details_sent = now();

            // Send Accepted Email
            Mail::to($video->contact->email)->send(new SubmissionAccepted($video));
        }else if($video->state == 'rejected'){
            // Send Rejected Email
            Mail::to($video->contact->email)->send(new SubmissionRejected($video));
        }else if($video->state == 'licensed'){
            $video->licensed_at = now();

            // Make youtube video public
            if($video->youtube_id){
                MyYoutube::updatePrivacy($video->youtube_id);
            }

            // Send Licensed Email
            Mail::to($video->contact->email)->send(new SubmissionLicensed($video));
        }

        $video->save();

        return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'Successfully '.ucfirst($state).' Video', 'note_type' => 'success') );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function remind($id)
    {
        $video = Video::find($id);

        $video->more_details_sent = now();
        $video->reminders = $video->reminders ? $video->reminders+1 : 1;
        $video->save();

        // Send Accepted Email
        Mail::to($video->contact->email)->send(new DetailsReminder($video));

        return Redirect::to('admin/videos/edit/'.$id)->with(array('note' => 'Reminder socket_send(socket, buf, len, flags)', 'note_type' => 'success') );
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

        $image = (isset($data['image'])) ? $data['image'] : '';
        if(!empty($image)){
            $fileName = time().'.'.$request->file->getClientOriginalExtension();
            $file = $request->file('file');
            $fileMimeType = $file->getMimeType();
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $data['image'] = Storage::disk('s3')->url($fileName);

            //$data['image'] = ImageHandler::uploadImage($data['image'], 'images');
        } else {
            $data['image'] = 'placeholder.jpg';
        }

        $tags = $data['tags'];
        unset($data['tags']);

        if(empty($data['active'])){
            $data['active'] = 0;
        }

        if(empty($data['featured'])){
            $data['featured'] = 0;
        }

        if(isset($data['duration'])){
                //$str_time = $data
                $str_time = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $data['duration']);
                sscanf($str_time, "%d:%d:%d", $hours, $minutes, $seconds);
                $time_seconds = $hours * 3600 + $minutes * 60 + $seconds;
                $data['duration'] = $time_seconds;
        }

        $video = Video::create($data);
        $this->addUpdateVideoTags($video, $tags);

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
        $video = Video::find($id);

        $data = array(
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'post_route' => url('admin/videos/update'),
            'button_text' => 'Update Video',
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_campaigns' => Campaign::all(),
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
        $video = Video::findOrFail($id);

        $validator = Validator::make($data = $input, $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $tags = $data['tags'];
        unset($data['tags']);
        $this->addUpdateVideoTags($video, $tags);

        if(isset($data['duration'])){
                //$str_time = $data
                $str_time = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $data['duration']);
                sscanf($str_time, "%d:%d:%d", $hours, $minutes, $seconds);
                $time_seconds = $hours * 3600 + $minutes * 60 + $seconds;
                $data['duration'] = $time_seconds;
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

        return Redirect::to('admin/videos/edit' . '/' . $id)->with(array('note' => 'Successfully Updated Video!', 'note_type' => 'success') );
    }

    public function comment($id)
    {
        $video = Video::find($id);

        if(Input::get('comment')){
            $comment = new Comment();
            $comment->comment = Input::get('comment');
            $comment->user_id = Auth::id();

            $video->comments()->save($comment);
        }

        return Redirect::to('admin/videos/edit' . '/' . $id)->with(array('note' => 'Successfully Updated Video!', 'note_type' => 'success') );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $video = Video::find($id);

        // Detach and delete any unused tags
        foreach($video->tags as $tag){
            $this->detachTagFromVideo($video, $tag->id);
            if(!$this->isTagContainedInAnyVideos($tag->name)){
                $tag->delete();
            }
        }

        $this->deleteVideoImages($video);

        $video->delete();
        $video->save();

        return Redirect::to('admin/videos')->with(array('note' => 'Successfully Deleted Video', 'note_type' => 'success') );
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
