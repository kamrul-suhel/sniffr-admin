<?php

namespace App\Jobs;

use App\Video;
use App\Jobs\QueueVideo;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\Notifications\SubmissionImport;
use App\Notifications\SubmissionAlert;

class QueueVideoImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video_id;
    protected $file;
    protected $type;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($video_id, $file)
    {
        $this->video_id = $video_id;
        $this->file = $file;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        ini_set('memory_limit', '512M'); // Increase memory limit for larger video files
        //set_time_limit(0); // Unlimited timeout
        //ini_set('max_execution_time', 90);

        $video = Video::find($this->video_id); // Find video file id in db

        if(isset($video->id)) {

            $invalidDelete = 1; // Set to delete by default (unless it passes checks)

            if(strpos($this->file, 'jotform')) { // IF link is jotform

                // $headers = @get_headers($record['link']); // Kept this in case we need it later
                // if(strpos($headers[0],'200')===false && filter_var($record['link'], FILTER_VALIDATE_URL)){

                // Create a better filepath (without the crap)
                $filePath = trim(substr($this->file, 0, strrpos($this->file, '.')));
                $ext = explode('.', $this->file); $ext = preg_replace('/\s+/', '', end($ext));
                $filePath = $filePath.'.'.strtok($ext,  '/');

                if($filePath) {
                    // Create filename from filepath
                    $fileName = (strpos($filePath, '%2F') ? time().'-'.strtolower(substr(strrchr($filePath, '%2F'), 3)) : time().'-'.strtolower(basename($filePath)) ); // IF filepath has weird characters

                    // Downloads file from Jotform and then uploads video file to AWS
                    $t = Storage::disk('s3')->put($fileName, file_get_contents($this->file), 'public');
                    $filePath = Storage::disk('s3')->url($fileName);

                    QueueVideo::dispatch($video->id)
                        ->delay(now()->addSeconds(10));

                    // Save the record
                    $video->file = $filePath;
                    $video->save();

                    $invalidDelete = 0; // Passed all checks, set to not flag
                }

            } else if(strpos($this->file, 'drive.google.com')) { // IF link is google drive

                // IF detects as a google drive link (e.g. id=? or /vew/ e.g. https://drive.google.com/file/d/19fmVWMnDpjNAdPo3rKP6KOzYZfrai63H/view)
                if(strpos($this->file, 'id=')) {
                    $fileId = substr($this->file, strrpos($this->file, 'id=') + 3); // Get Google Drive FileId from link URL
                } else {
                    $fileId = substr($this->file, 0, strrpos($this->file, '/'));
                    $fileId = substr(strrchr($fileId, '/'), 1);
                }
                if($fileId) {

                    // Downloads file from google drive
                    $file = Storage::disk('google')->get($fileId);
                    $fileMimeType = Storage::disk('google')->mimeType($fileId);
                    $mimes = new \Mimey\MimeTypes; // Resolves mime types
                    $fileMimeType = $mimes->getExtension($fileMimeType);
                    if($fileMimeType=='qt') { // Change default quicktime mime to .mov
                       $fileMimeType = 'mov';
                    }
                    $fileMimeType = (empty($fileMimeType) ? '.mp4' : $fileMimeType );

                    $mimesOk = array('flv','ogg','mp4','qt','avi','wmv','m4v','mov','webm');
                    if (in_array($fileMimeType, $mimesOk)) { // Make sure that file is a video

                        $fileName = strtolower($fileId).'.'.$fileMimeType;

                        // Uploads video file to AWS
                        $t = Storage::disk('s3')->put($fileName, $file, 'public');
                        $filePath = Storage::disk('s3')->url($fileName);

                        QueueVideo::dispatch($video->id)
                            ->delay(now()->addSeconds(10));

                        // Save the record
                        $video->file = $filePath;
                        $video->save();

                        $invalidDelete = 0; // Passed all checks, set to not flag
                    }
                }

            } else if(strpos($this->file, 'dropbox')) { // IF link is dropbox

                // Create a better filepath (without the crap. left on separate lines to read easier)
                //$filePath = trim(substr($this->file, 0, strrpos($this->file, '.')));
                $ext = explode('.', $this->file);
                $ext = array_values(array_slice($ext, -1))[0];
                $ext = (strpos($ext, '/') ? 'mov' : $ext );

                $fileName = (strpos($ext, '?dl=0') ? time().'-'.time().'.'.str_replace('?dl=0', '', $ext) : time().'-'.time().'.'.$ext);

                if($fileName) {
                    $filePath = (strpos($this->file, '?dl=0') ? $this->file.'&dl=1&raw=1' : $this->file.'?dl=1&raw=1' );

                    // Downloads file from dropbox and uploads video file to AWS
                    $t = Storage::disk('s3')->put($fileName, file_get_contents($filePath), 'public');
                    $filePath = Storage::disk('s3')->url($fileName);

                    QueueVideo::dispatch($video->id)
                        ->delay(now()->addSeconds(10));

                    // Save the record
                    $video->file = $filePath;
                    $video->save();

                    $invalidDelete = 0; // Passed all checks, set to not flag

                }
            }

            if($invalidDelete==1) { // IF the file is invalid then flag it

                //$video->file = $this->file;
                $video->description = 'This file is either invalid or not a video';
                $video->state = 'problem';
                $video->save();

                $invalidType = (!empty($fileMimeType) ? ', MimeType: .'.$fileMimeType : '' );

                $video->notify(new SubmissionAlert('a job in the queue was either invalid or not a video (Id: '.$this->video_id.', File: '.$this->file.' '.$invalidType.')'));
            } else {

                //maybe sent out a notification on slack
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
         $video->notify(new SubmissionAlert('a job in the queue has failed (Id: '.$this->video_id.', File: '.$this->file.')'));

         //Log::info('Job failed: '.$exception);

     }
}
