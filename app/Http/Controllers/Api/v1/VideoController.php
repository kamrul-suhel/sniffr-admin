<?php

namespace App\Http\Controllers\Api\v1;

use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Response;
use App\Video;
use Auth;
use App\VideoCategory;

use Illuminate\Support\Facades\Input;

class VideoController extends FrontendApiController {

	use FrontendResponse;

	private $default_limit = 50;
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

    /**
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(string $id)
    {
        $video = Video::select($this->getVideoFieldsForFrontend())
            ->where('state', 'licensed')
            ->with('tags')
            ->orderBy('licensed_at', 'DESC')
            ->where('alpha_id', $id)
            ->first();
        $iFrame = $this->getVideoHtml($video, true);
        $view_increment = $this->handleViewCount($id);
        $data = [
            'video' => $video,
            'iframe' => $iFrame,
            'view_increment' => $view_increment,
        ];

        return $this->successResponse($data);
    }

	public function video($id)
	{
		$settings = config('settings.site');
		$video = Video::find($id);

		// If user has access to all the content
		//if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() && Auth::user()->subscribed()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings['free_registration'] && Auth::user()->role == 'registered') ){
		if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings['free_registration'] && Auth::user()->role == 'registered') ){
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
