<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class QuoteTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
			$browser->visit('/videos');
			$browser->dump();
//			$browser->type('name', 'Name');
//			$browser->type('email', 'test@example.com');
//			$browser->type('phone', '07895123456');
//			$browser->type('company', 'Test Company');
//			$browser->type('notes', 'Some info');
//			$browser->press('REQUEST QUOTE');
        });
    }
}
