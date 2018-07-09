<?php

namespace App\Mail;

use App\Contact;
use App\Contract;
use App\Video;
use App\Story;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContractSignedThanks extends Mailable
{
    use Queueable, SerializesModels;

    public $asset_id;
    public $type;

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
     * @param Contract $contract
     */
    public function __construct($asset_id, Contract $contract, $type = 'video')
    {
        $this->asset_id = $asset_id;
        $this->type = $type;
        $this->asset = ($this->type=='video' ? Video::find($this->asset_id) : Story::find($this->asset_id));
        $this->contract = $contract;
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
