<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\Video;
use Carbon\Carbon as Carbon;
use App\Http\Controllers\Controller;

class AdminController extends Controller {

    const YEAR = '2018';
    const MONTH = '02';
    const DAY = '15';

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

		// TODO: is this date arbitrary? is it a period?
	    $video_state_count = Video::get()->where('created_at', '>', $date->create(self::YEAR, self::MONTH, self::DAY))
            ->groupBy('state');

		$settings = config('settings.site');

		$data = [
			'user' => Auth::user(),
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
		$settings = config('settings.site');
		$data = array(
			'settings' => $settings,
			'user'	=> Auth::user(),
		);

		return view('admin.settings.index', $data);
	}

}
