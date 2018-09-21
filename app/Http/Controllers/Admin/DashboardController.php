<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\Video;
use App\Contract;
use Carbon\Carbon as Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    const START_DATE = ['2018', '02', '15'];

    /**
     * @var Carbon
     */
    private $startDate;

    protected $video, $contract;

    /**
     * DashboardController constructor.
     * @param Video $video
     * @param Contract $contract
     */
    public function __construct(Video $video, Contract $contract)
    {
        $this->middleware('admin');

        $this->video = $video;

        $this->contract = $contract;

        $this->startDate = (new Carbon)->create(self::START_DATE[0], self::START_DATE[1], self::START_DATE[2]);
    }

    /**
     * Setup the layout used by the controller.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $from = request()->has('from') ? Carbon::parse(request()->get('from'))->startOfDay() : Carbon::now()->subMonths(1)->startOfDay();
        $to = request()->has('to') ? Carbon::parse(request()->get('to'))->endOfDay() : Carbon::now()->endOfDay();
        $rights = request()->get('rights') ?? 'ex';

        $allVideosStateTotal = $this->getAllVideoStatesByRights($from, $to, $rights);
        $allVideosStateTotalDates = array_values(array_unique($allVideosStateTotal->pluck('created_at')->toArray()));
        $allVideosStateTotalTotals = $this->formatVideoStateArray($allVideosStateTotalDates, $allVideosStateTotal);

        $allVideosStateTotalExc = $this->getAllVideoStatesByRights($from, $to, 'exc');
        $allVideosStateTotalDatesExc = array_values(array_unique($allVideosStateTotalExc->pluck('created_at')->toArray()));
        $allVideosStateTotalTotalsExc = $this->formatVideoStateArray($allVideosStateTotalDatesExc, $allVideosStateTotalExc);

        $total_videos = $this->video->count();
        $new_videos = $this->video->select('id')->where('state', 'new')->whereBetween('updated_at', [$from, $to])->count();
        $licensed_videos = $this->video->select('id')->where('state', 'licensed')->whereBetween('updated_at', [$from, $to])->count();
        $pending_videos = $this->video->select('id')->where('state', 'pending')->whereBetween('updated_at', [$from, $to])->count();

        $exc_contracts = $this->contract
			->orderBy('signed_at')
			->get()
            ->where('video_id', '!=', null)
            ->where('contract_model_id', '1')
            ->where('signed_at', '>', $from)
            ->where('signed_at', '<', $to)
			->groupBy(function ($date) {
                return Carbon::parse($date->signed_at)->format('m-d'); // grouping by days
            });

        $exc_contracts_users = $this->contract->get()
            ->where('video_id', '!=', null)
            ->where('contract_model_id', '1')
            ->where('signed_at', '>', (new Carbon)->now()->subDays(30))
            ->groupBy('user_id');

		$exc_contracts_stories = $this->contract
			->orderBy('signed_at')
			->get()
			->where('story_id', '!=', null)
			->where('contract_model_id', '5')
			->where('signed_at', '>', $from)
			->where('signed_at', '<', $to)
			->groupBy(function ($date) {
				return Carbon::parse($date->signed_at)->format('m-d'); // grouping by days
			});

		$exc_contracts_stories_users = $this->contract->get()
			->where('story_id', '!=', null)
			->where('contract_model_id', '5')
			->where('signed_at', '>', (new Carbon)->now()->subDays(30))
			->groupBy('user_id');

        $data = [
            'from' => $from,
            'to' => $to,
            'user' => auth()->user(),
            'allVideosStateTotalTotals' => $allVideosStateTotalTotals,
            'allVideosStateTotalTotalsExc' => $allVideosStateTotalTotalsExc,
            'exc_contracts' => $exc_contracts,
            'exc_contracts_users' => $exc_contracts_users,
            'exc_contracts_stories' => $exc_contracts_stories,
            'exc_contracts_stories_users' => $exc_contracts_stories_users,
            'total_videos' => $total_videos,
            'new_videos' => $new_videos,
            'licensed_videos' => $licensed_videos,
            'pending_videos' => $pending_videos,
            'settings' => config('settings.site')
        ];

        return view('admin.dashboard.index', $data);
    }

    /**
     * @param $from
     * @param $to
     * @param $right
     * @return \Illuminate\Support\Collection
     */
    public function getAllVideoStatesByRights($from, $to, $right)
    {
        return $allVideosStateTotal = \DB::table('videos')
            ->select(DB::raw('count(id) as total'), 'state', 'created_at')
            ->whereBetween('created_at', [$from, $to])
            ->where('rights', $right)
            ->where('state', '!=', 'problem')
            ->groupBy(DB::raw('DATE(created_at), state'))
            ->orderBy('created_at', 'ASC')->get();
    }

    /**
     * @param $allVideosStateTotalDates
     * @param $allVideosStateTotal
     * @return bool
     */
    public function formatVideoStateArray($allVideosStateTotalDates, $allVideosStateTotal)
    {
        $allVideosStateTotalTotals = [];
        foreach ($allVideosStateTotalDates as $key => $date) {
            $formatDate = date('y-m-d', strtotime($date));
            $key = $formatDate;
            $allVideosStateTotalTotals[$key] = [];
            foreach ($allVideosStateTotal as $total) {
                if (date('y-m-d', strtotime($total->created_at)) === $formatDate) {
                    $allVideosStateTotalTotals[$key][] = $total;
                }
            }
        }

        return $allVideosStateTotalTotals;
    }
}
