<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testAdminCanLogin()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
				->type('email', 'ian@unilad.co.uk')
				->type('password', 'twatface')
				->press('Login')
				->assertPathIs('/admin');
        });
    }
}
