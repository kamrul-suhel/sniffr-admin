<?php

namespace App\Providers;

use App\Observers\VideoObserver;
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
        if (\App::environment() !== 'production') {
            Video::observe(VideoObserver::class);
        }
        if (!\App::environment('local')) {
            \URL::forceScheme('https');
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
