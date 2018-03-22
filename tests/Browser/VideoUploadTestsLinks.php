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
    public function testYoutube() // youtube shortcode test #1
    {
        $this->browse(function ($browser) {
    
            $this->type = 'youtube shortcode';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://youtu.be/myXSBZ0tySI')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

            $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos')
                        ->resize(1560, 1000)
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                        ->assertDontSee('There appears to be an issue with this video')
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testFacebook() // facebook video test #2
    {
        $this->browse(function ($browser) {

            $this->type = 'facebook video';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://www.facebook.com/uniladmag/videos/vl.1619847288272558/4185599238129770/')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

            $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos')
                        ->resize(1560, 1000)
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                        ->assertDontSee('There appears to be an issue with this video')
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testFacebookPost() // facebook post test #3
    {
        $this->browse(function ($browser) {

            $this->type = 'facebook post';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://www.facebook.com/hykudesesto/posts/10155387354058261')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

            $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos')
                        ->resize(1560, 1000)
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                        ->assertDontSee('There appears to be an issue with this video')
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testInstagram() // instagram post test #4
    {
        $this->browse(function ($browser) {

            $this->type = 'instagram';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://www.instagram.com/p/BWkAsfyFZ7vlRjbeZuya-lJ4JtvNNmI99lc1jI0/')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

            $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
            if(isset($video->id)) {
                $browser->on(new LoginPage)
                        ->loginUser()
                        ->visit('/admin/videos')
                        ->resize(1560, 1000)
                        ->assertVisible('#video-'.$video->alpha_id)
                        ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                        ->assertDontSee('There appears to be an issue with this video')
                        ->screenshot('success-'.$this->getName().'-'.time());
            }
        });
    }

    public function testVimeo() // vimeo post test #5
    {
        $this->browse(function ($browser) {

            $this->type = 'vimeo';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://vimeo.com/channels/staffpicks/249675407')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

                $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
                if(isset($video->id)) {
                    $browser->on(new LoginPage)
                            ->loginUser()
                            ->visit('/admin/videos')
                            ->resize(1560, 1000)
                            ->assertVisible('#video-'.$video->alpha_id)
                            ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                            ->assertDontSee('There appears to be an issue with this video')
                            ->screenshot('success-'.$this->getName().'-'.time());
                }
        });
    }

    public function testTwitter() // twitter post test #6
    {
        $this->browse(function ($browser) {

            $this->type = 'twitter';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://twitter.com/UNILAD/status/962295094404509697')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

                $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
                if(isset($video->id)) {
                    $browser->on(new LoginPage)
                            ->loginUser()
                            ->visit('/admin/videos')
                            ->resize(1560, 1000)
                            ->assertVisible('#video-'.$video->alpha_id)
                            ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                            ->assertDontSee('There appears to be an issue with this video')
                            ->screenshot('success-'.$this->getName().'-'.time());
                }
        });
    }

    public function testFacebookBad() // facebook story bad link test #7
    {
        $this->browse(function ($browser) {

            $this->type = 'facebook story bad';

            $browser->visit('/upload')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->enterTestData('link '.$this->type);
                })
                ->type('url', 'https://m.facebook.com/story.php?story_fbid=1541399195938553&id=1095018027243341')
                ->within(new FillFormUpload, function ($browser) {
                    $browser->executeUpload();
                });

                $video = Video::where('state', 'new')->where('title', 'LIKE', '%'.$this->type.' from unit browser%')->where('contact_id', 1157)->where('deleted_at', NULL)->orderBy('created_at', 'desc')->first();
                if(isset($video->id)) {
                    $browser->on(new LoginPage)
                            ->loginUser()
                            ->visit('/admin/videos/new')
                            ->resize(1560, 1000)
                            ->assertVisible('#video-'.$video->alpha_id)
                            ->click("a[href='".url('/admin/videos/edit/'.$video->alpha_id)."']")
                            ->assertSee('There appears to be an issue with this video')
                            ->screenshot('success-'.$this->getName().'-'.time());

                    $video2 = Video::where('id', $video->id)->update(['state' => 'problem']);
                    if($video2==1) {
                        $browser->on(new LoginPage)
                                ->loginClientUser()
                                ->visit('/client/videos')
                                ->resize(1560, 1000)
                                ->type('s', $video->alpha_id)
                                ->keys('#search-input', '{enter}')
                                ->assertDontSee('There appears to be an issue with this video')
                                ->screenshot('success-'.$this->getName().'-'.time());
                    }
                }
        });
    }

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
