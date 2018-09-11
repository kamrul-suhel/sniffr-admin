<?php

namespace App\Http\Controllers;

use App\Collection;
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
        $tagValue = $request->tags;
        $searchValue = $request->search;
        $currentVideoId = $request->alpha_id;
        $featured = $request->featured;
        $settings = config('settings.site');

        if ($currentVideoId) {
            $currentVideo = $this->getCurrentVideo($currentVideoId);
        }

        //Remove any exclusive based collections that have been purchased and downloaded.
        $unsearchableVideos = $this->collectionVideo->getAssetByTypeStatus('exclusive', 'purchased')->pluck('video_id');

        $videos = $this->video->select($this->getVideoFieldsForFrontend());
        $videos = $videos->where('state', 'licensed');

        if ($searchValue) {
            $videos = $videos->where(function ($query) use ($searchValue) {
                $query->where('title', 'LIKE', '%' . $searchValue . '%')
                    ->orWhereHas('tags', function ($q) use ($searchValue) {
                        $q->where('name', 'LIKE', '%' . $searchValue . '%');
                    });
            });
        }

        if ($tagValue) {
            $tags =  explode(',', $tagValue);
            $videos = $videos->whereHas('tags', function ($query) use ($tags) {
                $query->whereIn('name', $tags);
            });
        }

        if ($featured) {
            $videos = $videos->where('featured', 1);
        }

        $videos = $videos->where('file', '!=', NULL);
        $videos = $videos->whereNotIn('id', $unsearchableVideos);

        if($request->has('sortBy')){
            $sortArray = $this->sortVideoBy($request->sortBy);
            $videos = $videos->orderBy($sortArray[0], $sortArray[1]);
        }else{
            $videos = $videos->orderBy('licensed_at', 'DESC');
        }


        if ($currentVideoId) {
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
        if (!$currentVideoId) {
            if (auth()->user()) {
                $client_id = auth()->user()->client_id;
                $videos = $videos->with(['videoCollections' => function ($query) use ($client_id) {
                    $query->select(['id', 'collection_id', 'video_id'])->where('status', 'purchased');
                    $query->whereHas('collection', function ($query) use ($client_id) {
                        $query->where('client_id', $client_id);
                    });
                }]);
            }
            $videos = $videos->paginate($settings['posts_per_page']);
            $data['videos'] = $videos;
        }

        // Recommended Videos via the Mailer
        if (auth()->check()) {
            $mailers = $this->clientMailerUser->where('user_id', auth()->user()->id)
                ->where('sent_at', ">", Carbon::now()->subDay())// 24 hours
                ->pluck('client_mailer_id');

            $mailerVideoIds = $this->clientMailerVideo->whereIn('client_mailer_id', $mailers)
                ->pluck('video_id');

            $mailerVideos = $this->video
                ->select($this->getVideoFieldsForFrontend())
                ->whereIn('id', $mailerVideoIds)
                ->whereNotIn('id', $unsearchableVideos)
                ->orderBy('licensed_at', 'DESC')
                ->limit(10)
                ->get();

            // Need iframe into every mailer video, so We do not need to call every time.
            foreach ($mailerVideos as $mailerVideo) {
                $mailerVideo->iframe = $this->getVideoHtml($mailerVideo, true);
            }
        }


        $data['mailerVideos'] = $mailerVideos;

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

        if ($currentStoryId) {
            $currentStory = $this->getCurrentstory($currentStoryId);
        }

        //Remove any exclusive based collections that have been purchased and downloaded.
        $unsearchableStories = $this->collectionStory->getAssetByTypeStatus('exclusive', 'purchased')->pluck('story_id');

        if ($request->get('mailer')) {
            $stories = $this->story
				->with('assets')
				->whereIn('state', ['licensed', 'writing-inprogress', 'writing-completed', 'subs-inprogress', 'subs-approved', 'published']);
        } else {
            $stories = $this->story->where('state', 'published');
        }

        if ($searchValue) {
            $stories = $stories->where('title', 'LIKE', '%' . $searchValue . '%');
        }

        if (auth()->check()) {
            $client_id = auth()->user()->client_id;
            $stories = $stories->with(['storyCollections' => function ($query) use ($client_id) {
                $query->select(['id', 'collection_id', 'story_id'])->where('status', 'purchased');
                $query->whereHas('collection', function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            }]);
        }

        $stories = $stories->whereNotIn('id', $unsearchableStories);
        $stories = $stories->orderBy('id', 'DESC');
        $stories = $stories->paginate($settings['posts_per_page']);

        if ($currentStoryId) {
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

        if (auth()->check()) {
            $mailers = $this->clientMailerUser
                ->where('user_id', auth()->user()->id)
                ->where('sent_at', ">", Carbon::now()->subDay())// 24 hours
                ->pluck('client_mailer_id');

            $mailerStoryIds = $this->clientMailerStory
                ->whereIn('client_mailer_id', $mailers)
                ->pluck('story_id');

            $mailerStories = $this->story
                ->whereIn('id', $mailerStoryIds)
                ->whereNotIn('id', $unsearchableStories)
                ->orderBy('licensed_at', 'DESC')
                ->limit(10)
                ->get();
        }

        $data['mailerStories'] = $mailerStories;
        $data['stories'] = $stories;

        return $this->successResponse($data);
    }


    private function getCurrentVideo($alpha_id)
    {
        $currentVideo = $this->video
            ->select($this->getVideoFieldsForFrontend())
            ->where('alpha_id', $alpha_id);

        if (auth()->check()) {
            $client_id = auth()->user()->client_id;
            $currentVideo = $currentVideo->with(['videoCollections' => function ($query) use ($client_id) {
                $query->select(['id', 'collection_id', 'video_id'])
                    ->where('status', 'purchased');
                $query->whereHas('collection', function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            }]);
        }

        $currentVideo = $currentVideo->with('tags')
            ->first();
        $currentVideo->iframe = $this->getVideoHtml($currentVideo, true);
        return $currentVideo;
    }

    private function getCurrentStory($alpha_id)
    {
        $currentStory = $this->story
            ->select($this->getAssetStoryFieldsForFrontend())
            ->where('alpha_id', $alpha_id)
            ->with('assets');

        if (auth()->user()) {
            $client_id = auth()->user()->client_id;
            $currentStory = $currentStory->with(['storyCollections' => function ($query) use ($client_id) {
                $query->select(['id', 'collection_id', 'story_id'])
                    ->where('status', 'purchased');
                $query->whereHas('collection', function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            }]);
        }

        $currentStory = $currentStory
            ->first();
        return $currentStory;
    }

    private function sortVideoBy($sortBy){
        $sortArray = [];
        switch($sortBy){
            case 'newVideoLast':
                $sortArray[] = 'licensed_at';
                $sortArray[] = 'ASC';
                break;

            case 'newVideo':
                $sortArray[] = 'licensed_at';
                $sortArray[] = 'DESC';
                break;

            case 'videoMaxLength':
                $sortArray[] = 'duration';
                $sortArray[] = 'DESC';
                break;

            case 'videoMinLength':
                $sortArray[] = 'duration';
                $sortArray[] = 'ASC';
                break;
        }
        return $sortArray;
    }
}
