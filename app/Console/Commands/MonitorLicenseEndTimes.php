<?php

namespace App\Console\Commands;

use App\CollectionStory;
use App\CollectionVideo;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MonitorLicenseEndTimes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'licenses:monitorLicenseEndTimes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check license send time. Republish anything expired.';

    /**
     * @var CollectionVideo
     */
    protected $collectionVideo, $collectionStory;

    /**
     * MonitorLicenseEndTimes constructor.
     * @param CollectionVideo $collectionVideo
     * @param CollectionStory $collectionStory
     */
    public function __construct(CollectionVideo $collectionVideo, CollectionStory $collectionStory)
    {
        parent::__construct();
        $this->collectionVideo = $collectionVideo;
        $this->collectionStory = $collectionStory;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $collectionVideos = $this->collectionVideo->whereNotNull('license_ends_at')->get();
        $collectionStories = $this->collectionStory->whereNotNull('license_ends_at')->get();

        foreach($collectionVideos as $video) {
            if((Carbon::now()->endOfDay() >= $video->license_ends_at) && $video->status !== 'expired' && $video->status == 'purchased') {
                $video->status = 'expired';
                $video->reason = 'license term of '.$video->length.' has ended.';
                $video->save();
            }
        }

        foreach($collectionStories as $story) {
            if((Carbon::now()->endOfDay() >= $story->license_ends_at) && $story->status !== 'expired' && $story->status == 'purchased') {
                $story->status = 'expired';
                $story->reason = 'license term of '.$story->length.' has ended.';
                $story->save();
            }
        }



    }
}
