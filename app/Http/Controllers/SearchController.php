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
        $search_value = Input::get('value');

        if (empty($search_value)) {
            return Redirect::to('/');
        }

        $videos = Video::where(function ($query) use ($search_value) {
            $query->where('state', '=', 'licensed')->where('title', 'LIKE', '%' . $search_value . '%');
        })->orWhereHas('tags', function ($q) use ($search_value) {
            $q->where('state', '=', 'licensed')->where('name', 'LIKE', '%' . $search_value . '%');
        })->orderBy('licensed_at', 'DESC')->get();

		$data = [
			'videos' => $videos,
		];

        $isJson = $request->ajax() || $request->isJson();

        if ($isJson) {
            return $this->successResponse($data);
        }

        return view('frontend.master', $data);
    }
}
