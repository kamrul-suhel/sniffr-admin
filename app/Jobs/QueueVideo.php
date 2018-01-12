<?php

namespace App\Jobs;

use App\Video;
// use App\Contact;

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


class QueueVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video_id;

    public $tries = 2;
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
    public function handle()
    {
        $video = Video::find($this->video_id);
        $fileName = basename($video->file);

        $route = 'aws';

        if($fileName){

            // resolve original file, extension and watermark file
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $watermark_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark.'.$ext;

            if($route='aws') {

                // AWS Elastic Transcoder (new cloud route)

                $config = [
                       'PresetId' => '1515758587625-jyon3x',
                       'width'  => 1920,
                       'height' => 1080,
                       'aspect' => '16:9',
                   	'ext'	 => 'mp4',
                   	'PipelineId' => '1515757750300-4fybrt',
                       'Watermarks' => [[
                               'PresetWatermarkId' => 'TopRight',
                               'InputKey'          => 'logo-unilad-white.png'
                       ]],
                   ];

                $elastcoder = new ElastcoderAWS();
                $job = $elastcoder->transcodeVideo($fileName, $watermark_file, $config);

            } else {

                // FFMPEG (old local server route)

                // Save logo to right size
                $logo_width = floor($video_width/10);
                $logo_padding_width = floor($video_width/100);
                $logo_file = public_path('content/uploads/settings/logo-unilad-white-'.$logo_width .'.png');

                Image::make(public_path('content/uploads/settings/logo-unilad-white.png'))->opacity(80)->resize($logo_width, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($logo_file);

                $watermark_filter = new \FFMpeg\Filters\Video\WatermarkFilter($logo_file, array(
                   'position' => 'relative',
                   'right' => $logo_padding_width,
                   'top' => $logo_padding_width,
                ));

                if($video_width>700) {
                    $logo_watermark = 'logo-unilad-watermark.png';
                } else {
                    $logo_watermark = 'logo-unilad-watermark-small.png';
                }

                $watermark_filter = new \FFMpeg\Filters\Video\WatermarkFilter(public_path('content/uploads/settings/'.$logo_watermark), array(
                   'position' => 'relative',
                   'bottom' => 35,
                   'right' => 30,
                ));

                $watermark->addFilter($watermark_filter)
                    ->export()
                    ->inFormat(new \FFMpeg\Format\Video\X264('libmp3lame'))
                    ->save($watermark_file);

                // $url = Storage::temporaryUrl( //used for making public for set period
                //     $watermark_file, now()->addMinutes(25)
                // );

            }

            if(Storage::disk('s3')->exists($watermark_file)) {
                $temp = Storage::disk('s3')->setVisibility($watermark_file, 'public');
                $watermark_file = 'https://vlp-storage.s3.eu-west-1.amazonaws.com/'.$watermark_file;
                $video->file_watermark = $watermark_file;
                $video->save();
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
