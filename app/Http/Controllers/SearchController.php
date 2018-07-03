<?php

namespace App\Http\Controllers;

use Auth;
use App\ClientMailerUser;
use App\ClientMailerVideo;
use App\CollectionVideo;
use App\Libraries\VideoHelper;
use App\Setting;
use App\Story;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use App\Video;
use Illuminate\Support\Facades\Input;

class SearchController extends Controller
{
    use FrontendResponse;
    use VideoHelper;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view('frontend.master');
    }

	/**
	 * @param Request $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
	 */
	public function videos(Request $request)
	{
		$data = [];
		$mailerVideos = [];
		$tag_value = $request->tag;
		$search_value = $request->search;
		$current_video_id = Input::get('alpha_id');
		$featured = Input::get('featured');
		$settings = config('settings.site');

		if($current_video_id){
			$current_video = $this->getCurrentVideo($current_video_id);
		}

		//Remove any exclusive based collections that have been purchased and downloaded.
		$unsearchableVideos = CollectionVideo::where('type', 'exclusive')
			->whereIn('status', ['purchased', 'downloaded'])
			->pluck('video_id');

		$videos = Video::select($this->getVideoFieldsForFrontend());
		$videos = $videos->where('state', 'licensed');

		if($search_value){
			$videos = $videos->where(function ($query) use ($search_value) {
				$query->where('title', 'LIKE', '%' . $search_value . '%');
			});
			$videos = $videos->orWhereHas('tags', function ($q) use ($search_value) {
				$q->where('name', 'LIKE', '%' . $search_value . '%');
			});
		}

		if($tag_value){
			$videos = $videos->whereHas('tags', function ($query) use ($tag_value) {
				$query->where('name', '=', $tag_value);
			});
		}


		if($featured){
			$videos = $videos->where('featured', 1);
		}

		$videos = $videos->where('file', '!=', NULL);
		$videos = $videos->whereNotIn('id', $unsearchableVideos);
		$videos = $videos->orderBy('licensed_at', 'DESC');
		$videos = $videos->paginate($settings['posts_per_page']);

		if($current_video_id){
			$next_alpha_id = '';
			$previous_alpha_id = '';

			$position = $videos->pluck('id')->search($current_video->id);

			$check_previous_id = $position - 1;
			if ($check_previous_id >= 0) {
				$previous_alpha_id = $videos[$check_previous_id]->alpha_id;
			}

			$check_next_id = $position + 1;
			if ($check_next_id < $videos->count()) {
				$next_alpha_id = $videos[$check_next_id]->alpha_id;
			}

			$data['current_video'] = $current_video;
			$data['next_video_alpha_id'] = $next_alpha_id;
			$data['prev_video_alpha_id'] = $previous_alpha_id;
		}

		if(Auth::check()){
			$mailers = ClientMailerUser::where('user_id', auth()->user()->id)->pluck('client_mailer_id');

			$mailerVideoIds = ClientMailerVideo::whereIn('client_mailer_id', $mailers)->pluck('video_id');

			$mailerVideos = Video::select($this->getVideoFieldsForFrontend())
				->whereIn('id', $mailerVideoIds)
				->whereNotIn('id', $unsearchableVideos)
				->paginate();
		}

		$data['mailer_videos'] = $mailerVideos;
		$data['videos'] = $videos;

		return $this->successResponse($data);
	}


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function stories(Request $request)
    {
        $current_story = $this->getCurrentstory($request->alpha_id);

        $next_alpha_id = '';
        $next = Story::select('alpha_id')
            ->where('date_ingested', '<', $current_story->date_ingested)
            ->orderBy('date_ingested', 'DESC')
            ->first();

        // Check if exists or no
        if ($next) {
            $next_alpha_id = $next->alpha_id;
        }

        $previous_alpha_id = '';
        $previous = Story::where('date_ingested', '>', $current_story->date_ingested)
            ->orderBy('date_ingested', 'ASC')
            ->first();

        if ($previous) {
            $previous_alpha_id = $previous->alpha_id;
        }

        $data = [
            'current_story' => $current_story,
            'next_story_alpha_id' => $next_alpha_id,
            'prev_story_alpha_id' => $previous_alpha_id
        ];
        return $this->successResponse($data);
    }


    private function getCurrentVideo($alpha_id){
        $current_video = Video::
            where('alpha_id', '=', $alpha_id)
            ->with('tags')
            ->first();
        $current_video->iframe = $this->getVideoHtml($current_video, true);

        return $current_video;
    }

    private function getCurrentStory($alpha_id){
        $current_story = Story::where('alpha_id', $alpha_id)->with('assets')->first();
        return $current_story;
    }
}