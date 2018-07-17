<?php

namespace App\Mail;

use App\Story;
use App\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class StoryContacted extends Mailable
{
    use Queueable, SerializesModels;

    public $story, $contact, $subject, $from_email, $from_name;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Story $story, $subject)
    {
        $this->story = $story;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if(isset($this->story->user)) {
            $from_email = $this->story->user->email;
            $from_name = ($this->story->user->full_name ? $this->story->user->full_name : $this->story->user->username);
        } else {
            $from_email = 'stories@unilad.co.uk';
            $from_name = 'UNILAD';
        }

        return $this
            ->from($from_email, $from_name)
            ->view('emails.stories.contacted')
            ->text('emails.stories.contacted_plain')
            ->subject($this->subject);
    }
}
