<?php

namespace App\Notifications;

use App\Video;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;

class ClientAction extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Video $video, $state, $client_name)
    {
        $this->video = $video;
        $this->state = $state;
        $this->client_name = $client_name;
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
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toSlack($notifiable)
    {
        switch ($this->state) {
            case 'yes':
                $message = 'will use';
                break;
            case 'no':
                $message = 'will not use';
                break;
            case 'maybe':
                $message = 'might use';
                break;
            case 'request':
                $message = 'have chased for the file for';
                break;
            case 'interested':
                $message = 'would like the following video';
                break;
        }

        return (new SlackMessage)
           ->content($this->client_name.' '.$message.': ' . $notifiable->title .' : '. url('admin/videos/edit/' . $this->video->alpha_id));
    }
}
