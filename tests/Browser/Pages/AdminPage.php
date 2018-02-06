<?php

namespace Tests\Browser;

use App\User;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;

class AdminPage extends DuskTestCase
{
    /**
     *
     * @return void
     */

    public function testAdminPage()
    {
        $this->browse(function ($browser) {
            $browser->on(new LoginPage)
                    ->loginUser()
                    ->visit('/admin')
                    ->assertPathIs('/admin')
                    ->assertSee('Howdy, Mikewright');
        });
    }
}
