<?php

namespace App\Http\Controllers;

use App\Collection;
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
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Video;
use Illuminate\Support\Facades\Cache;

class SearchController extends Controller
{
    use FrontendResponse, VideoHelper;

    protected $collection, $collectionStory, $collectionVideo, $video, $story, $clientMailerStory, $clientMailerUser, $clientMailerVideo;

    public function __construct(Collection $collection, CollectionVideo $collectionVideo,
                                CollectionStory $collectionStory, Video $video, Story $story,
                                ClientMailerUser $clientMailerUser, ClientMailerStory $clientMailerStory,
                                ClientMailerVideo $clientMailerVideo)
    {
        $this->collection = $collection;
        $this->collectionVideo = $collectionVideo;
        $this->collectionStory = $collectionStory;
        $this->video = $video;
        $this->story = $story;
        $this->clientMailerStory = $clientMailerStory;
        $this->clientMailerVideo = $clientMailerVideo;
        $this->clientMailerUser = $clientMailerUser;
    }

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
     * @return \Illuminate\Http\JsonResponse
     */
	public function videos(Request $request)
	{
		$data = [];
		$mailerVideos = [];
		$tagValue = $request->tag;
		$searchValue = $request->search;
		$currentVideoId = $request->alpha_id;
		$featured = $request->featured;
		$settings = config('settings.site');

		if($currentVideoId){
			$currentVideo = $this->getCurrentVideo($currentVideoId);
		}

		//Remove any exclusive based collections that have been purchased and downloaded.
		$unsearchableVideos = $this->collectionVideo->getAssetByTypeStatus('exclusive', 'purchased')->pluck('video_id');

		$videos = $this->video->select($this->getVideoFieldsForFrontend());
		$videos = $videos->where('state', 'licensed');

		if($searchValue){
			$videos = $videos->where(function ($query) use ($searchValue) {
				$query->where('title', 'LIKE', '%' . $searchValue . '%')
					->orWhereHas('tags', function ($q) use ($searchValue) {
						$q->where('name', 'LIKE', '%' . $searchValue . '%');
					});
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

		if($currentVideoId){
		    $allVideo = $videos->get();
			$nextAlphaId = '';
			$previousAlphaId = '';

			$position = $allVideo->pluck('id')->search($currentVideo->id);

			$checkPreviousId = $position - 1;
			if ($checkPreviousId >= 0) {
				$previousAlphaId = $allVideo[$checkPreviousId]->alpha_id;
			}

			$checkNextId = $position + 1;
			if ($checkNextId < $allVideo->count()) {
				$nextAlphaId = $allVideo[$checkNextId]->alpha_id;
			}

			$data['current_video'] = $currentVideo;
			$data['next_video_alpha_id'] = $nextAlphaId;
			$data['prev_video_alpha_id'] = $previousAlphaId;
		}

		// If we are not searching then return all video with paginate
        if(!$currentVideoId){
            $videos = $videos->paginate($settings['posts_per_page']);
            $data['videos'] = $videos;
        }

        // Recommended Videos via the Mailer
		if(auth()->check()){
			$mailers = $this->clientMailerUser->where('user_id', auth()->user()->id)
                ->where('sent_at', ">", Carbon::now()->subDay()) // 24 hours
                ->pluck('client_mailer_id');

			$mailerVideoIds = $this->clientMailerVideo->whereIn('client_mailer_id', $mailers)
                ->pluck('video_id');

			$mailerVideos = $this->video->select($this->getVideoFieldsForFrontend())
				->whereIn('id', $mailerVideoIds)
				->whereNotIn('id', $unsearchableVideos)
                ->orderBy('licensed_at', 'DESC')
                ->limit(10)
                ->get();
		}

		$data['mailer_videos'] = $mailerVideos;

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
		$currentStoryId = $request->alpha_id;
		$settings = config('settings.site');

		if($currentStoryId) {
			$currentStory = $this->getCurrentstory($currentStoryId);
		}

		$stories = $this->story::where('state', 'published');

		if($searchValue){
			$stories = $stories->where(function ($query) use ($searchValue) {
				$query->where('title', 'LIKE', '%' . $searchValue . '%');
			});
		}

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

		if(auth()->check()){
			$mailers =$this->clientMailerUser->where('user_id', auth()->user()->id)
                ->where('sent_at', ">", Carbon::now()->subDay()) // 24 hours
                ->pluck('client_mailer_id');

			$mailerStoryIds = $this->clientMailerStory->whereIn('client_mailer_id', $mailers)
                ->pluck('story_id');

			$mailerStories = $this->story->whereIn('id', $mailerStoryIds);
			$mailerStories = $mailerStories->paginate();
		}

		$data['mailer_stories'] = $mailerStories;
		$data['stories'] = $stories;

        return $this->successResponse($data);
    }


    private function getCurrentVideo($alpha_id){
        $currentVideo = $this->video
            ->where('alpha_id', '=', $alpha_id)
            ->with('tags')
            ->first();
        $currentVideo->iframe = $this->getVideoHtml($currentVideo, true);

        return $currentVideo;
    }

    private function getCurrentStory($alpha_id){
        $currentStory = $this->story
            ->where('alpha_id', $alpha_id)
            ->with('assets')
            ->first();
        return $currentStory;
    }
}