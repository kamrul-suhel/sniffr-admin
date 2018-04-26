<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Traits\FrontendResponder;
use Illuminate\Http\Request;
use Redirect;
use App\Video;
use Illuminate\Support\Facades\Input;

class SearchController extends Controller
{
    use FrontendResponder;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        $isJson = $request->ajax() || $request->isJson();
        if ($isJson) {
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
}
