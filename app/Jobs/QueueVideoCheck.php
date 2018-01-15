<?php

namespace App\Jobs;

use App\Video;

use FFMpeg;

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

use Dumpk\Elastcoder\ElastcoderAWS;

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
        // resolve original file, extension and watermark file
        $ext = pathinfo($video->file, PATHINFO_EXTENSION);
        $watermark_file = substr($video->file, 0, strrpos($video->file, '.')).'-watermark.'.$ext;

        if($video->file){

            // initialize Elastic Transcoder and get the job status
            $elastcoder = new \Dumpk\Elastcoder\ElastcoderAWS();
            $job = $elastcoder->getJob($this->job_id);

            if(strtolower($job['Status']) == 'complete') { //if job is complete then check for file and add to db

                if(Storage::disk('s3')->exists(basename($watermark_file))) {
                    Storage::disk('s3')->setVisibility(basename($watermark_file), 'public');
                    $video->file_watermark = $watermark_file;
                    $video->save();
                }

            } else {

                // run this job/queue again if the video is still processing (as per above)
                // QueueVideoCheck::dispatch($job['Id'], $video->id)
                //     ->delay(now()->addSeconds(30));
                //need to add a tries field in db so this doesn't loop forever? (maybe pass count through job function)
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
