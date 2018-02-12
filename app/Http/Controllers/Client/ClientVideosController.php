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
    public function index(Request $request)
    {
        $search_value = Input::get('s');
        $collection_value = Input::get('collection');

        $videos = new Video;
        $videos = $videos->where('state', 'licensed');

        if(!empty($search_value)){
            $videos = $videos->where(function($query) use($search_value){
                $query->where('title', 'LIKE', '%'.$search_value.'%');
            })->orWhereHas('tags', function ($q) use($search_value){
                $q->where('name', 'LIKE', '%'.$search_value.'%');
            })->orWhere('alpha_id', $search_value);
        }

        if(!empty($collection_value)){
            $videos = $videos->where('video_collection_id', $collection_value);
        }

        $videos = $videos->orderBy('id', 'DESC')->paginate(24);

        $user = Auth::user();

        $data = array(
            'videos' => $videos,
            'user' => $user,
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        );

        return view('client.videos.index', $data);
    }

     /**
     * View the specified video.
     *
     * @param  int  $id
     * @return Response
     */
    public function view($id)
    {
        $video = Video::where('alpha_id', $id)->where('state', 'licensed')->first();

        $user = Auth::user();

        $data = array(
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'button_text' => 'Update Video',
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'user' => $user
        );

        return view('client.videos.create_edit', $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function interest(Request $request, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();
        $client = Client::find(Auth::user()->client_id);
        
        $video->notify(new ClientAction($video, 'interested', $client->name));

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'Our team have been notified of your interest in this video, we\'ll be in touch' , 'state' => 'request', 'current_state' => session('current_state'), 'video_id' => $video->id]);
        } else {
            return Redirect::to('admin/videos/'.session('state'))->with(array('note' => 'Our team have been notified of your interest in this video, we\'ll be in touch', 'note_type' => 'success') );
        }
    }
}
