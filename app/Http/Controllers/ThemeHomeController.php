<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
		$settings = Setting::first();
        $this->videos_per_page = $settings->videos_per_page;
	}

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	*/

	public function index()
	{

		if(Input::get('theme')){
			Cookie::queue('theme', \Input::get('theme'), 100);
			return Redirect::to('/')->withCookie(cookie('theme', \Input::get('theme'), 100));
		}

		$data = array(
			'videos' => Video::where('active', '=', '1')->orderBy('created_at', 'DESC')->simplePaginate($this->videos_per_page),
			'current_page' => 1,
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'pagination_url' => '/videos',
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
			);

		//dd($data['videos']);
		return view('Theme::home', $data);
	}

}