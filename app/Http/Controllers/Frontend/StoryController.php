<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\FrontendResponse;
use App\Story;

class StoryController extends Controller
{
	use FrontendResponse;

	const PAGINATE_PERPAGE = 12;

	protected $story;
	public function __construct(Story $story)
    {
        $this->story = $story;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return $this->getFrontendServerResponse($request);
    }

    public function requestQuote(Request $request){
        $formData = $request->input('form');
    }

    /**
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request, string $alpha_id)
    {

        $isJson = $request->ajax() || $request->isJson();
        if ($isJson) {
            $story = $this->story
                ->select($this->getAssetStoryFieldsForFrontend())
                ->where('alpha_id', $alpha_id)
                ->with('assets');

            if (auth()->user()) {
                $client_id = auth()->user()->client_id;
                $story = $story->with(['storyCollections' => function ($query) use ($client_id) {
                    $query->select(['id', 'collection_id', 'story_id'])
                        ->where('status', 'purchased');
                    $query->whereHas('collection', function ($query) use ($client_id) {
                        $query->where('client_id', $client_id);
                    });
                }]);
            }
            $story = $story
                ->first();

            $data = [
                'story' => $story,
            ];

            return $this->successResponse($data);
        }

        return $this->getFrontendServerResponse($request);
    }
}
