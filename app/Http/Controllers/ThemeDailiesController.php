<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\Page;
use App\Menu;
use App\Video;
use App\VideoCategory;
use App\Libraries\ThemeHelper;
use Illuminate\Support\Facades\Input;

class ThemeDailiesController extends Controller {
	public function index(){
		if(!Auth::guest()):
			$page = Input::get('page');
			$user = Auth::user();

			if(empty($page)){
				$page = 1;
			}

			if($user->role == 'client'){
				$videos = Video::whereHas('campaigns', function ($q){
					$q->where('id', 2);
				})->orderBy('licensed_at', 'desc')->paginate(12);
			}else{
				$favorites = Video::where('user_id', '=', Auth::user()->id)->orderBy('created_at', 'desc')->get();

				$favorite_array = array();
				foreach($favorites as $key => $fave){
					array_push($favorite_array, $fave->video_id);
				}

				$videos = Video::where('active', '=', '1')->whereIn('id', $favorite_array)->paginate(12);
			}

	        $data = array(
	        	'day_sort' => true,
	            'videos' => $videos,
	            'page_title' => ucfirst(Auth::user()->username) . '\'s Daily Videos',
	            'current_page' => $page,
	            'page_description' => 'Page ' . $page,
	            'menu' => Menu::orderBy('order', 'ASC')->get(),
	            'pagination_url' => '/favorites',
	            'video_categories' => VideoCategory::all(),
				'theme_settings' => ThemeHelper::getThemeSettings(),
				'pages' => Page::where('active', '=', 1)->get(),
            );

	        return view('Theme::video-list', $data);

	    else:

	    	return Redirect::to('videos');

	    endif;
	}

}