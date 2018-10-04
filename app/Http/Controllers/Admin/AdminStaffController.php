<?php

namespace App\Http\Controllers\Admin;

use App\Story;
use App\User;
use App\UserRole;
use App\Video;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminStaffController extends Controller
{

	protected $user, $video, $story, $userRole;

	public function __construct(User $user, Video $video, Story $story, UserRole $userRole)
	{
		$this->user = $user;
		$this->video = $video;
		$this->story = $story;
		$this->userRole = $userRole;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$from = request()->has('from') ? Carbon::parse(request()->get('from'))->startOfDay() : Carbon::now()->subMonths(1)->startOfDay();
		$to = request()->has('to') ? Carbon::parse(request()->get('to'))->endOfDay() : Carbon::now()->endOfDay();

		$type = request()->get('type') ?? 'video';
		$rights = request()->get('rights') ?? 'ex';

		$users = $this->user
			->where('client_id', '=', null)
			->orderBy('full_name');

		if ($type === 'video') {
			$users = $this->getVideoStats($users, $from, $to);
			$states = config('videos.states_with_names');
		} else {
			$users = $users->with('assignedStories')
				->whereIn('job_role', array_keys($this->userRole::$storyJobRoles))->get();
			$states = null;
		}

		return view('admin.staff.index')
			->with('rights', $rights)
			->with('from', $from)
			->with('to', $to)
			->with('type', $type)
			->with('users', $users)
			->with('states', $states);
	}

	/**
	 * @param $users
	 * @param $from
	 * @param $to
	 * @return mixed
	 */
	public function getVideoStats($users, $from, $to)
	{
		$users = $users->whereHas('assignedVideos')
			->whereIn('job_role', array_keys($this->userRole::$videoJobRoles))->get();

		foreach ($users as $user) {
			$videos = $this->video->select(\DB::raw('count(id) as total, state'))
				->where('user_id', $user->id)
				->groupBy('state')
				->where('updated_at', '>=', $from)
				->where('updated_at', '<=', $to)
				->get()->toArray();

			$total = 0;
			$array = [];
			foreach($videos as $workload) {
				if($workload['state'] === null) {
					$array['nostate'] = $workload['total'];
				} else {
					$array[$workload['state']] = $workload['total'];
				}
				$total += $workload['total'];
			}
			$user['workload'] = $array;
			$user['workloadTotal'] = $total;
		}
		return $users;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
