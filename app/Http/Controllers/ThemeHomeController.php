<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

use App\Page;
use App\Menu;
use App\Video;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;

class ThemeHomeController extends Controller {

	use ThemeHelper;

	private $videos_per_page = 12;

	public function __construct()
	{
		//$this->middleware('secure');
//		$settings = Setting::first();
//        $this->videos_per_page = $settings->videos_per_page;


        //Upload from home page
        $user = Auth::user();
        $this->data = array(
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'video_categories' => VideoCategory::all(),
            'post_categories' => PostCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        );


	}

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	*/
	public function index()
	{
	    $total_video = Video::all()->count();

//	    dd(Carbon::now()->startOfMonth());
	    $current_month_upload_video = Video::where('created_at', '>=', Carbon::now()->startOfMonth())->count();
	    $active_video = Video::where('active', 1)->count();

		$data = array(
			'videos' => Video::where('state', 'licensed')->orderBy('created_at', 'DESC')->simplePaginate($this->videos_per_page),
			'total_video' => $total_video,
			'current_month_upload_video' => $current_month_upload_video,
			'active_video'  => $active_video,
			'current_page' => 1,
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'pagination_url' => '/videos',
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
		);

//		dd($data);
//		return view('Theme::home', $data);
		return view('frontend.pages.home.home',$data);
	}
}