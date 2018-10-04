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
        $this->contract = $contract;
        $this->type = $type;
        $this->asset_id = $asset_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $asset = ($this->type=='video' ? Video::find($this->asset_id) : Story::find($this->asset_id));

        return $this->view('emails.contracts.contract_signed_thanks')->with('asset', $asset)
            ->text('emails.contracts.contract_signed_thanks_text')
            ->subject('SNIFFR - Thank you');
    }
}
