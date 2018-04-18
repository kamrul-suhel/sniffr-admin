<?php

namespace App\Http\Controllers\Client;

use Auth;
use Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Video;
use App\Client;
use App\Campaign;
use App\VideoCategory;
use App\VideoCollection;
use App\VideoShotType;
use App\Http\Controllers\Controller;
use App\Notifications\ClientAction;

class ClientDailiesController extends Controller {

    /**
     * ClientDailiesController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('client');
    }

    /**
     * @param Request $request
     * @param string $state
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
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

        if ($campaign_id) {
            $request->session()->put('campaign_id', $campaign_id);
            $videos = $videos->whereHas('campaigns', function ($q) use ($campaign_id) {
                $q->where('id', $campaign_id);
            });
        } else {
            $videos = $videos->whereHas('campaigns', function ($q) use ($campaigns) {
                $q->whereIn('id', $campaigns->pluck('id'));
            });
        }

        if (!empty($search_value)) {
            $videos = Video::where(function ($query) use ($search_value) {
                $query->where('title', 'LIKE', '%' . $search_value . '%');
            })->orWhereHas('tags', function ($q) use ($search_value) {
                $q->where('name', 'LIKE', '%' . $search_value . '%');
            });
        }

        if ($state != 'all') {
            $videos = $videos->whereHas('campaigns', function ($q) use ($state) {
                $q->where('state', $state);
            });
        }

        $videos = $videos->paginate(9);

        $data = [
            'state' => $state,
            'videos' => $videos,
            'user' => $user,
            'campaign' => $campaign,
            'campaigns' => $campaigns,
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        ];

        return view('client.dailies.index', $data);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function view($id)
    {
        $video = Video::where('alpha_id', $id)->where('state', 'licensed')->first();

        $user = Auth::user();

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'admin_user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
            'user' => $user
        ];

        return view('client.dailies.create_edit', $data);
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
        $client = Client::find(Auth::user()->client_id);
        
        $campaigns[session('campaign_id')]['state'] = $state;
        $video->campaigns()->sync($campaigns);

        // Send email
        switch ($state) {
            case 'yes':
                $message = 'Thanks for choosing this video';
                break;
            case 'maybe':
                $message = 'You might use this video';
                break;
            case 'no':
                $message = 'We\'ll continue searching for suitable videos';
                break;
        }

        $client->notify(new ClientAction($video, $state, $client->name));

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => $message,
                'state' => $state,
                'remove' => 'yes',
                'video_id' => $video->id
            ]);
        }

        return Redirect::to('client/dailies/'.session('state'))->with([
            'note' => 'Successfully '.ucfirst($state).' Video',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function request(Request $request, $id)
    {
        $isJson = $request->ajax();

        $video = Video::where('alpha_id', $id)->first();
        $client = Client::find(Auth::user()->client_id);
        
        $client->notify(new ClientAction($video, 'request', $client->name));

        if($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => 'We\'ll do our best to get the video file ASAP',
                'state' => 'request',
                'current_state' => session('current_state'),
                'video_id' => $video->id]);
        }

        return Redirect::to('client/dailies/'.session('state'))->with([
            'note' => 'We\'ll do our best to get the video file ASAP',
            'note_type' => 'success'
        ]);
    }
}
