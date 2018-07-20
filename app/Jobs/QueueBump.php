<?php

namespace App\Jobs;

use RedditAPI;
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
		$from = $asset->author ? $asset->author : User::find($asset->user_id)->full_name;
        $success = false;

		if($contact->email){ // Email
			Mail::to($asset->contact->email)->send(new StoryContacted($asset, 'Interview with UNILAD'.($asset->reminders >= 0  ? ' (Reminder)' : '')));
			$success = true;
		}elseif($contact->twitter) { // Twitter
			if (str_contains($asset->source, 'twitter.com')){
				$twitterHandle = substr($contact->twitter, 0, 1) === '@' ? $contact->twitter : '@' . $contact->twitter;
				preg_match('/\/([\d]+)/', $asset->source, $matches);
				$tweetId = $matches[1];

				switch ($asset->reminders) {
					case '':
						$dmMessage = 'Hey! how are you? I\'m a senior writer from UNILAD and would love to talk to you about your tweet for an article. Do you have some time to talk to me today? ' . $from . ' x';
						$replyMessage = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
						$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
						break;
					case 1:
						$dmMessage = 'Hey! Would be great to chat. Do you have some time today?';
						$replyMessage = 'Hello again ' . $twitterHandle . '! UNILAD here, I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :)';
						$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. I’ve just sent you a DM!';
						break;
					default:
						$dmMessage = 'Hey did you get my message? :)';
						$replyMessage = 'Hey ' . $twitterHandle . '! Could you DM me or email stories@unilad.co.uk :)';
						$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. I’ve just DM\'d you!';
						break;
				}

				// Attempt DM
                try {
                    $dmResponse = Twitter::postDm(array('screen_name' => $twitterHandle, 'text' => $dmMessage, 'format' => 'json'));
                    $success = true;
                } catch (\Exception $e) {
                    $success = false;
                }

				// DM Successfull
				if ($success) {
					$replyMessage = $replyMessageDmSuccess;
				}

                try {
                    $replyResponse = Twitter::postTweet(array('screen_name' => $twitterHandle, 'in_reply_to_status_id' => $tweetId, 'status' => $replyMessage, 'format' => 'json'));
                    $success = true;
                } catch (\Exception $e) {
					$user = new User();
					$user->slackChannel('alerts')->notify(new SubmissionAlert('Reply tweet failed to send to '.$twitterHandle.', '.$e->getMessage().' (Id: ' . $asset->asset_id . ')'));
					$success = false;
                }

			}else{
				$user = new User();
				$user->slackChannel('alerts')->notify(new SubmissionAlert('Failed tweeting someone because the source was not from twitter (Id: ' . $asset->asset_id . ')'));
			}
		}elseif($contact->reddit){ // Reddit
			switch ($asset->reminders) {
				case 2:
					$message = 'Hey, It’s '.$from.' from UNILAD! Did you get my previous messages? :)';
					break;
				default:
					$message = 'Hi there! How are you? Im a journalist from UNILAD and would love to talk to you about your reddit post for an article. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk '.$from;
					break;
			}

			$response = RedditAPI::composeMessage($contact->reddit, 'Interview with UNILAD', $message);

			if(!count($response->json->errors)){
				$success = true;
			}else{
				$user = new User();
				$user->slackChannel('alerts')->notify(new SubmissionAlert('Failed reddit messaging someone '.implode(', ',$response->json->errors).' (Id: ' . $asset->asset_id . ')'));
			}
		}

		if($success){
            $asset->reminders = (isset($asset->contacted_at) ? $asset->reminders + 1 : 0);
			$asset->contacted_at = now();

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
		$user->slackChannel('alerts')->notify(new SubmissionAlert('Failed contacting someone in the QueueBump, please check job queue (Id: ' . $this->asset_id . ')'));
    }
}
