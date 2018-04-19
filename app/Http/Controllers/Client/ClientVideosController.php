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
use Carbon\Carbon as Carbon;
use App\Notifications\ClientAction;

class ClientVideosController extends Controller
{
    /**
     * ClientVideosController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('client');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        $search_value = Input::get('s');
        $collection_value = Input::get('collection');

        $videos = new Video;
        $videos = $videos->where('state', 'licensed');

        if(!empty($search_value)){
            $videos = $videos->where(function($query) use($search_value){
                $query->where('title', 'LIKE', '%'.$search_value.'%')
                ->orWhereHas('tags', function ($q) use($search_value){
                    $q->where('name', 'LIKE', '%'.$search_value.'%');
                })
                ->orWhere('alpha_id', $search_value);
            });
        }

        if (!empty($collection_value)) {
            $videos = $videos->where('video_collection_id', $collection_value);
        }

        // This strips out exclusive videos (for 48 hours) unless not being used.
        $videos = $videos->whereDoesntHave('campaigns', function ($q) {
            $q->where('campaign_video.created_at', '>', Carbon::now()
                ->subDays(2))
                ->where('campaign_video.state', '!=', 'no');
        });

        $videos = $videos->orderBy('id', 'DESC')->paginate(24);

        $data = [
            'videos' => $videos,
            'user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
        ];

        return view('client.videos.index', $data);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function view($id)
    {
        $video = Video::where('alpha_id', $id)->where('state', 'licensed')->first();

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Video',
            'video' => $video,
            'user' => Auth::user(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'video_shottypes' => VideoShotType::all(),
            'video_campaigns' => Campaign::all(),
        ];

        return view('client.videos.create_edit', $data);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function interest(Request $request, $id)
    {
        $isJson = $request->ajax() || $request->isJson();

        $video = Video::where('alpha_id', $id)->first();
        $client = Client::find(Auth::user()->client_id);
        
        $client->notify(new ClientAction($video, 'interested', $client->name));

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => 'Our team have been notified of your interest in this video, we\'ll be in touch',
                'state' => 'request',
                'current_state' => session('current_state'),
                'video_id' => $video->id
            ]);
        }

        return Redirect::to('admin/videos/' . session('state'))->with([
            'note' => 'Our team have been notified of your interest in this video, we\'ll be in touch',
            'note_type' => 'success'
        ]);
    }
}
