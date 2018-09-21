<?php

namespace App\Http\Controllers\Api\v1;

use App\ClientMailerStory;
use App\ClientMailerUser;
use App\ClientMailerVideo;
use App\Collection;
use App\CollectionStory;
use App\CollectionVideo;
use App\Story;
use App\User;
use App\Video;

class AssetBaseStoryVideoController extends BaseApiController
{
    protected $collection, $collectionStory, $collectionVideo, $story, $video, $clientMailerStory, $clientMailerUser, $clientMailerVideo, $user;

    public function __construct()
    {
        $this->collection = new Collection();
        $this->collectionVideo = new CollectionVideo();
        $this->collectionStory = new CollectionStory();
        $this->story = new Story();
        $this->video = new Video();
        $this->clientMailerStory = new ClientMailerStory();
        $this->clientMailerVideo = new ClientMailerVideo();
        $this->clientMailerUser = new ClientMailerUser();
        $this->user = request()->user('api') ? request()->user('api') : new User();
    }
}
