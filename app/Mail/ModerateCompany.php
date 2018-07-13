<?php

namespace App\Mail;

use App\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

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
            ->subject('Your company has been Approved!')
            ->with('company', $this->company);
    }
}
