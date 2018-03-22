<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Page as BasePage;

abstract class Page extends BasePage
{
    public static function siteElements()
    {
        return [
            '@terms' => 'p.terms-copy',
        ];
    }
}
