<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use Redirect;
use App\Video;
use App\Page;
use App\Menu;
use App\VideoCategory;
use Illuminate\Support\Facades\Input;
use App\Libraries\ThemeHelper;

class ThemeSearchController extends Controller {

	public function __construct()
	{
		//$this->middleware('secure');
	}

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	*/

	public function index(Request $request)
	{
		$search_value = Input::get('value');

		$settings = Setting::first();

		if(empty($search_value)){
			return Redirect::to('/');
		}

		$videos = Video::where(function($query) use($search_value){
			$query->where('state', '=', 'licensed')->where('title', 'LIKE', '%'.$search_value.'%');
		})->orWhereHas('tags', function ($q) use($search_value){
			$q->where('state', '=', 'licensed')->where('name', 'LIKE', '%'.$search_value.'%');
		})->orderBy('licensed_at', 'DESC')->paginate($settings->videos_per_page);


		$data = array(
			'videos' => $videos,
		);

        if($request->ajax()){
            return response($data);
        }else{
            return view('frontend.master', $data);
        }
	}

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function cacheIndex()
    {
        $search_value = Input::get('value');

        if (empty($search_value)) {
            return Redirect::to('/');
        }

        $videos = Video::where(function($query) use($search_value){
            $query->where('state', '=', 'licensed')->where('title', 'LIKE', '%'.$search_value.'%');
        })->orWhereHas('tags', function ($q) use($search_value){
            $q->where('state', '=', 'licensed')->where('name', 'LIKE', '%'.$search_value.'%');
        })->orderBy('licensed_at', 'DESC')->get();

        $data = [
            'videos' => $videos,
            'search_value' => $search_value,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];
        return view('Theme::search-list', $data);
    }
}
