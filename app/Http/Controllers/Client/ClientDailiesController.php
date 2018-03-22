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

class ClientDailiesController extends Controller {

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

        // Set campaign Id if there is only one
        if(count($campaigns) == 1){
            $campaign_id = $campaigns->first()->id;
        }
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

        $videos = $videos->paginate(9);

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

        return view('client.dailies.index', $data);
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
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'user' => $user
        );

        return view('client.dailies.create_edit', $data);
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

        $client->notify(new ClientAction($video, $state, $client->name));

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => $message, 'state' => $state, 'remove' => 'yes', 'video_id' => $video->id]);
        } else {
            return Redirect::to('client/dailies/'.session('state'))->with(array('note' => 'Successfully '.ucfirst($state).' Video', 'note_type' => 'success') );
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
        
        $client->notify(new ClientAction($video, 'request', $client->name));

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'We\'ll do our best to get the video file ASAP', 'state' => 'request', 'current_state' => session('current_state'), 'video_id' => $video->id]);
        } else {
            return Redirect::to('client/dailies/'.session('state'))->with(array('note' => 'We\'ll do our best to get the video file ASAP', 'note_type' => 'success') );
        }
    }
}
