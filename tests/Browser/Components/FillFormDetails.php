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
            '@description' => 'description',
            '@terms' => 'p.terms-copy',
            '@permission' => 'permission',
            '@submitted_elsewhere' => 'submitted_elsewhere',
            '@submitted_where' => 'submitted_where',
        ];
    }

    public function enterTestData($browser)
    {
        $title = 'TEST more details from unit browser '.time();
        $browser->resize(1560, 1800)
                ->script([
                    "document.querySelector('#date_filmed').value = '2018-01-01'"
                ]);
        $browser->type('@location', 'London')
                ->type('@description', 'Something')
                ->radio('@permission', 'yes')
                ->radio('@submitted_elsewhere', 'yes')
                ->type('@submitted_where', 'Buzzfeed');
    }

    public function executeUpload($browser)
    {
        $browser->click('@terms')
                ->script('$("p.terms-copy:eq(1)").click();'); //really annoying when checkboxes don't have different ids/names
        $browser->script('$("p.terms-copy:eq(2)").click();');
        $browser->press('Update Details')
                ->pause(3000)
                ->assertSee('Thanks for the extra info');
    }
}
