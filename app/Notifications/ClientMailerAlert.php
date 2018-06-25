<?php

namespace App\Notifications;

use App\Video;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;

class ClientMailer extends Notification
{
    use Queueable;

    /**
     * @var Video
     */
    protected $mailer;

    /**
     * Create a new notification instance.
     *
     * @param Video $mailer
     */
    public function __construct(Video $mailer)
    {
        $this->mailer = $mailer;
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
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
       return (new SlackMessage)
           ->content('A client downloaded has been sent: ' . $notifiable->alpha_id);
    }
}
