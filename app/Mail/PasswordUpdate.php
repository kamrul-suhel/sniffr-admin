<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * PasswordUpdate constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.password_updated')
            ->subject('Sniffr - Your password has been updated')
            ->with('user', $this->user);
    }
}
