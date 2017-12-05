<?php

namespace App\Libraries;

use Dawson\Youtube\Youtube;
use Google_Service_YouTube_VideoStatus;

class MyYoutube extends Youtube
{
    public function updatePrivacy($video_id) {
        $listResponse = $this->youtube->videos->listVideos("status", array('id' => $video_id));

        // If $listResponse is empty, the specified video was not found.
        if (empty($listResponse)) {
             return sprintf('<h3>Can\'t find a video with video id: %s</h3>', $videoId);
        } else {
            // Since the request specified a video ID, the response only contains one video resource.
            $video = $listResponse[0];

            $videoStatus = $video['status'];
            $videoStatus->privacyStatus = 'public';

            // Set the status
            $video->setStatus($videoStatus);

            // Update the video resource by calling the videos.update() method.
            $updateResponse = $this->youtube->videos->update("status", $video);
        }
    }
}