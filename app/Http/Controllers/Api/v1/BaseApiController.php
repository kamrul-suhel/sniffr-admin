<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use App\Http\Controllers\Controller;

class BaseApiController extends Controller
{
    use FrontendResponse;

    public function __construct()
    {
    }
}
