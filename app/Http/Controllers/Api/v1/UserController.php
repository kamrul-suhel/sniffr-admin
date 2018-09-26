<?php

namespace App\Http\Controllers\Api\v1;

use App\Traits\FrontendResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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
            "user_offers" => ($user ? $user->userOffers() : "")
        ];
        return $this->successResponse($settings);
    }

    public function getAccessTokenId (){
        $user = auth()->user();
        $accessTokens = DB::table('oauth_access_tokens')->where('id', $user->token()->id)->get();
        return $this->successResponse($accessTokens);
    }

    public function destroyAccessTokenId (){
        $user = auth()->user();
        $accessTokens = DB::table('oauth_access_tokens')->where('id', $user->token()->id)->get();

        if($accessTokens){
            DB::table('oauth_access_tokens')->where('id', $user->token()->id)->delete();
        }

        return $this->successResponse($accessTokens);
    }
}
