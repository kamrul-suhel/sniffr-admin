<?php

namespace App\Mail;

use App\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ModerateCompany extends Mailable
{
    use Queueable, SerializesModels;

    protected $company;

    /**
     * ModerateCompany constructor.
     * @param Client $company
     */
    public function __construct(Client $company)
    {
        $this->company = $company;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.companies.moderated')
            ->with('company', $this->company);
    }
}
