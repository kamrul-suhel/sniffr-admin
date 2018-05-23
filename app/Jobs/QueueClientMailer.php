<?php

namespace App\Jobs;

use App\ClientMailer;
use App\Contact;
use App\Story;
use App\User;
use App\Video;
use App\Client;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\ClientMailerAlert;
use App\Mail\ClientStoryList;


class QueueClientMailer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mailer_id, $client_id;

    public $tries = 5;
    public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($client_id, $mailer_id)
    {
		$this->client_id = $client_id;
        $this->mailer_id = $mailer_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mailer = ClientMailer::find(1);
		$user = User::find($this->client_id);

        //check if contact has unsubcribed (contact_id!=0)
		Mail::to($user->email)->send(new ClientStoryList($mailer));
    }

    /**
     * The job failed to process.
     *
     * @param  Exception $exception
     * @return void
     */
    public function failed()
    {
        // Send user notification of failure, etc...
        $user = new User();
        $user->notify(new ClientMailer('A client mailer failed to send, please check job queue (Id: ' . $this->video_id . ')'));
    }
}
