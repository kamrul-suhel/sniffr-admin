<?php

namespace App\Console\Commands;

use App\VideoSocialLink;
use App\VideoStats;
use Illuminate\Console\Command;
use GuzzleHttp;

class GetVideoStats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stats:getVideoStats';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get stats on all social links associated to a video (only if they exist in the insights db)';

    protected $videoStats;

    /**
     * GetVideoStats constructor.
     * @param VideoStats $videoStats
     */
    public function __construct(VideoStats $videoStats)
    {
        parent::__construct();

        $this->videoStats = $videoStats;

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $socialLinks = VideoSocialLink::all();

        foreach($socialLinks as $link)
        {
            $videoLink = $link->link;

            $validateResult = $this->videoStats->validateUrl($videoLink);

            if(isset($validateResult->status) && $validateResult->status !== 'success') {
                continue;
            }

            $postResult = $this->videoStats->getPost($videoLink);

            $post = $postResult->data;

            $stats = new VideoStats();
            $stats->video_social_link_id = $link->id;
            $stats->likes = $post->likes;
            $stats->reach = $post->reach;
            $stats->reactions = $post->reactions;
            $stats->link_clicks = $post->link_clicks;
            $stats->comments = $post->comments;
            $stats->shares = $post->shares;
            $stats->save();
        }


    }
}
