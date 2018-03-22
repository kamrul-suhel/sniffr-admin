<?php

namespace App\Libraries\Facades;

use Illuminate\Support\Facades\Facade;

class MyYoutube extends Facade {
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'myyoutube';
    }
}