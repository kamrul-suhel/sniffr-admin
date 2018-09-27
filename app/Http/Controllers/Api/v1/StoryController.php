<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Story;

class StoryController extends BaseApiController
{

    protected $story, $isJson;
    public function __construct(Story $story, Request $request)
    {
        $this->story = $story;
        $this->isJson = $request->ajax() || $request->isJson();
    }

    /**
     * @param string $alpha_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function show(string $alpha_id)
    {

        if ($this->isJson) {
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

    }
}
