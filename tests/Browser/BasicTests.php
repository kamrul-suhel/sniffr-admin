<?php

namespace Tests\Browser;

use App\User;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;

class BasicTests extends DuskTestCase
{
    public function testLoginPageExists()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                    ->assertSee('Please Login');
        });
    }
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

    // public function testUploadVideoLink() // Tests upload form for video link
    // {
    //     $this->browse(function ($browser) {
    //         $browser->visit('/upload')
    //         ->resize(1560, 1500)
    //                 ->assertSee('Your Contact Details')
    //                 ->type('full_name', 'Mike Wright')
    //                 ->type('email', 'mike@unilad.co.uk')
    //                 ->type('temp-tel', '07782497004')
    //                 ->type('title', 'TEST video link from unit browser '.time())
    //                 ->type('url', 'https://www.youtube.com/watch?v=qRHPA3LawQI')
    //                 ->click('p.terms-copy')
    //                 ->press('Submit your video')
    //                 ->assertSee('just uploading your awesome video')
    //                 ->waitForLocation('/thanks', 10)
    //                 // ->waitForText('Thanks for the video', 10)
    //                 ->screenshot('success-uploadlink-'.$this->getName().'-'.time());
    //     });
    // }

    // public function testUploadVideoFile() // Tests upload form for video file
    // {
    //     $this->browse(function ($browser) {
    //         $browser->visit('/upload')
    //         ->resize(1560, 1500)
    //                 ->assertSee('Your Contact Details')
    //                 ->type('full_name', 'Mike Wright')
    //                 ->type('email', 'mike@unilad.co.uk')
    //                 ->type('temp-tel', '07782497004')
    //                 ->type('title', 'TEST video file from unit browser '.time())
    //                 ->attach('file', public_path('/assets/unit_test_assets/test_small.mp4'))
    //                 ->click('p.terms-copy')
    //                 ->press('Submit your video')
    //                 ->assertSee('just uploading your awesome video')
    //                 ->waitForLocation('/thanks', 10)
    //                 // ->waitForText('Thanks for the video', 10)
    //                 ->screenshot('success-uploadvideo-'.$this->getName().'-'.time());
    //     });
    // }

    // public function testSubmissionVideoLink() // Tests non exclusive submission form for video link
    // {
    //     $this->browse(function ($browser) {
    //         $browser->visit('/submission')
    //         ->resize(1560, 1500)
    //                 ->assertSee('Your Contact Details')
    //                 ->type('full_name', 'Mike Wright')
    //                 ->type('email', 'mike@unilad.co.uk')
    //                 ->type('title', 'TEST non-ex video link from unit browser '.time())
    //                 ->type('url', 'https://www.youtube.com/watch?v=qRHPA3LawQI')
    //                 ->type('notes', 'something')
    //                 ->type('credit', 'www.unilad.co.uk')
    //                 ->type('referrer', 'Adam')
    //                 ->click('p.terms-copy')
    //                 ->press('Submit your video')
    //                 ->assertSee('just uploading your awesome video')
    //                 ->waitForLocation('/thanks', 10)
    //                 // ->waitForText('Thanks for the video', 10)
    //                 ->screenshot('success-submissionlink-'.$this->getName().'-'.time());
    //     });
    // }

    public function testSubmissionVideoFile() // Tests non exclusive submission form for video file
    {
        $this->browse(function ($browser) {
            $browser->visit('/submission')
            ->resize(1560, 1500)
                    ->assertSee('Your Contact Details')
                    ->type('full_name', 'Mike Wright')
                    ->type('email', 'mike@unilad.co.uk')
                    ->type('title', 'TEST non-ex video file from unit browser '.time())
                    ->attach('file', public_path('/assets/unit_test_assets/test_small.mp4'))
                    ->type('notes', 'something')
                    ->type('credit', 'www.unilad.co.uk')
                    ->type('referrer', 'Adam')
                    ->click('p.terms-copy')
                    ->press('Submit your video')
                    ->assertSee('just uploading your awesome video')
                    ->waitForLocation('/thanks', 10)
                    // ->waitForText('Thanks for the video', 10)
                    ->screenshot('success-submissionfile-'.$this->getName().'-'.time());
        });
    }

    // public function testAdminLogin() // Tests login using Admin user
    // {
    //     $this->browse(function ($browser) {
    //         $browser->on(new LoginPage)
    //                 ->loginUser()
    //                 ->visit('/admin')
    //                 ->assertPathIs('/admin')
    //                 ->assertSee('Howdy, Mikewright');
    //     });
    // }
    //
    // public function testAdminVideosLicensed() // Tests admin video section
    // {
    //     $this->browse(function ($browser) {
    //         $browser->visit('/admin/videos/licensed')
    //                 ->assertSee('Licensed Videos')
    //                 ->type('s', 'Little kid shits himself')
    //                 ->keys('#search-input', '{enter}')
    //                 ->assertSee('Little kid shits himself')
    //                 ->resize(1560, 1000)
    //                 ->screenshot('success-loginadmin-'.$this->getName().'-'.time());
    //     });
    // }

}
