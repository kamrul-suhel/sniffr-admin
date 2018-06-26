<?php

namespace App\Http\Controllers;

use App\Collection;
use App\CollectionStory;
use App\CollectionVideo;
use App\Libraries\VideoHelper;
use App\Video;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function addToCollection(Request $request)
    {
        //
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * - Check if video already exists for client (not just user)
     * - Check if no one has bought video within the time of clicking 'Buy'
     * - Create CollectionVideo/CollectionStory instance. (assoc to this collection)
     **/
    public function store(Request $request)
    {
        $data = $request->except("_token");
        $user = auth()->user();

        $collection = new Collection();
        $collection->name = "order_".VideoHelper::quickRandom(10);
        $collection->user_id = $user->id;
        $collection->client_id = $user->client->id;
        $collection->status = "open";
        $collection->save();

        if($request->has('video_id')) {
            $video = Video::find($request->get('video_id'));
            $collectionVideo = new CollectionVideo();
            $collectionVideo->collection_id = $collection->id;
            $collectionVideo->video_id = $video->id;
            $collectionVideo->type = null;
            $collectionVideo->platform = null;
            $collectionVideo->length = null;
            $collectionVideo->class = $video->class;
            $collectionVideo->final_price = 0;
            $collectionVideo->company_location = $user->client->location;
            $collectionVideo->company_tier = $user->client->tier;
            $collectionVideo->status = 'received';
            $collectionVideo->save();
        }

        if($request->has('story_id')) {
            $collectionStory = new CollectionStory();
            $collectionStory->collection_id = $collection->id;
            $collectionStory->story_id = $request->get('story_id');
            $collectionStory->status = 'received';
            $collectionStory->final_price = 0;
            $collectionStory->save();
        }

        return response([
            'collection_id' => $collection->id,
            'collection_video_id' => $collectionVideo->id,
            'collection_story_id' => $collectionStory ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * TODO - Get base price
     * TODO - Add company_tier to base price
     * TODO - Add company_location to base price
     * @param Request $request
     * @param $collectionId
     * @param $collectionVideoId
     * @param $videoId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function getInitialVideoPrice(Request $request, $collectionId, $collectionVideoId)
    {
        $user = auth()->user();
        $client = $user->client;
        $collectionVideo = CollectionVideo::find($collectionVideoId);

        $price = config('pricing.base');
        $price += config('pricing.locations.'.$client->location.'.modifier');
        $price += config('pricing.tier.'.$client->tier.'.modifier');

        $collectionVideo->final_price = $price;
        $collectionVideo->save();

        return response(['price' => $price], 200);
    }

    /**
     * @param Request $request
     * @param $videoId
     * @param $param
     */
    public function updatePrice(Request $request, $collectionId, $collectionVideoId)
    {
        $collectionVideo = CollectionVideo::find($collectionVideoId);
        $collection = Collection::find($collectionId);

        $currentPrice = $collectionVideo->final_price;

        //Get types for dropdown
        if($request->has('licence_type')) {
            $currentPrice += config('pricing.type.'.$request->get('licence_type'));
        }

        //Get platforms for dropdown
        if($request->has('licence_platform')) {
            $currentPrice += config('pricing.platform.'.$request->get('licence_platform'));
        }

        //Get lengths for dropdown
        if($request->has('licence_length')) {
            $currentPrice += config('pricing.length.'.$request->get('licence_length'));
        }

        $collectionVideo->final_price = $currentPrice;
        $collectionVideo->save();

        return response(['price' => $currentPrice], 200);

    }

    public function acceptFinalPrice(Request $request, $videoId)
    {

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
}
