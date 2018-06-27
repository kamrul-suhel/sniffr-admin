<?php

namespace App\Notifications;

use App\User;
use App\Video;
use App\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;

class RequestVideoQuote extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Video $video, Client $client)
    {
		$this->user = $user;
        $this->video = $video;
        $this->client = $client;
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
       return (new SlackMessage)
           ->content('Quote Requested for: '.$this->video->title.' : '. url('admin/quotes').', from: '.$this->user->email.'@'.$this->client->name);
    }
}
