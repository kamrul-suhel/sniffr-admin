<?php

namespace App\Http\Controllers;

use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    use FrontendResponse;
    //
    public function index(){
        $settings['public'] = config('settings.public');
        $settings['pricing'] = config('pricing');


        $settings['sniffr_app']  = [
            "user" => (Auth::user() ? Auth::user() : "''"),
            "user_offers" => (Auth::user() ? Auth::user()->userOffers() : "")
        ];

        return $this->successResponse($settings);
    }
}
