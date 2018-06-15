<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewCompany extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var integer
     */
    public $email_data;

    /**
     * ContractMailable constructor.
     * @param array $email_data
     * @internal param int $company_id
     */
    public function __construct(array $email_data)
    {
        $this->email_data = $email_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.companies.company_created')
            ->subject('SNIFFR - Invitation');
    }
}
