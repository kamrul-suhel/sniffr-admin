<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array
     */
    protected $proxies = ['10.0.1.32', '10.0.1.179'];

    /**
     * The current proxy header mappings.
     *
     * @var array
     */
	protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
