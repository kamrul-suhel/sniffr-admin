<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Redirect;
use App\Video;
use Illuminate\Support\Facades\Input;

class SearchController extends Controller
{
    use FrontendResponse;

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



    public function featureVideosInDialog(){

    }

    /**
     * @param Request $request
     * @param $alpha_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function videosInDialog(Request $request, $alpha_id){
        $current_video = Video::where('alpha_id', '=', $alpha_id)
            ->with('tags')
            ->first();
        $current_video->iframe = $this->getVideoHtml($current_video, true);

        $next_alpha_id = '';
        $next = Video::select('alpha_id')
            ->where('id', '<', $current_video->id)
            ->where('state', '=', 'licensed')
            ->orderBy('id', 'desc')
            ->first();

        // Check if exists or no
        if($next){
            $next_alpha_id = $next->alpha_id;
        }

        $previous_alpha_id = '';
        $previous = Video::select('alpha_id')
            ->where('id', '>', $current_video->id)
            ->where('state', '=', 'licensed')
            ->orderBy('id', 'asc')
            ->first();

        if($previous){
            $previous_alpha_id = $previous->alpha_id;
        }

        $data = [
            'current_video' => $current_video,
            'next_video_alpha_id'   => $next_alpha_id,
            'prev_video_alpha_id'   => $previous_alpha_id
        ];

        if($request->isJson() || $request->ajax()){
            return $this->successResponse($data);
        }
    }

    public function tagsSearchVideosInDialog(Request $request)
    {
        $videos = Video::where('title', 'LIKE','%'. $request->value. '%')
            ->where('state', '=', 'licensed')
            ->get();
        dd($videos);
    }

    public function searchVideosInDialog(Request $request){

    }

}