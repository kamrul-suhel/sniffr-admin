<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\Page;
use App\Menu;
use App\Video;
use App\Favorite;
use App\VideoCategory;

use Illuminate\Support\Facades\Input;

class ThemeFavoriteController extends Controller
{
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

            $data = [
                'videos' => $videos,
                'page_title' => ucfirst(Auth::user()->username) . '\'s Favorite Videos',
                'current_page' => $page,
                'page_description' => 'Page ' . $page,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'pagination_url' => '/favorites',
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];

//	        return view('Theme::video-list', $data);
	        return view('frontend.pages.favorites.favorites', $data);

	    else:

	    	return Redirect::to('videos');

	    endif;
	}

}