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

	public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */

	public function index()
	{
		$total_videos = count(Video::get());
		$new_videos = count(Video::where('state', 'new')->get());
		$licensed_videos = count(Video::where('state', 'licensed')->get());
		$pending_videos = count(Video::where('state', 'pending')->get());

		$settings = Setting::first();

		$data = array(
			'admin_user' => Auth::user(),
			'total_videos' => $total_videos,
			'new_videos' => $new_videos,
			'licensed_videos' => $licensed_videos,
			'pending_videos' => $pending_videos,
			'settings' => $settings
		);

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
