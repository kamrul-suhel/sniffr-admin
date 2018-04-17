<?php

namespace App\Jobs;

use App\Video;
use App\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SubmissionAlert;
use App\Mail\DetailsReminder;
use App\Mail\DetailsThanks;
use App\Mail\SubmissionAccepted;
use App\Mail\SubmissionLicensed;
use App\Mail\SubmissionRejected;
use App\Mail\SubmissionThanks;
use App\Mail\SubmissionThanksNonEx;


class QueueEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video_id, $email_type;

    public $tries = 5;
    public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($video_id, $email_type)
    {
        $this->video_id = $video_id;
        $this->email_type = $email_type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $video = Video::find($this->video_id);

        //check if email is valid (might not be needed if frontend upload form is doing it)

        //check if contact has unsubcribed (contact_id!=0)
        if (isset($video->id)) {
            if ($video->contact_id == 0) {
                $video->notify(new SubmissionAlert('a job failed to send an ' . $this->email_type . ' email due to unsubscribe or no contact email (Id: ' . $this->video_id . ')'));
            } else {
                switch ($this->email_type) {
                    case 'submission_accepted':
                        Mail::to($video->contact->email)->send(new SubmissionAccepted($video));
                        break;
                    case 'submission_licensed':
                        Mail::to($video->contact->email)->send(new SubmissionLicensed($video));
                        break;
                    case 'submission_rejected':
                        Mail::to($video->contact->email)->send(new SubmissionRejected($video));
                        break;
                    case 'submission_thanks':
                        Mail::to($video->contact->email)->send(new SubmissionThanks($video));
                        break;
                    case 'submission_thanks_nonex':
                        Mail::to($video->contact->email)->send(new SubmissionThanksNonEx($video));
                        break;
                    case 'details_reminder':
                        Mail::to($video->contact->email)->send(new DetailsReminder($video));
                        break;
                    case 'details_thanks':
                        Mail::to($video->contact->email)->send(new DetailsThanks($video));
                        break;
                }
            }
        }
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
        $user->notify(new SubmissionAlert('a job failed to send an email, please check job queue (Id: ' . $this->video_id . ')'));
    }
}
