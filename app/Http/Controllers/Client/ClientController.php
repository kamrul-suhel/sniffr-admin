<?php

namespace App\Http\Controllers\Client;

use Auth;
use Validator;
use Redirect;

use App\User;
use App\Page;
use App\Menu;
use App\Post;
use App\Video;
use App\Setting;
use App\Campaign;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;

use Carbon\Carbon as Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class ClientController extends Controller {

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
        $settings = Setting::first();

        $campaigns = new Campaign();

        // Set campaign id
        if($client_id = Auth::user()->client_id){
            $campaigns = Campaign::where('client_id', $client_id);
        }

        $campaigns = $campaigns->get();

        // set campaign id if just 1
        if(count($campaigns) == 1){
            $request->session()->put('campaign', $campaigns[0]->id);
        }

        if($campaign = Input::get('campaign')){
            $request->session()->put('campaign', $campaign);
        }

        $data = array(
            'admin_user' => Auth::user(),
            'total_videos' => count(Video::get()),
            'downloaded_videos' => count(Video::where('state', 'new')->get()),
            'possible_videos' => count(Video::where('state', 'licensed')->get()),
            'declined_videos' => count(Video::where('state', 'pending')->get()),
            'campaigns' => $campaigns,
            'settings' => $settings
        );

        return view('client.index', $data);
    }
}
