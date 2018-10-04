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
        Video::created(function () {
            //TODO: add logging logic
        });

        Video::updated(function () {
            if (config('settings.cache.cache_enabled')) {
                FlushCacheTag::dispatch('licensed.paginated');
                Log::info('Job Dispatched: Flush Licensed Paginated Videos Cache');
            }
        });

        Video::deleted(function () {
            //TODO: add logging logic
        });
    }
}
