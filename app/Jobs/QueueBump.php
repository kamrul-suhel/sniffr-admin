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
		$from = $asset->author ? strtok($asset->author, " ") : strtok(User::find($asset->user_id)->full_name, " ");
        $success = false;
        $errMessage = '';

		if($contact->email){ // Email
			Mail::to($asset->contact->email)->send(new StoryContacted($asset, 'Interview with UNILAD'.($asset->contacted_at  ? ' (Reminder)' : '')));
			$success = true;
		}else if($contact->twitter && str_contains($asset->source, 'twitter.com')) { // Twitter
			$twitterHandle = substr($contact->twitter, 0, 1) === '@' ? $contact->twitter : '@' . $contact->twitter;
			preg_match('/\/([\d]+)/', $asset->source, $matches);
			$tweetId = $matches[1];

			if(!$asset->contacted_at) {
				$dmMessage = 'Hey! how are you? I\'m a senior writer from UNILAD and would love to talk to you about your tweet for an article. Do you have some time to talk to me today? ' . $from;
				$replyMessage = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :) Your story reference number is: '.$asset->alpha_id;
				$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. Could you DM me or email stories@unilad.co.uk :) Your story reference number is: '.$asset->alpha_id;
			} else if($asset->reminders == 0){
				$dmMessage = 'Hey! Would be great to chat. Do you have some time today? ' . $from;
				$replyMessage = 'Hello again ' . $twitterHandle . '! UNILAD here, I would love to have a chat with you. Could you DM me :) Your story reference number is: '.$asset->alpha_id;
				$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. I’ve just sent you a DM! Your story reference number is: '.$asset->alpha_id;
			} else {
				$dmMessage = 'Hey, did you get my message? :) ' . $from;
				$replyMessage = 'Hey ' . $twitterHandle . '! Could you DM me :) Your story reference number is: ' . $asset->alpha_id;
				$replyMessageDmSuccess = 'Hey ' . $twitterHandle . '! It’s ' . $from . ' from UNILAD and I would love to have a chat with you. I’ve just DM\'d you! Your story reference number is: ' . $asset->alpha_id;
			}

			// Attempt DM
			try {
				$dmResponse = Twitter::postDm(array('screen_name' => $twitterHandle, 'text' => $dmMessage, 'format' => 'json'));
				$success = true;
			} catch (\Exception $e) {
				// No dm
			}

			// DM Successfull
			if ($success) {
				$replyMessage = $replyMessageDmSuccess;
			}

			try {
				$replyResponse = Twitter::postTweet(array('screen_name' => $twitterHandle, 'in_reply_to_status_id' => $tweetId, 'status' => $replyMessage, 'format' => 'json'));
			} catch (\Exception $e) {
				$user = new User();
				$user->slackChannel('alerts')->notify(new SubmissionAlert('Reply tweet failed to send to '.$twitterHandle.', with message: '.$replyMessage.', error: '.$e->getMessage().' (Id: ' . $asset->asset_id . ')'));
			}

			$success = true;
		}else if($contact->reddit){ // Reddit
			switch ($asset->reminders) {
				case 1:
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
				$errMessage = 'Reddit';
			}
		}else if($contact->imgur && str_contains($asset->source, 'imgur.com')){ // IMGUR
			preg_match('/\/([\d\w]+)$/', $asset->source, $matches);
			$imageId = $matches[1];

			switch ($asset->reminders) {
				case 1:
					$message = 'Hey, It’s '.$from.' from UNILAD! Did you get my previous messages? :)';
					break;
				default:
					$message = 'Hi there! How are you? Im a journalist from UNILAD and would love to talk to you about your imgur post for an article. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk '.$from;
					break;
			}

			$data = [
				'image_id' => $imageId,
				'comment' => $message
			];

			$curl = curl_init();

			curl_setopt_array($curl, array(
				CURLOPT_URL => "https://api.imgur.com/3/comment",
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_CUSTOMREQUEST => "POST",
				CURLOPT_POSTFIELDS => $data,
				CURLOPT_HTTPHEADER => array(
					// Set here requred headers
					"content-type: multipart/form-data",
					"Authorization: Bearer ".env('IMGUR_ACCESS_TOKEN')
				),
			));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			curl_close($curl);

			if(!$err && json_decode($response)->success){
				$success = true;
			}else{
				$errMessage = $response;
			}
		}

		if($success){
            $asset->reminders = (isset($asset->contacted_at) ? $asset->reminders + 1 : 0);
			$asset->contacted_at = now();

			$asset->save();
		}else{
			$user = new User();
			$user->slackChannel('alerts')->notify(new SubmissionAlert('Failed sending contact message  (Story Id: ' . $asset->alpha_id . ') '.$errMessage));
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
