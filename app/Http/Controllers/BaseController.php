<?php

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    /**
     * @var string
     */
    private $layout;

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if (!is_null($this->layout)) {
            $this->layout = view($this->layout);
        }
    }
}