<?php

namespace App\Mail;

use App\Video;
use App\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DetailsThanks extends Mailable
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
        return $this->view('emails.details.thanks')->text('emails.details.thanks_plain')->subject('UNILAD - Thanks for sending more details');
    }
}
