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
    protected $file_type;
    protected $tries_loop_count;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($job_id, $video_id, $file_type, $tries_loop_count)
    {
        $this->job_id = $job_id;
        $this->video_id = $video_id;
        $this->file_type = $file_type;
        $this->tries_loop_count = $tries_loop_count;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        if($this->job_id){

            // initialize Elastic Transcoder and get the job status
            $elastcoder = new \Dumpk\Elastcoder\ElastcoderAWS();
            $job = $elastcoder->getJob($this->job_id);
            $job_complete = 1; //set to complete

            if(strtolower($job['Status']) == 'complete') { //if job is complete then check for file and add to db

                $video = Video::find($this->video_id);

                if($video->file){

                    // resolve original file extension for watermark and dirty watermark files
                    $ext = pathinfo($video->file, PATHINFO_EXTENSION);

                    if($this->file_type=='watermark') {

                        $check_file = substr($video->file, 0, strrpos($video->file, '.')).'-watermark.'.$ext;

                        if(Storage::disk('s3')->exists(basename($check_file))) {
                            Storage::disk('s3')->setVisibility(basename($check_file), 'public');
                            //$elastcoder->setPublicObject(basename($thumbnail_file), 'vlp-storage');
                            $video->file_watermark = $check_file;
                            $video->save();
                        } else {
                            $job_complete = 0;
                        }

                    } elseif($this->file_type=='thumbnail') {

                        $check_file = substr($video->file, 0, strrpos($video->file, '.')).'-00001.jpg';
                        //$thumbnail_file_alt = substr($video->file, 0, strrpos($video->file, '.')).'-00001.png'; //there is a bug in transcoder which picks PNG or JPG

                        if(Storage::disk('s3')->exists(basename($check_file))) {
                            Storage::disk('s3')->setVisibility(basename($check_file), 'public');
                            $video->image = $check_file;
                            $video->save();
                        } else {
                            $job_complete = 0;
                        }

                    } else {

                        $check_file = substr($video->file, 0, strrpos($video->file, '.')).'-watermark-dirty.'.$ext;

                        if(Storage::disk('s3')->exists(basename($check_file))) {
                            Storage::disk('s3')->setVisibility(basename($check_file), 'public');
                            $video->file_watermark_dirty = $check_file;
                            $video->save();
                        } else {
                            $job_complete = 0;
                        }

                    }

                }

            } else {

                $job_complete = 0;

            }

            // run this job/queue again if the job is still processing (as per above)
            if($this->tries_loop_count<5&&$job_complete==0) {
                $this->tries_loop_count++;
                QueueVideoCheck::dispatch($job['Id'], $video->id, $this->file_type, $this->tries_loop_count)
                    ->delay(now()->addSeconds(30));
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
