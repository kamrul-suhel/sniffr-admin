<?php

namespace App\Jobs;

// use App\Video;
// use App\Contact;

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

use App\Mail\SubmissionThanks;


class QueueSubmissionThanks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // protected $video_title;
    // protected $video_alpha_id;
    // protected $contact_email;
    // protected $contact_first_name;
    public $video, $contact;
    public $tries = 5;
    public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct(Video $video)
    {
        // $this->contact_email = $contact_email;
        // $this->contact_first_name = $contact_first_name;
        // $this->video_title = $video_title;
        // $this->video_alpha_id = $video_alpha_id;
        $this->video = $video;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to('mike.filmworks@gmail.com')->send(new SubmissionThanks($this->video));
        //dd($this);
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
