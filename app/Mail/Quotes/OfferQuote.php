<?php

namespace App\Mail\Quotes;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OfferQuote extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;

    /**
     * OfferQuote constructor.
     * @param array $data
     */
    public function __construct(array $data)
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

        return $this->view('emails.quotes.offered')
            ->subject('SNIFFR - You have a new quote!')
            ->with('data', $this->data);
    }
}
