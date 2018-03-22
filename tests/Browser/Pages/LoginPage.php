<?php

namespace Tests\Browser\Pages;

use App\User;
use Laravel\Dusk\Browser;

class LoginPage extends Page
{

    public function url()
    {
        return '/login';
    }

    public function loginUser(Browser $browser)
    {
        $browser->loginAs(User::where('email', 'mike@unilad.co.uk')->firstOrFail());
    }

    public function loginClientUser(Browser $browser)
    {
        $browser->loginAs(User::where('username', 'dailymail')->firstOrFail());
    }
}
