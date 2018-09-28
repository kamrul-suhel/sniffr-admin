<?php

namespace App\Http\Controllers\Api\v1;

use App\ClientMailerStory;
use App\ClientMailerUser;
use App\ClientMailerVideo;
use App\Collection;
use App\CollectionStory;
use App\CollectionVideo;
use App\Story;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AssetStorySearchController extends AssetBaseStoryVideoController
{

    public function __construct()
    {
        Parent::__construct();
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
        $user = $request->user('api');

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

        if ($user) {
            $client_id = $user->client_id;
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

        if ($user) {
            $mailers = $this->clientMailerUser
                ->where('user_id', $user->id)
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

    private function getCurrentStory($alpha_id)
    {
        $currentStory = $this->story
            ->select($this->getAssetStoryFieldsForFrontend())
            ->where('alpha_id', $alpha_id)
            ->with('assets');

        if ($this->user) {
            $client_id = $this->user->client_id;
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
}
