<?php

namespace App\Http\Controllers\Api\v1;

use App\Client;
use App\ClientMailerStory;
use App\ClientMailerUser;
use App\ClientMailerVideo;
use App\Collection;
use App\CollectionQuote;
use App\CollectionStory;
use App\CollectionVideo;
use App\Story;
use App\User;
use App\Video;

class AssetBaseStoryVideoController extends BaseApiController
{
    protected $collection,
        $collectionStory,
        $collectionVideo,
        $story,
        $video,
        $collectionQuote,
        $clientMailerStory,
        $clientMailerUser,
        $clientMailerVideo,
        $user,
        $client;

    public function __construct()
    {
        $this->collection = new Collection();
        $this->collectionVideo = new CollectionVideo();
        $this->collectionStory = new CollectionStory();
        $this->collectionQuote = new CollectionQuote();
        $this->story = new Story();
        $this->video = new Video();
        $this->client = new Client();
        $this->clientMailerStory = new ClientMailerStory();
        $this->clientMailerVideo = new ClientMailerVideo();
        $this->clientMailerUser = new ClientMailerUser();
        $this->user = request()->user('api') ? request()->user('api') : new User();
    }
}
