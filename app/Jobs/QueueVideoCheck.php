<?php

namespace App\Jobs;

use App\Video;
use App\User;

use FFMpeg;
use Youtube;
use MyYoutube;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
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

use App\Notifications\SubmissionAlert;

class QueueVideoCheck implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $job_id;
    protected $video_id;
    protected $file_type;
    protected $tries_loop_count;
    protected $youtube_ingest;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($job_id, $video_id, $file_type, $tries_loop_count, $youtube_ingest = false)
    {
        $this->job_id = $job_id;
        $this->video_id = $video_id;
        $this->file_type = $file_type;
        $this->tries_loop_count = $tries_loop_count;
        $this->youtube_ingest = $youtube_ingest;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() // THIS JOB CHECKS THE AWS TRANSCODER JOB QUEUE AND CHECKS IF THE FILES HAVE BEEN CREATED (IN A LOOP EVERY 30 SECS FOR 3 TRIES)
    {

        if($this->job_id){

            // initialize Elastic Transcoder and get the job status
            $elastcoder = new \Dumpk\Elastcoder\ElastcoderAWS();
            $job = $elastcoder->getJob($this->job_id);
            $job_complete = 1; //set to complete

            if(strtolower($job['Status']) == 'complete') { //if job is complete then check for file and add to db

                $video = Video::find($this->video_id);

                if(isset($video->file)){

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

                            if($this->youtube_ingest){
                                // IAN:  Need to de-dupe this
                                $file_watermark = file_get_contents($video->file_watermark_dirty);
                                $fileName_watermark = basename($video->file_watermark_dirty);

                                // Anaylsis (copies file over to another folder for analysis and suggested tag creation)
                                $fileName = basename($video->file);
                                $disk = Storage::disk('s3_sourcebucket');
                                if($disk->has($fileName)==1){
                                    if($disk->exists(basename($fileName))) {
                                        $disk->move(''.$fileName, 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.$fileName);
                                    }
                                }

                                // Youtube (retrieves video to temporary local and then uploads to youtube)
                                if($fileName_watermark) {
                                    file_put_contents('/tmp/'.$fileName_watermark, $file_watermark);

                                    $file_watermark = new UploadedFile (
                                        '/tmp/'.$fileName_watermark,
                                        $fileName_watermark,
                                        $video->mime,
                                        filesize('/tmp/'.$fileName_watermark),
                                        null,
                                        false
                                    );

                                    // Upload it to youtube
                                    $response = MyYoutube::upload($file_watermark, ['title' => $video->title], 'unlisted');
                                    $youtubeId  = $response->getVideoId();

                                    $video->youtube_id = $youtubeId;
                                }
                            }

                            $video->save();
                        } else {
                            $job_complete = 0;
                        }

                    }

                }

            } elseif(strtolower($job['Status']) == 'error' && $this->file_type=='watermark') {

                $job_complete = 0;
                if($this->tries_loop_count==3) { // IF fails after 3 tries then alert
                    $user = new User();
                    $user->notify(new SubmissionAlert('a job in the queue has failed to create a watermark file (Id: '.$this->video_id.')'));
                }
            } else {

                $job_complete = 0;

            }

            // run this job/queue again if the job is still processing (as per above)
            if($this->tries_loop_count<5&&$job_complete==0) {
                $this->tries_loop_count++;
                QueueVideoCheck::dispatch($job['Id'], $this->video_id, $this->file_type, $this->tries_loop_count, $this->youtube_ingest)
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
     public function failed($exception)
     {
         // Send user notification of failure, etc...
         if($this->tries_loop_count==3) { // IF fails after 3 tries then alert
             $user = new User();
             $user->notify(new SubmissionAlert('a job in the queue has failed to find the watermarked file (Id: '.$this->video_id.')'));
         }
     }
}
