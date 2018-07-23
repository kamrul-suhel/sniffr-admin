<?php

namespace App\Jobs;

use App\Video;
use App\Story;
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
use App\Mail\ContractMailable;
use App\Mail\ContractSignedThanks;
use App\Mail\StoryContacted;


class QueueEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $asset_id, $email_type, $type;

    public $tries = 5;
    public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($asset_id, $email_type, $type = 'video')
    {
        $this->asset_id = $asset_id;
        $this->email_type = $email_type;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $asset = ($this->type=='video' ? Video::find($this->asset_id) : Story::find($this->asset_id));

        //check if email is valid (might not be needed if frontend upload form is doing it)

        //check if contact has unsubcribed (contact_id!=0)
        if (isset($asset->id)) {
            if ($asset->contact_id == 0 || $asset->contact_id == NULL) {
				$user = new User();
				$user->slackChannel('alerts')->notify(new SubmissionAlert('a job failed to send an ' . $this->email_type . ' email due to unsubscribe or no contact email (Id: ' . $this->asset_id . ')'));
            } else {
                switch ($this->email_type) {
                    case 'submission_accepted':
                        Mail::to($asset->contact->email)->send(new SubmissionAccepted($asset));
                        break;
                    case 'submission_licensed':
                        Mail::to($asset->contact->email)->send(new SubmissionLicensed($asset));
                        break;
                    case 'submission_rejected':
                        Mail::to($asset->contact->email)->send(new SubmissionRejected($asset));
                        break;
                    case 'submission_thanks':
                        Mail::to($asset->contact->email)->send(new SubmissionThanks($asset));
                        break;
                    case 'submission_thanks_nonex':
                        Mail::to($asset->contact->email)->send(new SubmissionThanksNonEx($asset));
                        break;
                    case 'details_reminder':
                        Mail::to($asset->contact->email)->send(new DetailsReminder($asset));
                        break;
                    case 'details_thanks':
                        Mail::to($asset->contact->email)->send(new DetailsThanks($asset));
                        break;
					case 'contract_signed':
                        Mail::to($asset->contact->email)->send(new ContractSignedThanks($asset->id, $asset->currentContract, $this->type));
						break;
					case 'sign_contract':
                        Mail::to($asset->contact->email)->send(new ContractMailable($asset->id, $asset->currentContract, $this->type));
                        break;
                    case 'story_contacted':
                        Mail::to($asset->contact->email)->send(new StoryContacted($asset, 'Interview with UNILAD'.($asset->contacted_at ? ' (Reminder)' : '')));
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
		$user->slackChannel('alerts')->notify(new SubmissionAlert('a job failed to send an email, please check job queue (Id: ' . $this->asset_id . ')'));
    }
}
