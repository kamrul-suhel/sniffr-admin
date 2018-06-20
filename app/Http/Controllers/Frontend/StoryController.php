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

    /**
     * @var int
     */
    private $stories_per_page;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        if ($request->ajax() || $request->isJson()) {
            $stories = Story::All()
                ->orderBy('id', 'DESC')
                ->paginate($this->stories_per_page);

            $data = [
                'stories' => $stories,
                'pages' => (new Page)->where('active', '=', 1)->get(),
            ];

            return $this->successResponse($data);
        }

        return view('frontend.master');
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
