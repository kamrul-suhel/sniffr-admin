<?php

namespace App\Jobs\Auth;

use App\User;
use App\Client;
use App\Mail\NewClient;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SubmissionAlert;

class QueueEmailClient implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $company_id;
    protected $email;
    protected $full_name;
    protected $token;

    public $tries = 5;
    public $timeout = 120;

    /**
     * QueueEmail constructor.
     * @param int $company_id
     * @param string $email
     * @param string $full_name
     * @param string $token
     */
    public function __construct(
        int $company_id,
        string $email,
        string $full_name,
        string $token
    )
    {
        $this->company_id = $company_id;
        $this->email = $email;
        $this->full_name = $full_name;
        $this->token = $token;
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
            \Mail::to($this->email)->send(new NewClient([
                'company_name' => $company->name,
                'full_name' => $this->full_name,
                'email' => $this->email,
                'token' => $this->token
            ]));
        }
    }

    public function failed()
    {
        // Send user notification of failure, etc...
		$user = new User();
		$user->slackChannel('alerts')->notify(new SubmissionAlert('a job failed to send an email, please check job queue (Company Id: ' . $this->company_id . ')'));
    }
}
