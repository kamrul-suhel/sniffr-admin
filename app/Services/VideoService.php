<?php

namespace App\Services;

use App\Jobs\QueueVideo;
use App\Libraries\VideoHelper;
use App\Video;
use Illuminate\Http\UploadedFile;

class VideoService
{
    /**
     * @param Video $video
     * @param UploadedFile $uploadedVideoFile
     * @return bool
     */
    public function saveUploadedVideoFile(Video $video, UploadedFile $uploadedVideoFile)
    {
        $fileOriginalName = strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/', '', pathinfo($uploadedVideoFile->getClientOriginalName(), PATHINFO_FILENAME)));
        $fileName = time() . '-' . $fileOriginalName . '.' . $uploadedVideoFile->getClientOriginalExtension();
        $fileMimeType = $uploadedVideoFile->getMimeType();

        // Upload to S3
        \Storage::disk('s3')->put($fileName, file_get_contents($uploadedVideoFile), 'public');
        $filePath = \Storage::disk('s3')->url($fileName);

        // Send video to queue for watermarking
        QueueVideo::dispatch($video->id)->delay(now()->addSeconds(5));

        $video->file = $filePath;
        $video->mime = $fileMimeType;
        $video->save();

        return $filePath;
    }

    /**
     * @param Video $video
     * @param String $videoUrl
     * @return string
     */
    public function saveVideoLink(Video $video, String $videoUrl)
    {
        $linkDetails = VideoHelper::videoLinkChecker($videoUrl);

        $video->youtube_id = $linkDetails['youtube_id'];
        $video->image = $linkDetails['image'];
        $video->thumb = $linkDetails['thumb'];
        $video->embed_code = $linkDetails['embed_code'];
        $video->url = $linkDetails['url'];
        $video->vertical = $linkDetails['vertical'];
        $video->save();

        return $video->url;
    }
}