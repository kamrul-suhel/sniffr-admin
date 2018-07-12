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

    public $mailer, $user, $from_name, $from_email, $subject;

    /**
     * ClientStoryList constructor.
     * @param ClientMailer $mailer
     * @param User $user
     */
    public function __construct(ClientMailer $mailer, User $user, $from_name, $from_email, $subject)
    {
        $this->mailer = $mailer;
		$this->user = $user;
        $this->from_name = $from_name;
        $this->from_email = $from_email;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from($this->from_email, $this->from_name)
            ->view('emails.clientmailers.mailer')
            ->text('emails.clientmailers.mailer_plain')
            ->subject($this->subject);
    }
}
