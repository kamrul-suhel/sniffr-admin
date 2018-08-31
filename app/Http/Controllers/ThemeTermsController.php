<?php

namespace App\Http\Controllers;

use App\Traits\FrontendResponse;
use Illuminate\Http\Request;

class ThemeTermsController extends Controller
{
	use FrontendResponse;
    public function index(Request $request){

        return $this->getFrontendServerResponse($request);
    }
}
