<?php

namespace App\Jobs;

use App\Video;
use App\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SubmissionAlert;

class QueueVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video_id;
    protected $youtube_ingest;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($video_id, $youtube_ingest = false)
    {
        $this->video_id = $video_id;
        $this->youtube_ingest = $youtube_ingest;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() // THIS JOB CREATES WATERMARKS (NORMAL/DIRTY) + A THUMBNAIL AND THEN SCHEDULES ANOTHER JOB TO CHECK IF EXECUTED CORRECTLY
    {
        $video = Video::find($this->video_id);
        $fileName = (isset($video->file) ? basename($video->file) : '');

        if($fileName){
            // resolve original file, extension and watermark file
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $watermark_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark.'.$ext;
            $watermark__dirty_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark-dirty.'.$ext;

            // set config array for watermark
            $config = NULL;
            $config_dirty = NULL;
            $config = [
                   'PresetId' => '1516201655942-vaq9mu',
                   'width'  => 480,
                   'height' => 270,
                   'aspect' => '16:9',
               	'ext'	 => 'mp4',
               	'PipelineId' => '1515757750300-4fybrt',
                   'Watermarks' => [[
                           'PresetWatermarkId' => 'TopRight',
                           'InputKey'          => 'logo-sniffr-white.png'
                   ]],
               ];
            // set config array for dirty watermark
            $config_dirty = [
                  'PresetId' => '1516280708485-t5gxbr',
                  'width'  => 480,
                  'height' => 270,
                  'aspect' => '16:9',
              	'ext'	 => 'mp4',
              	'PipelineId' => '1515757750300-4fybrt',
                  'Watermarks' => [[
                          'PresetWatermarkId' => 'Centered',
                          'InputKey'          => 'logo-sniffr-white.png'
                  ]],
              ];

            // set config array for thumbnail creation
            $config_thumbs = substr($fileName, 0, strrpos($fileName, '.')).'-{count}';

            // Creates a job to create watermark and thumbnail
            $elastcoder = new \Dumpk\Elastcoder\ElastcoderAWS();
            $job = $elastcoder->transcodeVideo($fileName, $watermark_file, $config, $config_thumbs);

            if($job['Id']) {
                // Queues a laravel job to check if watermark was created uccessfully
                QueueVideoCheck::dispatch($job['Id'], $video->id, 'watermark', 1)
                    ->delay(now()->addSeconds(30));
                // Queues a laravel job to check if thumbnail was created uccessfully
                QueueVideoCheck::dispatch($job['Id'], $video->id, 'thumbnail', 1)
                    ->delay(now()->addSeconds(35));
            }

            // Creates a job to create dirty watermark
            $job2 = $elastcoder->transcodeVideo($fileName, $watermark__dirty_file, $config_dirty);

            if($job2['Id']) {
                // Queues a laravel job to check if watermark was created uccessfully
                QueueVideoCheck::dispatch($job2['Id'], $video->id, 'watermark_dirty', 1, $this->youtube_ingest)
                    ->delay(now()->addSeconds(40));
            }

            if(Storage::disk('s3')->exists($watermark_file)) {
                Storage::disk('s3')->setVisibility($watermark_file, 'public');
                $ext = pathinfo($video->file, PATHINFO_EXTENSION);
                $watermark_file = substr($video->file, 0, strrpos($video->file, '.')).'-watermark.'.$ext;
                $video->file_watermark = $watermark_file;
                $video->save();
            }

        } else {
			$user = new User();
			$user->slackChannel('alerts')->notify(new SubmissionAlert('a job in the queue has failed to create a watermark because there is no video file (Id: '.$this->video_id.')'));
        }
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed($exception)
    {
        // Send user notification of failure, etc...
		$user = new User();
		$user->slackChannel('alerts')->notify(new SubmissionAlert('a job in the queue has failed to create a watermark (Id: '.$this->video_id.')'));
    }
}
