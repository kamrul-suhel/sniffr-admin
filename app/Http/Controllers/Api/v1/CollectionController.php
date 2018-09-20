<?php

namespace App\Http\Controllers\Api\v1;

use App\Client;
use App\Collection;
use App\CollectionQuote;
use App\CollectionStory;
use App\CollectionVideo;
use App\Libraries\VideoHelper;
use App\Notifications\RequestQuote;
use App\Story;
use App\Traits\FrontendResponse;
use App\Traits\Slug;
use App\User;
use App\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CollectionController extends Controller
{

    use Slug, VideoHelper, FrontendResponse;

    protected $collection, $collectionVideo, $collectionStory, $collectionQuote, $video, $story, $client, $user;

    /**
     * CollectionController constructor.
     * @param Collection $collection
     * @param CollectionVideo $collectionVideo
     * @param CollectionStory $collectionStory
     * @param CollectionQuote $collectionQuote
     * @param Video $video
     * @param Story $story
     * @param Client $client
     * @param User $user
     */
    public function __construct(
        Collection $collection, CollectionVideo $collectionVideo, CollectionStory $collectionStory,
        CollectionQuote $collectionQuote, Video $video, Story $story, Client $client, User $user)
    {
        $this->collection = $collection;
        $this->collectionVideo = $collectionVideo;
        $this->collectionStory = $collectionStory;
        $this->collectionQuote = $collectionQuote;
        $this->video = $video;
        $this->story = $story;
        $this->client = $client;
        $this->user = $user;
    }

    /**
     * Create new collection and collection_asset type for new quote building.
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $user = $request->user('api');

        $data = [
            'name' => "order_" . strtolower(str_random(10)),
            'user_id' => $user->id ?? null,
            'client_id' => $user->client_id ?? null,
            'status' => 'open',
        ];

        $collection = $this->collection->create($data);

        if ($request->get('type') == 'video') {
            $video = $this->video->where('alpha_id', $request->get('asset_alpha_id'))->first();
            $collectionVideo = $collection->addVideoToCollection($video, $user);
        } else {
            $story = $this->story->where('alpha_id', $request->get('asset_alpha_id'))->first();
            $collectionStory = $collection->addStoryToCollection($story, $user);
        }

        return response([
            'collection' => $collection,
            'collection_id' => $collection->id,
            'collection_video_id' => $collectionVideo->id ?? null,
            'collection_story_id' => $collectionStory->id ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * Send a newly registered user an email telling them we are looking into their request.
     * @param Request $request
     * @param $type
     * @param $collection_asset_id
     * @return mixed
     */
    public function requestQuote(Request $request, $type, $collection_asset_id)
    {
        $data = $request->except('_token');
        $user = $request->user('api');
        $client = $user->client;

        if ($type == 'video') {
            $collectionVideo = $this->collectionVideo->find($collection_asset_id);
            $collectionVideo->update([
                'type' => $data['license_type'] ?? $collectionVideo->type,
                'platform' => $data['license_platform'] ?? $collectionVideo->platform,
                'length' => $data['license_length'] ?? $collectionVideo->length,
                'company_location' => isset($client->region) ? $client->region : null,
                'company_tier' => isset($client->tier) ? $client->tier : null,
                'notes' => $data['notes'] ?? '',
                'status' => 'requested',
                'final_price' => null,
            ]);

            $collection = $collectionVideo->collection;
            $asset = $collectionVideo->video;
        } else {
            $collectionStory = $this->collectionStory->find($collection_asset_id);
            $collectionStory->update([
                'type' => $data['license_type'] ?? $collectionStory->type,
                'platform' => $data['license_platform'] ?? $collectionStory->platform,
                'length' => $data['license_length'] ?? $collectionStory->length,
                'company_location' => isset($client->region) ? $client->region : null,
                'company_tier' => isset($client->tier) ? $client->tier : null,
                'notes' => $data['notes'] ?? '',
                'status' => 'requested',
                'final_price' => null,
            ]);

            $collection = $collectionStory->collection;
            $asset = $collectionStory->story;
        }
        $client = $collection->client;

        $params = [
            'username' => is_null($user->full_name) ? $user->username : $user->full_name,
            'user' => $user->email,
            'collection' => $collection
        ];

        $collectionQuote = new CollectionQuote;
        $collectionQuote->emailPendingQuote($params);

        if (env('APP_ENV') === 'prod') {
            $user->slackChannel('quotes')->notify(new RequestQuote($user, $client, $asset));
        }

        return response([
            'message' => 'Email has been sent to new user'
        ], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function cancelCollection(Request $request)
    {
        $isJson = $request->ajax();

        $collection = $this->collection->find($request->get('collection_id'));

        if(isset($collection->user_id)) {
            $user = $request->user('api');
            if ($user->id !== $collection->user_id) {
                if ($isJson) {
                    return response([
                        'message' => 'permission denied',
                    ], 403);
                }
            }
        }

        $collection->delete();

        if ($isJson) {
            return response([
                'message' => 'collection was deleted',
            ], 200);
        }
    }
}
