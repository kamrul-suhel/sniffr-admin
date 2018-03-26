<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;

use App\User;
use App\Page;
use App\Menu;
use App\Post;
use App\Video;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;

use Carbon\Carbon as Carbon;

use App\Http\Controllers\Controller;

class AdminController extends Controller {

    const BASE_YEAR = '2018';
    const BASE_MONTH = '02';
    const BASE_DAY = '15';

	public function __construct()
    {
        $this->middleware('admin');
    }

    /**
     * Setup the layout used by the controller.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function index()
	{
        $videos = Video::get(['id']);
        $videos_by_state = Video::get(['state'])->groupBy('state');

        $date = new Carbon;
		$video_traffic = Video::get()->where('created_at', '>', $date->now()->subDays(30))->groupBy(function($date) {
	        return Carbon::parse($date->created_at)->format('m-d'); // grouping by days
	    });

	    $video_state_count = Video::get()->where('created_at', '>', $date->create(self::BASE_YEAR, self::BASE_MONTH, self::BASE_DAY))->groupBy('state');

		$settings = Setting::first();

		$data = [
			'admin_user' => Auth::user(),
			'video_state_count' => $video_state_count,
			'total_videos' => $videos->count(),
			'video_traffic' => $video_traffic,
			'new_videos' => (empty($videos_by_state['new']) ? 0 : $videos_by_state['new']->count()),
			'licensed_videos' => (empty($videos_by_state['licensed']) ? 0 : $videos_by_state['licensed']->count()),
			'pending_videos' => (empty($videos_by_state['pending']) ? 0 : $videos_by_state['pending']->count()),
			'settings' => $settings
        ];

		return view('admin.index', $data);
	}


	public function settings_form(){
		$settings = Setting::first();
		$user = Auth::user();
		$data = array(
			'settings' => $settings,
			'admin_user'	=> $user,
		);

		return view('admin.settings.index', $data);
	}

}
