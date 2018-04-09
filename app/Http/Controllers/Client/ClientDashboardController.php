<?php

namespace App\Http\Controllers\Client;

use Auth;
use App\Video;
use App\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class ClientDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('client');
    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    public function index(Request $request)
    {
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

        $videos = $videos->get();

        $new = $yes = $no = $maybe = 0;

        foreach($videos as $video){
            switch($video->campaigns[0]->pivot->state){
                case 'new':
                    $new ++;
                    break;
                case 'yes':
                    $yes ++;
                    break;
                case 'no':
                    $no ++;
                    break;
                case 'maybe':
                    $maybe ++;
                    break;
            }
        }

        $data = array(
            'user' => Auth::user(),
            'total_videos' => count($videos),
            'new_videos' => $new,
            'yes_videos' => $yes,
            'no_videos' => $no,
            'campaign' => $campaign,
            'campaigns' => $campaigns,
        );

        return view('client.index', $data);
    }
}
