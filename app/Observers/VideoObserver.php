<?php

namespace App\Observers;

use App\Jobs\FlushCacheTag;
use App\Video;
use Log;

class VideoObserver
{
    /**
     * Listen to the Video created event.
     *
     * @return void
     */
    public function updated()
    {
        Video::updated(function () {
            FlushCacheTag::dispatch('licensed.paginated');
            Log::info('Job Dispatched: Flush Licensed Paginated Videos Cache');
        });
    }
}