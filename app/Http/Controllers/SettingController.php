<?php

namespace App\Http\Controllers;

use App\Tag;
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
        $settings['tags'] = Tag::latest()->get()->pluck('name');

        $user = auth()->user();
        if($user){
        	$user['client'] = $user->client;
		}
        $settings['sniffr_app']  = [
            "user" => ($user ? $user : "''"),
            "user_offers" => (auth()->user() ? auth()->user()->userOffers() : "")
        ];

        return $this->successResponse($settings);
    }
}
