<?php

namespace Tests\Browser\Pages;

use App\User;
use Laravel\Dusk\Browser;

class LoginClientPage extends Page
{

    public function url()
    {
        return '/login';
    }

    public function loginClientUser(Browser $browser)
    {
        $browser->loginAs(User::where('username', 'dailymail')->firstOrFail());
    }
}
