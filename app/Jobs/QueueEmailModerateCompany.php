<?php

namespace App\Jobs;

use App\Client;
use App\Mail\ModerateCompany;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueEmailModerateCompany implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $company, $email;

    /**
     * QueueEmailModerateCompany constructor.
     * @param Client $company
     */
    public function __construct(Client $company)
    {
        $this->company = $company;
        $this->email = $this->company->owner->email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        \Mail::to($this->email)->send(new ModerateCompany($this->company));
    }
}