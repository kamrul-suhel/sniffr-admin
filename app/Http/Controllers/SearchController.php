<?php

namespace App\Http\Controllers;

use App\Libraries\VideoHelper;
use App\Setting;
use App\Story;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Redirect;
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
        if ($request->ajax() || $request->isJson()) {
            $search_value = Input::get('value');
            $settings = config('settings.site');

            $videos = Video::where(function ($query) use ($search_value) {
                $query->where('state', '=', 'licensed')
                    ->where('title', 'LIKE', '%' . $search_value . '%');
            })
                ->orWhereHas('tags', function ($q) use ($search_value) {
                    $q->where('state', '=', 'licensed')
                        ->where('name', 'LIKE', '%' . $search_value . '%');
                })
                ->orderBy('licensed_at', 'DESC')
                ->paginate($settings['posts_per_page']);

            $data = [
                'videos' => $videos,
            ];
            return $this->successResponse($data);
        }

        return view('frontend.master');
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function featureVideosInDialog(Request $request)
    {

        if ($request->ajax() || $request->isJson()) {
            $current_video = $this->getCurrentVideo($request->alpha_id);


            $featured_videos = Video::where(function ($query) {
                $query->where([['state', 'licensed'], ['active', 1], ['featured', 1]])
                    ->orWhere('state', 'licensed')->orderBy('licensed_at', 'DESC');
            })
                ->orderBy('featured', 'DESC')
                ->orderBy('licensed_at', 'DESC')
                ->limit(12)
                ->get();


            $next_alpha_id = '';
            $previous_alpha_id = '';

            $position = $featured_videos
                ->pluck('id')
                ->search($current_video->id);


            $check_previous_id = $position - 1;
            if ($check_previous_id >= 0) {
                $previous_alpha_id = $featured_videos[$check_previous_id]->alpha_id;
            }

            $check_next_id = $position + 1;
            if ($check_next_id <= 11) {
                $next_alpha_id = $featured_videos[$check_next_id]->alpha_id;
            }


            $data = [
                'current_video' => $current_video,
                'next_video_alpha_id' => $next_alpha_id,
                'prev_video_alpha_id' => $previous_alpha_id
            ];

            return $this->successResponse($data);
        }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function videosInDialog(Request $request)
    {
        $current_video = $this->getCurrentVideo($request->alpha_id);

        $next_alpha_id = '';
        $next = Video::select('alpha_id')
            ->where('id', '<', $current_video->id)
            ->where('state', '=', 'licensed')
            ->orderBy('id', 'desc')
            ->first();

        // Check if exists or no
        if ($next) {
            $next_alpha_id = $next->alpha_id;
        }

        $previous_alpha_id = '';
        $previous = Video::select('alpha_id')
            ->where('id', '>', $current_video->id)
            ->where('state', '=', 'licensed')
            ->orderBy('id', 'asc')
            ->first();

        if ($previous) {
            $previous_alpha_id = $previous->alpha_id;
        }

        $data = [
            'current_video' => $current_video,
            'next_video_alpha_id' => $next_alpha_id,
            'prev_video_alpha_id' => $previous_alpha_id
        ];

            return $this->successResponse($data);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storyInDialog(Request $request)
    {
        $current_story = $this->getCurrentstory($request->alpha_id);


        $next_alpha_id = '';
        $next = Story::select('alpha_id')
            ->where('id', '<', $current_story->id)
            ->orderBy('id', 'desc')
            ->first();

        // Check if exists or no
        if ($next) {
            $next_alpha_id = $next->alpha_id;
        }

        $previous_alpha_id = '';
        $previous = Story::select('alpha_id')
            ->where('id', '>', $current_story->id)
            ->orderBy('id', 'asc')
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


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagsSearchVideosInDialog(Request $request)
    {
        $tagName = $request->tag;

        $current_video = Video::where('alpha_id', $request->alpha_id)
            ->with('tags')
            ->first();
        $current_video->iframe = $this->getVideoHtml($current_video, true);

        $videos = Video::where('state', 'licensed')
            ->whereHas('tags', function ($query) use ($tagName) {
            $query->where('name', '=', $tagName);
        })
            ->get();

        $data = $this->getNextPreviousAlphaId($current_video, $videos);

        return $this->successResponse($data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchVideosInDialog(Request $request)
    {
        $current_video = $this->getCurrentVideo($request->alpha_id);

        $search_value = $request->value;

        $videos = Video::
            where(function ($query) use ($search_value) {
                $query->where('state', '=', 'licensed')
                    ->where('title', 'LIKE', '%' . $search_value . '%');
            })
            ->orWhereHas('tags', function ($q) use ($search_value) {
                $q->where('state', '=', 'licensed')
                    ->where('name', 'LIKE', '%' . $search_value . '%');
            })
            ->orderByDesc('licensed_at')
            ->get();

        $data = $this->getNextPreviousAlphaId($current_video, $videos);

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
        $current_story = Story::
        where('alpha_id', '=', $alpha_id)
            ->with('assets')
            ->first();
        return $current_story;
    }

    private function getNextPreviousAlphaId($current_video, $videos){
        $total_row = $videos->count() - 1;

        $next_alpha_id = '';
        $previous_alpha_id = '';


        $position = $videos->search(function($item , $key) use ($current_video){
            if($item->alpha_id == $current_video->alpha_id){
                return $item;
            }
        });

        $next_position = $position + 1;
        if($next_position <= $total_row){
            $next_alpha_id = $videos[$next_position]->alpha_id;
        }
        $previous_position = $position -1;

        if($previous_position >= 0){
            $previous_alpha_id = $videos[$previous_position]->alpha_id;
        }

        return  [
            'current_video' => $current_video,
            'next_video_alpha_id' => $next_alpha_id,
            'prev_video_alpha_id' => $previous_alpha_id
        ];
    }

}