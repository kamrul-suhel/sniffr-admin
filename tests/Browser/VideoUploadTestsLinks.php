<?php

namespace Tests\Browser;

use App\User;
use App\Video;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Browser\Components\FillFormUpload;
use Tests\Browser\Components\FillFormSubmission;

class VideoUploadTestsLinks extends DuskTestCase // Tests upload form for all types of video links
{
    public function testUploadVideoLinkYoutube() // youtube shortcode
    {
        $this->browse(function ($browser) {
            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link');
                })
                ->type('url', 'https://www.youtube.com/watch?v=qRHPA3LawQI')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                })
                ->screenshot('success-'.$this->getName().'-'.time());
        });
    }

    protected function tearDown() // Clears browser sessions/cookies from tests
    {
        session()->flush();

        parent::tearDown();

        foreach(static::$browsers as $browser) {
            $browser->driver->manage()->deleteAllCookies();
        }
    }

}
