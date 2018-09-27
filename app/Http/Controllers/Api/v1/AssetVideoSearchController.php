<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\v1\Traits\AssetVideoTrait;
use App\Libraries\VideoHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AssetVideoSearchController extends AssetBaseStoryVideoController
{
    use AssetVideoTrait, VideoHelper;

    public function __construct()
    {
        Parent::__construct();
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

        $videos = $this->filterByMaxMinLength($videos, $request);

        $sortArray = $this->sortVideoBy($request->sortBy);
        $videos = $videos->orderBy($sortArray[0], $sortArray[1]);

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
            if ($this->user) {
                $client_id = $this->user->client_id;
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
        if ($this->user) {
            $mailers = $this->clientMailerUser->where('user_id', $this->user->id)
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
}
