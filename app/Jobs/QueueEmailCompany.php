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

    protected $company_id;
    protected $account_owner_email;
    protected $user_first_name;
    protected $username;
    protected $password;

    public $tries = 5;
    public $timeout = 120;

    /**
     * QueueEmail constructor.
     * @param int $company_id
     * @param string $account_owner_email
     * @param string $user_first_name
     * @param string $username
     * @param string $password
     */
    public function __construct(
        int $company_id,
        string $account_owner_email,
        string $user_first_name,
        string $username,
        string $password
    )
    {
        $this->company_id = $company_id;
        $this->account_owner_email = $account_owner_email;
        $this->user_first_name = $user_first_name;
        $this->username = $username;
        $this->password = $password;
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
            \Mail::to($this->account_owner_email)->send(new NewCompany([
                'company_name' => $company->name,
                'user_first_name' => $this->user_first_name,
                'account_owner_email' => $this->account_owner_email,
                'username' => $this->username,
                'password' => $this->password
            ]));
        }
    }

    public function failed()
    {
        // Send user notification of failure, etc...
        $user = new User();
        $user->notify(new SubmissionAlert('a job failed to send an email, please check job queue (Company Id: ' . $this->company_id . ')'));
    }
}
