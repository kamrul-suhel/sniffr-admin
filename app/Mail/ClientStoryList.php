<?php

namespace App\Mail;

use App\ClientMailer;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ClientStoryList extends Mailable
{
    use Queueable, SerializesModels;

    public $mailer, $user;

    /**
     * ClientStoryList constructor.
     * @param ClientMailer $mailer
     * @param User $user
     */
    public function __construct(ClientMailer $mailer, User $user)
    {
        $this->mailer = $mailer;
		$this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->view('emails.clientmailers.mailer')
            ->text('emails.clientmailers.mailer_plain')
            ->subject('SNIFFR Video Suggestions');
    }
}
