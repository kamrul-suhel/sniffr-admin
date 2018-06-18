<?php

namespace App\Jobs;

use App\Video;

use Redirect;
use Validator;
use DateTime;
use DateInterval;
use Youtube;
use Google_Client;
use Google_Service_YouTube;

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

use App\Notifications\SubmissionAlert;

class QueueVideoYoutubeUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video_id;

    public $tries = 1;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($video_id)
    {
        $this->video_id = $video_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() // THIS JOB DOWNLOADS THE DIRTY WATERMARKED VIDEO AND UPLOAD TO YOUTUBE
    {
        ini_set('memory_limit', '512M'); // Increase memory limit for larger video files
        set_time_limit(3200); // Longer timeout
        //ini_set('max_execution_time', 90);

        if($this->video_id){

            $video = Video::find($this->video_id);

            if($video->file_watermark_dirty){
                $file_watermark = file_get_contents($video->file_watermark_dirty);
                $fileName_watermark = basename($video->file_watermark_dirty);
            }elseif($video->file_watermark){
                $file_watermark = file_get_contents($video->file_watermark);
                $fileName_watermark = basename($video->file_watermark);
            }elseif($video->file){
                $file_watermark = file_get_contents($video->file);
                $fileName_watermark = basename($video->file);
            }else{
                $file_watermark = '';
                $fileName_watermark = '';
            }

            if($fileName_watermark) {
                // Upload it to youtube
                if(!$video->youtube_id){
                    file_put_contents('/tmp/'.$fileName_watermark, $file_watermark);

                    $file_watermark = new UploadedFile (
                        '/tmp/'.$fileName_watermark,
                        $fileName_watermark,
                        $video->mime,
                        filesize('/tmp/'.$fileName_watermark),
                        null,
                        false
                    );

					$title = str_replace(['<','>'], '', $video->title); // Youtube title can't have square brackets
					$response = Youtube::upload($file_watermark, ['title' => $title], 'unlisted');
                    $youtubeId  = $response->getVideoId();

					$video->youtube_id = $youtubeId;
					$video->save();
                }

                // Anaylsis (copies file over to another folder for analysis and suggested tag creation)
                $disk = Storage::disk('s3_sourcebucket');
                if($disk->exists(basename($video->file))) {
                    $disk->move(''.basename($video->file), 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.basename($video->file));
                }
            } else {
                $video->notify(new SubmissionAlert('a job in the queue has failed to upload to YouTube as no file exists (Id: '.$this->video_id.')'));
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
         $video = new Video();
         $video->notify(new SubmissionAlert('a job in the queue has failed to upload to YouTube (Id: '.$this->video_id.')'));
     }
}
