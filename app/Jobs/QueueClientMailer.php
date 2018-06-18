<?php

namespace App\Jobs;

use App\ClientMailer;
use App\Contact;
use App\Story;
use App\User;
use App\Asset;
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
        $mailer = ClientMailer::find($this->mailer_id);
		$user = User::find($this->client_id);

        if($mailer->user_id!=0) {
            $from = User::find($mailer->user_id);
            $from_name = ($from->full_name ? $from->full_name : $from->username);
            $from_email = $from->email;
        } else {
            $from_name = 'SNIFFR';
            $from_email = 'noreply@sniffrmedia.co.uk';
        }

        //check if user has unsubcribed (user_id!=0)
		Mail::to($user->email)->send(new ClientStoryList($mailer, $user, $from_name, $from_email));
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
        $user->notify(new ClientMailer('Failed to send an email within a client mailer, please check user (Id: ' . $this->client_id . ')'));
    }
}
