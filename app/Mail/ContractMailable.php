<?php

namespace App\Mail;

use App\Contact;
use App\Contract;
use App\Video;
use App\Story;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContractMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $asset;
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
        if($type=='video') {
            $asset = Video::find($asset_id);
        } else {
            $asset = Story::find($asset_id);
        }
        $this->contract = $contract;
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
            ->subject('SNIFFR - Here is the contract for your asset');
    }
}
