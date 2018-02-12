<?php

namespace Tests\Browser;

use App\User;
use App\Video;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Browser\Components\FillFormDetails;

class VideoAdvancedTests extends DuskTestCase
{
    // public function testLoginPageExists()
    // {
    //     $this->browse(function (Browser $browser) {
    //         $browser->visit('/login')
    //                 ->assertSee('Please Login');
    //     });
    // }
    //
    // public function testLoginAdminManualCredentials()
    // {
    //     $this->browse(function ($browser) {
    //         $browser->visit('/login')
    //             ->type('email', 'mike@unilad.co.uk')
    //             ->type('password', 'removed-password-after-testing')
    //             ->press('Sign in')
    //             ->assertPathIs('/admin');
    //     });
    // }

    public function testAdminVideoSearch() // Tests admin search video section
    {
        $this->browse(function ($browser) {
            $browser->on(new LoginPage)
                    ->loginUser()
                    ->visit('/admin/videos/licensed')
                    ->assertSee('Licensed Videos')
                    ->type('s', 'Little kid shits himself')
                    ->keys('#search-input', '{enter}')
                    ->assertSee('Little kid shits himself')
                    ->resize(1560, 1000)
                    ->screenshot('success-'.$this->getName().'-'.time());
        });
    }

    public function testAdminVideoAccept() // Tests admin accept new video upload
    {
        $this->browse(function ($browser) {
            $video = Video::where('state', 'new')->where('title', 'LIKE', '%unit browser%')->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos/new')
                        ->resize(1560, 1000)
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/status/accepted/'.$video->alpha_id)."']")
                        ->pause(3000)
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testAdminMoreDetailsVideo() // Tests more details form
    {
        $this->browse(function ($browser) {
            $video = Video::where('state', 'accepted')->where('title', 'LIKE', '%unit browser%')->where('more_details', NULL)->where('more_details_code', '!=', NULL)->orderBy('created_at', 'desc')->first();
            if(isset($video->id)){
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/details/'.$video->more_details_code)
                        ->assertSee($video->title)
                        ->within(new FillFormDetails, function ($browser) {
                            $browser->enterTestData();
                        })
                        ->within(new FillFormDetails, function ($browser) {
                            $browser->executeUpload();
                        })
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testAdminVideoLicense() // Tests admin license pending video
    {
        $this->browse(function ($browser) {
            $video = Video::where('state', 'pending')->where('title', 'LIKE', '%unit browser%')->where('rights', 'ex')->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos/pending')
                        ->resize(1560, 1000)
                        ->type('s', $video->alpha_id)
                        ->keys('#search-input', '{enter}')
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/status/licensed/'.$video->alpha_id)."']")
                        ->pause(3000)
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    protected function tearDown() // Deletes test records and clears browser sessions/cookies from tests
    {
        $video = Video::where('title', 'LIKE', '%unit browser%')->delete();

        session()->flush();

        parent::tearDown();

        foreach(static::$browsers as $browser) {
            $browser->driver->manage()->deleteAllCookies();
        }
    }

}
