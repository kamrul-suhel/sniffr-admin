<?php

namespace App\Providers;

use App\Jobs\FlushCacheTag;
use App\Video;
use Illuminate\Support\ServiceProvider;
use Facebook\Facebook;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->environment() !== 'production') {
            Video::updated(function () {
                FlushCacheTag::dispatch('licensed.paginated');
                \Log::info('Job Dispatched: Flush Licensed Paginated Videos Cache');
            });
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Facebook::class, function ($app) {
            return new Facebook(config('facebook.config'));
        });
    }
}
