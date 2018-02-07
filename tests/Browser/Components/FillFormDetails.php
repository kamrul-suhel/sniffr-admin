<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class FillFormDetails extends BaseComponent
{
    /**
     * Get the root selector for the component.
     *
     * @return string
     */
    public function selector()
    {
        return '#details-form';
    }

    /**
     * Assert that the browser page contains the component.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Get the element shortcuts for the component.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@date_filmed' => 'date_filmed',
            '@location' => 'location',
            '@decription' => 'decription',
            '@terms' => 'p.terms-copy',
        ];
    }

    public function enterTestData($browser)
    {
        $title = 'TEST more details from unit browser '.time();
        $browser->resize(1560, 1500)
                ->type('@date_filmed', '01/01/2017')
                ->type('@location', 'London')
                ->type('@decription', 'Something');
    }

    public function executeUpload($browser)
    {
        $browser->click('@terms')
        ->press('Update Details')
        ->waitForLocation('/thanks', 10);
    }
}
