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
        $from = request()->has('from') ? Carbon::parse(request()->get('from'))->startOfDay()  : Carbon::now()->subMonths(1)->startOfDay();
        $to = request()->has('to') ? Carbon::parse(request()->get('to'))->startOfDay()  : Carbon::now();

        $allVideosStateTotal = $this->getAllVideoStatesByRights($from, $to, 'ex');
        $allVideosStateTotalDates = array_values(array_unique($allVideosStateTotal->pluck('created_at')->toArray()));
        $allVideosStateTotalTotals = $this->formatVideoStateArray($allVideosStateTotalDates, $allVideosStateTotal);

        $allVideosStateTotalExc = $this->getAllVideoStatesByRights($from, $to, 'exc');
        $allVideosStateTotalDatesExc = array_values(array_unique($allVideosStateTotalExc->pluck('created_at')->toArray()));
        $allVideosStateTotalTotalsExc = $this->formatVideoStateArray($allVideosStateTotalDatesExc, $allVideosStateTotalExc);

        $videos = Video::get(['id']);
        $videos_by_state = Video::get(['state'])->groupBy('state');

        $exc_contracts = Contract::orderBy('signed_at')
            ->where('video_id', '!=', null)->where('contract_model_id', '1')
            ->where('signed_at', '>', (new Carbon)->now()->subDays(30))
            ->groupBy(function ($date) {
                return Carbon::parse($date->signed_at)->format('m-d');
            });

        $exc_contracts_users = Contract::get()->where('video_id', '!=', null)->where('contract_model_id', '1')->where('signed_at', '>', (new Carbon)->now()->subDays(30))->groupBy('user_id');
        $video_state_count = Video::get()->where('created_at', '>', $this->startDate)->groupBy('state');

        $data = [
            'from' => $from,
            'to' => $to,
            'user' => Auth::user(),
            'video_state_count' => $video_state_count,
            'total_videos' => $videos->count(),
            'allVideosStateTotalTotals' => $allVideosStateTotalTotals,
            'allVideosStateTotalTotalsExc' => $allVideosStateTotalTotalsExc,
            'exc_contracts' => $exc_contracts,
            'exc_contracts_users' => $exc_contracts_users,
            'new_videos' => (!$videos_by_state['new']) ? 0 : $videos_by_state['new']->count(),
            'licensed_videos' => (!$videos_by_state['licensed']) ? 0 : $videos_by_state['licensed']->count(),
            'pending_videos' => (!$videos_by_state['pending']) ? 0 : $videos_by_state['pending']->count(),
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
            ->select(DB::raw('count(id) as total'), 'state', DB::raw('GROUP_CONCAT(rights) as rights'), 'created_at')
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
                if ($total->created_at === $date) {
                    $allVideosStateTotalTotals[$key][] = $total;
                }
            }
        }

        return $allVideosStateTotalTotals;
    }
}
