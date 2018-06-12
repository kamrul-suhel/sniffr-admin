<?php

namespace App\Jobs;

use App\Client;
use App\Mail\NewCompany;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SubmissionAlert;

class QueueEmailCompany implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $company_id, $account_owner_email;

    public $tries = 5;
    public $timeout = 120;

    /**
     * QueueEmail constructor.
     * @param $company_id
     * @param $account_owner_email
     */
    public function __construct($company_id, $account_owner_email)
    {
        $this->company_id = $company_id;
        $this->account_owner_email = $account_owner_email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $company = Client::find($this->company_id);

        if ($company) {
            \Mail::to($this->account_owner_email)->send(new NewCompany($this->company_id));
        }
    }

    public function failed()
    {
        // Send user notification of failure, etc...
        $user = new User();
        $user->notify(new SubmissionAlert('a job failed to send an email, please check job queue (Company Id: ' . $this->company_id . ')'));
    }
}
