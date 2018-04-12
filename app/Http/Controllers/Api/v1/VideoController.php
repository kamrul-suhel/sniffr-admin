<?php 

namespace App\Http\Controllers\Api\v1;

use Response;
use App\Video;
use Auth;
use App\VideoCategory;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Input;

class VideoController extends Controller {

	private $default_limit = 50;
	private $public_columns = array('id', 'video_category_id', 'rights', 'access', 'details', 'description', 'featured', 'duration', 'views', 'image', 'created_at', 'updated_at');
	/**
	 * Show all videos.
	 *
	 * @return Json response
	 */
	public function index()
	{
		$response = Video::where('active', '=', '1');

		if(Input::get('offset')){
			$reponse = $response->skip(Input::get('offset'));
		}

		if( Input::get('filter') && Input::get('order') ){
			$response = $response->orderBy(Input::get('filter'), Input::get('order'));
		} else {
			$response = $response->orderBy('created_at', 'desc');
		}

		if(Input::get('limit')){
			$response = $response->take(Input::get('limit'));
		} else {
			$response = $response->take($this->default_limit);
		}

		return Response::json($response->get($this->public_columns), 200);
	}

	public function video($id)
	{
		$settings = config('settings.site');
		$video = Video::find($id);
		
		// If user has access to all the content
		//if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() && Auth::user()->subscribed()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings->free_registration && Auth::user()->role == 'registered') ){
		if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings->free_registration && Auth::user()->role == 'registered') ){
			$columns = null;
		// Else we need to restrict the columns we return
		} else {
			$columns = $this->public_columns;
		}
		return Response::json(Video::where('id', '=', $id)->get($columns), 200);
	}

	public function video_categories(){
		return Response::json(VideoCategory::orderBy('order')->get(), 200);
	}

	public function video_category($id){
		$video_category = VideoCategory::find($id);
		return Response::json($video_category, 200);
	}

}
