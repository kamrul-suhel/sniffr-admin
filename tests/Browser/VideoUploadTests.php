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

class VideoUploadTests extends DuskTestCase
{
    public function testUploadVideoLink() // Tests upload form for video link
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

    public function testUploadVideoFile() // Tests upload form for video file
    {
        $this->browse(function ($browser) {
            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('file');
                })
                ->attach('file', public_path('/assets/unit_test_assets/test_small.mp4'))
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                })
                ->screenshot('success-'.$this->getName().'-'.time());
        });
    }

    public function testSubmissionVideoLink() // Tests non exclusive submission form for video link
    {
        $this->browse(function ($browser) {
            $browser->visit('/submission')
                ->within(new FillFormSubmission, function ($browser) {
                    $browser->enterTestData('link');
                })
                ->type('url', 'https://www.youtube.com/watch?v=qRHPA3LawQI')
                ->within(new FillFormSubmission, function ($browser) {
                    $browser->executeUpload();
                })
                ->screenshot('success-'.$this->getName().'-'.time());
        });
    }

    public function testSubmissionVideoFile() // Tests non exclusive submission form for video file
    {
        $this->browse(function ($browser) {
            $browser->visit('/submission')
                ->within(new FillFormSubmission, function ($browser) {
                    $browser->enterTestData('file');
                })
                ->attach('file', public_path('/assets/unit_test_assets/test_small.mp4'))
                ->within(new FillFormSubmission, function ($browser) {
                    $browser->executeUpload();
                })
                ->screenshot('success-'.$this->getName().'-'.time());
        });
    }

    protected function tearDown() // Clears browser sessions/cookies from tests
    {
        // be careful enabling the db teardown as it won't process the video files properly (watermarks etc in the job queue)
        //$video = Video::where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->forcedelete();

        session()->flush();

        parent::tearDown();

        foreach(static::$browsers as $browser) {
            $browser->driver->manage()->deleteAllCookies();
        }
    }

}
