<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\FrontendResponse;
use App\Page;
use App\Story;

class StoryController extends Controller
{
	use FrontendResponse;

	const PAGINATE_PERPAGE = 12;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view('frontend.master');
    }

    public function requestQuote(Request $request){
        $formData = $request->input('form');
    }

    /**
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request, string $id)
    {
        $isJson = $request->ajax() || $request->isJson();
        if ($isJson) {
            $story = Story::where('alpha_id', $id)->with('assets')->first();
            $data = [
                'story' => $story,
            ];

            return $this->successResponse($data);
        }
        return view('frontend.master');
    }
}
