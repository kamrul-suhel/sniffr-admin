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

    public function testUploadVideoLink() // Tests upload form for video link
    {
        $this->browse(function ($browser) {

            // Tests upload form for video link
            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link');
                })
                ->type('url', 'https://www.youtube.com/watch?v=qRHPA3LawQI')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                })
                ->screenshot('success-upload-form-'.$this->getName().'-'.time());

                // Search for the video submission that was just added
                $video = Video::where('state', 'new')->where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
                if(isset($video->id)) {

                    // Tests admin accept new video upload
                    $browser->on(new LoginPage)
                            ->loginUser()
                            ->visit('/admin/videos/new')
                            ->resize(1560, 1000)
                            ->assertVisible('#video-'.$video->alpha_id)
                            ->click("a[href='".url('/admin/videos/status/accepted/'.$video->alpha_id)."']")
                            ->pause(3000)
                            ->screenshot('success-accepted-'.$this->getName().'-'.time());

                    $video2 = Video::where('id', $video->id)->where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->first();
                    if(isset($video2)) {
                        
                        // Tests more details form
                        $browser->visit('/details/'.$video2->more_details_code)
                                ->assertSee($video2->title)
                                ->within(new FillFormDetails, function ($browser) {
                                    $browser->enterTestData();
                                })
                                ->within(new FillFormDetails, function ($browser) {
                                    $browser->executeUpload();
                                })
                                ->screenshot('success-more-details-'.$this->getName().'-'.time());

                        // Tests admin license pending video
                        $browser->on(new LoginPage)
                                ->loginUser()
                                ->visit('/admin/videos/pending')
                                ->resize(1560, 1000)
                                ->type('s', $video2->alpha_id)
                                ->keys('#search-input', '{enter}')
                                ->assertVisible('#video-'.$video2->alpha_id)
                                ->click("a[href='".url('/admin/videos/status/licensed/'.$video2->alpha_id)."']")
                                ->pause(3000)
                                ->screenshot('success-licensed-'.$this->getName().'-'.time());

                        // Tests admin search video section
                        $browser->on(new LoginPage)
                                ->loginUser()
                                ->visit('/admin/videos/licensed')
                                ->assertSee('Licensed Videos')
                                ->type('s', 'Little kid shits himself')
                                ->keys('#search-input', '{enter}')
                                ->assertSee('Little kid shits himself')
                                ->resize(1560, 1000)
                                ->screenshot('success-search-'.$this->getName().'-'.time());
                    }

                }
        });
    }

    // KEEP THESE HERE IF EVER NEEDED IN THE FUTURE
    // public function testAdminVideoAccept() // Tests admin accept new video upload
    // {
    //     $this->browse(function ($browser) {
    //         $video = Video::where('state', 'new')->where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
    //         if(isset($video->id)) {
    //             $browser->on(new LoginPage)
    //                     ->loginUser()
    //                     ->visit('/admin/videos/new')
    //                     ->resize(1560, 1000)
    //                     ->assertVisible('#video-'.$video->alpha_id)
    //                     ->click("a[href='".url('/admin/videos/status/accepted/'.$video->alpha_id)."']")
    //                     ->pause(3000)
    //                     ->screenshot('success-'.$this->getName().'-'.time());
    //         }
    //     });
    // }
    //
    // public function testAdminMoreDetailsVideo() // Tests more details form
    // {
    //     $this->browse(function ($browser) {
    //         $video = Video::where('state', 'accepted')->where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('more_details', NULL)->where('more_details_code', '!=', NULL)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
    //         if(isset($video->id)){
    //             $browser->on(new LoginPage)
    //                     ->loginUser()
    //                     ->visit('/details/'.$video->more_details_code)
    //                     ->assertSee($video->title)
    //                     ->within(new FillFormDetails, function ($browser) {
    //                         $browser->enterTestData();
    //                     })
    //                     ->within(new FillFormDetails, function ($browser) {
    //                         $browser->executeUpload();
    //                     })
    //                     ->screenshot('success-'.$this->getName().'-'.time());
    //         }
    //     });
    // }
    //
    // public function testAdminVideoLicense() // Tests admin license pending video
    // {
    //     $this->browse(function ($browser) {
    //         $video = Video::where('state', 'pending')->where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('rights', 'ex')->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
    //         if(isset($video->id)) {
    //             $browser->on(new LoginPage)
    //                     ->loginUser()
    //                     ->visit('/admin/videos/pending')
    //                     ->resize(1560, 1000)
    //                     ->type('s', $video->alpha_id)
    //                     ->keys('#search-input', '{enter}')
    //                     ->assertVisible('#video-'.$video->alpha_id)
    //                     ->click("a[href='".url('/admin/videos/status/licensed/'.$video->alpha_id)."']")
    //                     ->pause(3000)
    //                     ->screenshot('success-'.$this->getName().'-'.time());
    //         }
    //     });
    // }
    //
    // public function testAdminVideoSearch() // Tests admin search video section
    // {
    //     $this->browse(function ($browser) {
    //         $browser->on(new LoginPage)
    //                 ->loginUser()
    //                 ->visit('/admin/videos/licensed')
    //                 ->assertSee('Licensed Videos')
    //                 ->type('s', 'Little kid shits himself')
    //                 ->keys('#search-input', '{enter}')
    //                 ->assertSee('Little kid shits himself')
    //                 ->resize(1560, 1000)
    //                 ->screenshot('success-'.$this->getName().'-'.time());
    //     });
    // }

    protected function tearDown() // Deletes test records and clears browser sessions/cookies from tests
    {
        $video = Video::where('title', 'LIKE', '%unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->forcedelete();

        session()->flush();

        parent::tearDown();

        foreach(static::$browsers as $browser) {
            $browser->driver->manage()->deleteAllCookies();
        }
    }

}
