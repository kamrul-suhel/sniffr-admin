<?php

namespace App\Jobs;

use App\User;
use App\Story;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SubmissionAlert;
use Thujohn\Twitter\Facades\Twitter;
use App\Mail\StoryContacted;


class QueueBump implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $asset_id;

    public $tries = 5;
    public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($asset_id)
    {
        $this->asset_id = $asset_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $asset = Story::find($this->asset_id);
        $contact = $asset->contact;
        $success = false;

        // Contact hierarchy logic


		if($contact->email){ // Email
			Mail::to($asset->contact->email)->send(new StoryContacted($asset, 'Interview with UNILAD'.($asset->reminders ? ' (Reminder - '.$asset->reminders.')' : '')));
			$success = true;
		}elseif($contact->twitter && str_contains($asset->source, 'twitter.com')){ // Twitter
			$twitterHandle = substr($contact->twitter, 0, 1) === '@' ? $contact->twitter : '@'.$contact->twitter;
			preg_match('/\/([\d]+)/', $asset->source, $matches);
			$tweetId = $matches[1];
			$contact = $asset->author ? $asset->author : User::find($asset->user_id)->full_name;


			switch($asset->reminders){
				case '':
					$dmMessage = 'Hey! how are you? I\'m a senior writer from UNILAD and would love to talk to you about your tweet for an article. Do you have some time to talk to me today? '.$contact.' x';
					$replyMessage =  'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
					$replyMessageDmSuccess = 'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
					break;
				case 1:
					$dmMessage = 'Hey! Would be great to chat. Do you have some time today?';
					$replyMessage =  'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
					$replyMessageDmSuccess = 'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. I’ve just sent you a DM!';
					break;
				default:
					$dmMessage = 'Hey did you get my message? :)';
					$replyMessage =  'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
					$replyMessageDmSuccess = 'Hey '.$twitterHandle.'! It’s '.$contact.' from UNILAD and I would love to have a chat with you. I’ve just sent you a DM!';
					break;
			}

			// Attempt DM
			$response = Twitter::postDm(array('screen_name' => $twitterHandle, 'text' => $dmMessage, 'format' => 'json'));

			// DM Successfull
			if($response){
				$replyMessage = $replyMessageDmSuccess;
			}

			Twitter::postTweet(array('screen_name' => $twitterHandle, 'in_reply_to_status_id' => $tweetId, 'status' => $replyMessage, 'format' => 'json'));
			$success = true;
		}

		if($success){
			$asset->contacted_at = now();
			$asset->reminders = (isset($asset->reminders) ? $asset->reminders : 0) + 1;
			$asset->save();
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
