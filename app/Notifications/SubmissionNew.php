<?php

namespace App\Notifications;

use App\Video;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;

class SubmissionNew extends Notification
{
    use Queueable;

    protected $video;

	/**
	 * SubmissionNew constructor.
	 * @param Video $video
	 */
    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return mixed
     */
    public function toSlack($notifiable)
    {
    	$content = 'A new video has been submitted: ' . $notifiable->title .': '. url('admin/videos/edit/' . $this->video->alpha_id);

    	$content .= ' by '. $this->video->contact->full_name . ' (' .$this->video->contact->email. ')';

    	if($this->video->contact->blacklist) {
    		$content .= ' who is blacklisted :skull:';
	    }

    	return (new SlackMessage)->content($content);
    }
}
