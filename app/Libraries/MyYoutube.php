<?php

namespace App\Libraries;

use Dawson\Youtube\Youtube;
use Google;

class MyYoutube extends Youtube
{
    public function setStatus($video_id, $status = 'unlisted') {
        $listResponse = $this->youtube->videos->listVideos("status", array('id' => $video_id));

        // $client = $this->client;
        // ! $client = Google::getClient();
        // ! $client = new \Google_Client();
        // ! $client->setApplicationName('Unilad VLP');
        // ! $client->setDeveloperKey('AIzaSyATCrhO563JeXmXKoxgxPMkPeoxej5vYIg');
        // $asset = new \Google_Service_YouTubePartner_Asset();
        // $metadata = new \Google_Service_YouTubePartner_Metadata();
        // $youtubePartner = new \Google_Service_YouTubePartner($client);

        // $metadata->setTitle("Asset Title");
        // $metadata->setDescription("AssetDescription");
        // $asset->setMetadata($metadata);
        // $asset->setType("web");

        // $contentOwnersListResponse = $youtubePartner->contentOwners->listContentOwners(array('fetchMine' => true));

        // If $listResponse is empty, the specified video was not found.
        if (!isset($listResponse[0])) {
             return false; // No video exists
        } else {
            // Since the request specified a video ID, the response only contains one video resource.
            $video = $listResponse[0];

            $videoStatus = $video['status'];
            $videoStatus->privacyStatus = $status;

            // Set the status
            $video->setStatus($videoStatus);

            // Update the video resource by calling the videos.update() method.
            $updateResponse = $this->youtube->videos->update("status", $video);
        }


        return $updateResponse;
    }

    public function setSnippet($video_id, $title = '', $description = '', $tags = array()) {
        $listResponse = $this->youtube->videos->listVideos("snippet", array('id' => $video_id));

        // If $listResponse is empty, the specified video was not found.
        if (!isset($listResponse[0])) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $video_id);
        } else {
            // Since the request specified a video ID, the response only contains one video resource.
            $video = $listResponse[0];

            $videoSnippet = $video['snippet'];
            $videoSnippet->title = $title;
            $videoSnippet->description = $description;
            $videoSnippet->tags = $tags;

            // Set the status
            $video->setSnippet($videoSnippet);

            // Update the video resource by calling the videos.update() method.
            $updateResponse = $this->youtube->videos->update("snippet", $video);
        }
    }

    public function getDuration($video_id) {
        $listResponse = $this->youtube->videos->listVideos("contentDetails", array('id' => $video_id));

        // If $listResponse is empty, the specified video was not found.
        if (!isset($listResponse[0])) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $video_id);
        } else {
            $seconds = 0;
            if(isset($listResponse[0]['contentDetails']) && isset($listResponse[0]['contentDetails']['duration'])){
                // Since the request specified a video ID, the response only contains one video resource.
                $duration = $listResponse[0]['contentDetails']['duration'];
                $seconds = TimeHelper::ISO8601ToSeconds($duration);
            }

            return $seconds;
        }
    }
}
