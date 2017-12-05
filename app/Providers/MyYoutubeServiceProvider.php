<?php 

namespace App\Providers;

 use App\Libraries\MyYoutube;
 use Dawson\Youtube\YoutubeServiceProvider;

class MyYoutubeServiceProvider extends YoutubeServiceProvider {
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('myyoutube', function($app) {
            return new MyYoutube($app, new \Google_Client);
        });
    }
}