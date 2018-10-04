<?php

namespace App\Mail;

use App\Story;
use App\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class StoryPreContract extends Mailable
{
    use Queueable, SerializesModels;

    public $story, $contact, $bumpNo;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Story $story, $subject, $bumpNo = 1)
    {
        $this->story = $story;
        $this->subject = $subject;
        $this->bumpNo = $bumpNo;
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
            ->view('emails.stories.pre_contract_bump_'.$this->bumpNo)
            ->text('emails.stories.pre_contract_bump_'.$this->bumpNo.'_plain')
            ->subject($this->subject);
    }
}
