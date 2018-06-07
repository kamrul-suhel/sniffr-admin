<?php

namespace App\Mail;

use App\Contact;
use App\Contract;
use App\Video;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContractSignedThanks extends Mailable
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
        return $this->view('emails.contracts.contract_signed_thanks')
            ->text('emails.contracts.contract_signed_thanks_text')
            ->subject('SNIFFR - Thank you');
    }
}
