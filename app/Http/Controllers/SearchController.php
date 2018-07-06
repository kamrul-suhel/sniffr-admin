<?php

namespace App\Http\Controllers;

use Auth;
use App\ClientMailerUser;
use App\ClientMailerVideo;
use App\ClientMailerStory;
use App\CollectionVideo;
use App\CollectionStory;
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
		$tagValue = $request->tag;
		$searchValue = $request->search;
		$currentVideoId = Input::get('alpha_id');
		$featured = Input::get('featured');
		$settings = config('settings.site');

		if($currentVideoId){
			$currentVideo = $this->getCurrentVideo($currentVideoId);
		}

		//Remove any exclusive based collections that have been purchased and downloaded.
		$unsearchableVideos = CollectionVideo::where([['type', 'exclusive'], ['status', 'purchased']])->pluck('video_id');

		$videos = Video::select($this->getVideoFieldsForFrontend());
		$videos = $videos->where('state', 'licensed');

		if($searchValue){
			$videos = $videos->where(function ($query) use ($searchValue) {
				$query->where('title', 'LIKE', '%' . $searchValue . '%');
			});
			$videos = $videos->orWhereHas('tags', function ($q) use ($searchValue) {
				$q->where('name', 'LIKE', '%' . $searchValue . '%');
			});
		}

		if($tagValue){
			$videos = $videos->whereHas('tags', function ($query) use ($tagValue) {
				$query->where('name', '=', $tagValue);
			});
		}


		if($featured){
			$videos = $videos->where('featured', 1);
		}

		$videos = $videos->where('file', '!=', NULL);
		$videos = $videos->whereNotIn('id', $unsearchableVideos);
		$videos = $videos->orderBy('licensed_at', 'DESC');
		$videos = $videos->paginate($settings['posts_per_page']);

		if($currentVideoId){
			$nextAlphaId = '';
			$previousAlphaId = '';

			$position = $videos->pluck('id')->search($currentVideo->id);

			$checkPreviousId = $position - 1;
			if ($checkPreviousId >= 0) {
				$previousAlphaId = $videos[$checkPreviousId]->alpha_id;
			}

			$checkNextId = $position + 1;
			if ($checkNextId < $videos->count()) {
				$nextAlphaId = $videos[$checkNextId]->alpha_id;
			}

			$data['current_video'] = $currentVideo;
			$data['next_video_alpha_id'] = $nextAlphaId;
			$data['prev_video_alpha_id'] = $previousAlphaId;
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
		$data = [];
		$mailerStories = [];
		$searchValue = $request->search;
		$currentStoryId = Input::get('alpha_id');
		$settings = config('settings.site');

		if($currentStoryId) {
			$currentStory = $this->getCurrentstory($currentStoryId);
		}

		//Remove any exclusive based collections that have been purchased and downloaded.
		//$unsearchableStories = CollectionStory::where(['type'=>'exclusive','status'=>'purchased'])->pluck('story_id');

		$stories = Story::where('state', 'licensed');

		if($searchValue){
			$stories = $stories->where(function ($query) use ($searchValue) {
				$query->where('title', 'LIKE', '%' . $searchValue . '%');
			});
		}

		//$stories = $stories->whereNotIn('id', $unsearchableStories);
		$stories = $stories->orderBy('id', 'DESC');
		$stories = $stories->paginate($settings['posts_per_page']);

		if($currentStoryId){
			$nextAlphaId = '';
			$previousAlphaId = '';

			$position = $stories->pluck('id')->search($currentStory->id);

			$checkPreviousId = $position - 1;
			if ($checkPreviousId >= 0) {
				$previousAlphaId = $stories[$checkPreviousId]->alpha_id;
			}

			$checkNextId = $position + 1;
			if ($checkNextId < $stories->count()) {
				$nextAlphaId = $stories[$checkNextId]->alpha_id;
			}

			$data['current_story'] = $currentStory;
			$data['next_story_alpha_id'] = $nextAlphaId;
			$data['prev_story_alpha_id'] = $previousAlphaId;
		}

		if(Auth::check()){
			$mailers = ClientMailerUser::where('user_id', auth()->user()->id)->pluck('client_mailer_id');

			$mailerStoryIds = ClientMailerStory::whereIn('client_mailer_id', $mailers)->pluck('story_id');

			$mailerStories = Story::whereIn('id', $mailerStoryIds);
			//$mailerStories = $mailerStories->whereNotIn('id', $unsearchableStories);
			$mailerStories = $mailerStories->paginate();
		}

		$data['mailer_stories'] = $mailerStories;
		$data['stories'] = $stories;

        return $this->successResponse($data);
    }


    private function getCurrentVideo($alpha_id){
        $currentVideo = Video::
            where('alpha_id', '=', $alpha_id)
            ->with('tags')
            ->first();
        $currentVideo->iframe = $this->getVideoHtml($currentVideo, true);

        return $currentVideo;
    }

    private function getCurrentStory($alpha_id){
        $currentStory = Story::where('alpha_id', $alpha_id)->with('assets')->first();
        return $currentStory;
    }
}