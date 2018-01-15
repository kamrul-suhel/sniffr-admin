<?php

namespace App\Mail;

use App\Video;
use App\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SubmissionThanksNonEx extends Mailable
{
    use Queueable, SerializesModels;

    public $video, $contact;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.submission.thanks_nonex')->text('emails.submission.thanks_nonex_plain')->subject('UNILAD Video Non Exclusive Submission: '.$this->video->alpha_id);
    }
}
