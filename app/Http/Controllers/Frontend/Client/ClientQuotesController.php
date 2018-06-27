<?php

namespace App\Http\Controllers\Frontend\Client;

use App\Http\Controllers\Controller;

class ClientQuotesController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
		return view('frontend.master');
    }
}
