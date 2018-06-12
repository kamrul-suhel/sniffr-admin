<?php

namespace App\Mail;

use App\Contact;
use App\Contract;
use App\Video;
use Faker\Provider\ar_JO\Company;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewCompany extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var integer
     */
    public $company_id;

    /**
     * ContractMailable constructor.
     * @param int $company_id
     */
    public function __construct(int $company_id)
    {
        $this->company_id = $company_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.companies.created')
            ->subject('SNIFFR - New Company Created');
    }
}
