<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;

use App\Page;
use App\Menu;
use App\Video;
use App\Setting;
use App\Favorite;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;

use Illuminate\Support\Facades\Input;

class ThemeFavoriteController extends Controller {

	public function __construct()
	{
		//$this->middleware('secure');
	}

	// Add Media Like
	public function favorite(){
		$video_id = Input::get('video_id');
		$favorite = Favorite::where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video_id)->first();
		if(isset($favorite->id)){ 
			$favorite->delete();
		} else {
			$favorite = new Favorite;
			$favorite->user_id = Auth::user()->id;
			$favorite->video_id = $video_id;
			$favorite->save();
			echo $favorite;
		}
	}

	public function show_favorites(){

		if(!Auth::guest()):
			
			$page = Input::get('page');

			if(empty($page)){
				$page = 1;
			}
			
			$favorites = Favorite::where('user_id', '=', Auth::user()->id)->orderBy('created_at', 'desc')->get();

			$favorite_array = array();
			foreach($favorites as $key => $fave){
				array_push($favorite_array, $fave->video_id);
			}

			$videos = Video::where('active', '=', '1')->whereIn('id', $favorite_array)->paginate(12);

	        $data = array(
		            'videos' => $videos,
		            'page_title' => ucfirst(Auth::user()->username) . '\'s Favorite Videos',
		            'current_page' => $page,
		            'page_description' => 'Page ' . $page,
		            'menu' => Menu::orderBy('order', 'ASC')->get(),
		            'pagination_url' => '/favorites',
		            'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
	            );

	        return view('Theme::video-list', $data);

	    else:

	    	return Redirect::to('videos');

	    endif;
	}

}