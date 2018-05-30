<?php

namespace App\Notifications;

use App\Video;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;

class ContractSigned extends Notification
{
    use Queueable;

    /**
     * @var Video $video
     */
    private $video;

    /**
     * ContractSigned constructor.
     * @param Video $video
     */
    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    /**
     * @param $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['slack'];
    }

    /**
     * @param $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
       return (new SlackMessage)
           ->content('Contract Signed for for: ' . $notifiable->title .': '. url('admin/videos/edit/' . $this->video->alpha_id));
    }
}
