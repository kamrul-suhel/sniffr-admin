<?php

namespace App\Jobs;

use App\Video;

use FFMpeg;
use Dumpk\Elastcoder\ElastcoderAWS;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\Mail\DetailsReminder;
use App\Mail\DetailsThanks;
use App\Mail\SubmissionAccepted;
use App\Mail\SubmissionLicensed;
use App\Mail\SubmissionRejected;
use App\Mail\SubmissionThanks;
use App\Mail\SubmissionThanksNonEx;


class QueueVideoCheck implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $job_id;
    protected $video_id;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($job_id, $video_id)
    {
        $this->job_id = $job_id;
        $this->video_id = $video_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $video = Video::find($this->video_id);
        $fileName = basename($video->file);
        $ext = pathinfo($fileName, PATHINFO_EXTENSION);
        $watermark_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark.'.$ext;

        if($fileName){

            $elastcoder = new ElastcoderAWS();
            $job = $elastcoder->getJob($this->job_id);

            if(strtolower($job['Status']) == 'complete') {

                if(Storage::disk('s3')->exists($watermark_file)) {
                    Storage::disk('s3')->setVisibility($watermark_file, 'public');
                    $video->file_watermark = 'https://vlp-storage.s3.eu-west-1.amazonaws.com/'.$watermark_file;
                    $video->save();
                }

            } else {

                // maybe we can run queuse again if the video processing is still not completed (as per above)
                // QueueVideoCheck::dispatch($job['Id'], $video->id)
                //     ->delay(now()->addMinutes(1));

            }

        }
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(Exception $exception)
    {
        // Send user notification of failure, etc...
    }
}
