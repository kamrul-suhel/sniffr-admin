<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class FillFormUpload extends BaseComponent
{
    /**
     * Get the root selector for the component.
     *
     * @return string
     */
    public function selector()
    {
        return '#upload-form';
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
            '@full_name' => 'full_name',
            '@email' => 'email',
            '@title' => 'title',
            '@terms' => 'p.terms-copy',
        ];
    }

    public function enterTestData($browser, $title)
    {
        $title = 'TEST video '.$title.' from unit browser '.time();
        $browser->resize(1560, 1500)
                ->assertSee('Your Contact Details')
                ->type('@full_name', 'Mike Wright')
                ->type('@email', 'mike@unilad.co.uk')
                ->type('@title', $title);
    }

    public function executeUpload($browser)
    {
        $browser->click('@terms')
        ->press('Submit your video')
        ->waitForLocation('/thanks', 10);
    }
}
