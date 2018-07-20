<?php

namespace App\Mail\Quotes;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExpiredOffer extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;

    /**
     * RetractOffer constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.quotes.expired')
            ->subject('SNIFFR - Your License has Expired!')
            ->with('data', $this->data);
    }
}
