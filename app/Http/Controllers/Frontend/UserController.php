<?php

namespace App\Http\Controllers\Frontend;

use App\Traits\FrontendResponse;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    use FrontendResponse;

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();
        if ($user) {
            $user['client'] = $user->client;
        }
        $settings['sniffr_app'] = [
            "user" => ($user ? $user : "''"),
            "user_offers" => (auth()->user() ? auth()->user()->userOffers() : "")
        ];
        return $this->successResponse($settings);
    }
}
