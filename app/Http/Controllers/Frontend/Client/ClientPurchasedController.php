<?php

namespace App\Http\Controllers\Frontend\Client;

use App\Http\Controllers\Controller;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;

class ClientPurchasedController extends Controller
{
	use FrontendResponse;
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
    	return $this->getFrontendServerResponse($request);
    }
}
