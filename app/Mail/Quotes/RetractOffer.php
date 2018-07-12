<?php

namespace App\Mail\Quotes;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RetractOffer extends Mailable
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
        return $this->view('emails.quotes.retracted')
            ->subject('SNIFFR - Sorry! Your Quote has been Retracted')
            ->with('data', $this->data);
    }
}
