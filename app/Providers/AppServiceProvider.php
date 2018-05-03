<?php

namespace App\Providers;

use App\Observers\VideoObserver;
use App\Video;
use Illuminate\Support\ServiceProvider;
use Facebook\Facebook;
use View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('settings.cache.cache_enabled')) {
            Video::observe(VideoObserver::class);
        }
        if (!\App::environment('local')) {
            \URL::forceScheme('https');
        }

        $settings = config('settings.site');
        View::share('settings', $settings);
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
