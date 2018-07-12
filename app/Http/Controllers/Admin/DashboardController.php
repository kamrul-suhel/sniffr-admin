<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\Video;
use Carbon\Carbon as Carbon;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    const START_DATE = ['2018', '02', '15'];

    /**
     * @var Carbon
     */
    private $startDate;

    public function __construct()
    {
        $this->middleware('admin');
        $this->startDate = (new Carbon)->create(self::START_DATE[0], self::START_DATE[1], self::START_DATE[2]);
    }

    /**
     * Setup the layout used by the controller.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function index()
	{
        $videos = Video::get(['id']);
        $videos_by_state = Video::get(['state'])->groupBy('state');

		$all_videos = Video::get()->where('created_at', '>', (new Carbon)->now()->subDays(30))->groupBy(function($date) {
	        return Carbon::parse($date->created_at)->format('m-d'); // grouping by days
	    });

		$licensed_chaser_videos = Video::get()->where('rights', 'exc')->where('licensed_at', '>', (new Carbon)->now()->subDays(30))->groupBy(function($date) {
			return Carbon::parse($date->licensed_at)->format('m-d'); // grouping by days
		});

		foreach ($licensed_chaser_videos as $video) {
			echo count($video->currentContract->where('user_id', 1)) . ',';
		}


		// TODO: is this date arbitrary? is it a period?
	    $video_state_count = Video::get()->where('created_at', '>', $this->startDate)
            ->groupBy('state');

		$settings = config('settings.site');

		$data = [
			'user' => Auth::user(),
			'video_state_count' => $video_state_count,
			'total_videos' => $videos->count(),
			'videos' => $all_videos,
			'licensed_chaser_videos' => $licensed_chaser_videos,
			'new_videos' => (!$videos_by_state['new']) ? 0 : $videos_by_state['new']->count(),
			'licensed_videos' => (!$videos_by_state['licensed']) ? 0 : $videos_by_state['licensed']->count(),
			'pending_videos' => (!$videos_by_state['pending']) ? 0 : $videos_by_state['pending']->count(),
			'settings' => $settings
        ];

		return view('admin.dashboard.index', $data);
	}
}
