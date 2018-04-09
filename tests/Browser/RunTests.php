<?php

namespace Tests\Browser;

use App\User;
use App\Video;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\VideoUploadTests;
use Tests\Browser\VideoAdvancedTests;
use Tests\Browser\Pages\LoginPage;

class RunTests extends DuskTestCase
{
    public function test1() // Trying to work out how to run tests toegther (and return response => perhaps video_id)
    {

        $this->browse(function ($browser) {
            $browser->on(new LoginPage)
                    ->loginUser()
                    ->visit('/admin/videos/licensed')
                    ->assertSee('Licensed Videos')
                    ->type('s', 'Little kid shits himself')
                    ->keys('#search-input', '{enter}')
                    ->assertSee('Little kid shits himself')
                    ->resize(1560, 1000);
        });

        dd($this);
    }

}
