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
use App\Mail\StoryPreContract;


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
		$bumpType = is_null($asset->contact_made) ? ($asset->type ? $asset->type : 'default' ) : 'pre_contract'; // Once contact has been made send pre contract reminders
		$bumpNo = is_null($asset->contacted_at) ? 0 : $asset->reminders;
        $success = false;
        $errMessage = '';

		if($contact->email){ // Email
			if($bumpType == 'pre_contract'){
				Mail::to($asset->contact->email)->send(new StoryPreContract($asset, 'Interview with UNILAD (Reminder)', $bumpNo));
			}else{
				Mail::to($asset->contact->email)->send(new StoryContacted($asset, 'Interview with UNILAD'.($asset->contacted_at  ? ' (Reminder)' : '')));
			}

			$success = true;
		}else if($contact->twitter && str_contains($asset->source, 'twitter.com')) { // Twitter
			$twitterHandle = substr($contact->twitter, 0, 1) === '@' ? $contact->twitter : '@' . $contact->twitter;
			preg_match('/\/([\d]+)/', $asset->source, $matches);
			$tweetId = $matches[1];

			//$dm = config('stories.bump_type.'.$bumpType.'.twitter.'.$bumpNo.'.dm');
			$message = config('stories.bump_type.'.$bumpType.'.twitter.'.$bumpNo.'.message');

			// IAN: Need to make twitter direct messages work
//			$dm = preg_replace('/\[twitter_handle\]/', $twitterHandle, $dm); // Insert from
//			$dm = preg_replace('/\[user\]/', $from, $dm); // Insert from
//			$dm = preg_replace('/\[story_id\]/', $asset->alpha_id, $dm); // Insert from

			$message = preg_replace('/\[twitter_handle\]/', $twitterHandle, $message); // Insert from
			$message = preg_replace('/\[user\]/', $from, $message); // Insert from
			$message = preg_replace('/\[story_id\]/', $asset->alpha_id, $message); // Insert from

//			// Attempt DM
//			try {
//				Twitter::postDm(array('screen_name' => $twitterHandle, 'text' => $dm, 'format' => 'json'));
//				$success = true;
//			} catch (\Exception $e) {
//				// No dm
//			}
//
//			// DM Successfull
//			if ($success) {
//				$message = $message;
//			}

			try {
				Twitter::postTweet(array('screen_name' => $twitterHandle, 'in_reply_to_status_id' => $tweetId, 'status' => $message, 'format' => 'json'));
			} catch (\Exception $e) {
				$user = new User();
				$user->slackChannel('alerts')->notify(new SubmissionAlert('Reply tweet failed to send to '.$twitterHandle.', with message: '.$message.', error: '.$e->getMessage().' (Id: ' . $asset->asset_id . ')'));
			}

			$success = true;
		}else if($contact->reddit){ // Reddit
			$message = config('stories.bump_type.'.$bumpType.'.reddit.'.$bumpNo.'.message');
			$message = preg_replace('/\[user\]/', $from, $message); // Insert from

			$response = RedditAPI::composeMessage($contact->reddit, 'Interview with UNILAD', $message);

			if(!count($response->json->errors)){
				$success = true;
			}else{
				$errMessage = 'Reddit';
			}
		}else if($contact->imgur && str_contains($asset->source, 'imgur.com')){ // IMGUR
			preg_match('/\/([\d\w]+)$/', $asset->source, $matches);
			$imageId = $matches[1];

			$message = config('stories.bump_type.'.$bumpType.'.imgur.'.$bumpNo.'.message');
			$message = preg_replace('/\[user\]/', $from, $message); // Insert from

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
		$user->slackChannel('alerts')->notify(new SubmissionAlert('Failed contacting someone in the QueueBump, please check job queue (Story Id: ' .$this->asset_id . ')'));
    }
}
