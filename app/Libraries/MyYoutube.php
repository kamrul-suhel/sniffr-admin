<?php

namespace App\Libraries;

use Dawson\Youtube\Youtube;
use Google_Service_YouTube_VideoStatus;

class MyYoutube extends Youtube
{
    public function setStatus($video_id, $status = 'unlisted') {
        $listResponse = $this->youtube->videos->listVideos("status", array('id' => $video_id));

        // If $listResponse is empty, the specified video was not found.
        if (empty($listResponse)) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $videoId);
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
    }

    public function setSnippet($video_id, $title = '', $description = '', $tags = array()) {
        $listResponse = $this->youtube->videos->listVideos("snippet", array('id' => $video_id));

        // If $listResponse is empty, the specified video was not found.
        if (empty($listResponse)) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $videoId);
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
        if (empty($listResponse)) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $videoId);
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