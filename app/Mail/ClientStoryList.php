<?php

namespace App\Mail;

use App\ClientMailer;
use App\Contact;
use App\Story;
use App\User;
use App\Video;
use App\Client;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Qsueue\ShouldQueue;

class ClientStoryList extends Mailable
{
    use Queueable, SerializesModels;

    public $mailer, $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ClientMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.clientmailers.mailer')->text('emails.clientmailers.mailer_plain')->subject('Sniffr Video Suggestions');
    }
}
