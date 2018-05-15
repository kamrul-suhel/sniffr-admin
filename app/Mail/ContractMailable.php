<?php

namespace App\Mail;

use App\Contact;
use App\Contract;
use App\Video;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContractMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Video
     */
    public $video;

    /**
     * @var Contact
     */
    public $contact;

    /**
     * @var Contract
     */
    public $contract;

    /**
     * ContractMailable constructor.
     * @param Video $video
     * @param Contract $contract
     */
    public function __construct(Video $video, Contract $contract)
    {
        $this->contract = $contract;
        $this->video = $video;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.contracts.accept_link')
            ->text('emails.contracts.accept_link_text')
            ->subject('SNIFFR - Here is the contract for your video');
    }
}
