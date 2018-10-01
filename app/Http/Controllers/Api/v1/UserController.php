<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends BaseApiController
{
    /**
     * @var
     */
    private $user;

    /**
     * UserController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->user = $request->user('api') ? $request->user('api') : auth()->user();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if ($this->user) {
            $this->user['client'] = $this->user->client;
        }

        $settings['sniffr_app'] = [
            "user" => ($this->user ? $this->user : "''"),
            "user_offers" => ($this->user ? $this->user->userOffers() : "")
        ];
        return $this->successResponse($settings);
    }

    /**
     * @return mixed
     */
    public function getAccessTokenId (){
        $accessTokens = DB::table('oauth_access_tokens')->where('id', $this->user->token()->id)->get();
        return $this->successResponse($accessTokens);
    }


    /**
     * @return mixed
     */
    public function destroyAccessTokenId (){
        $accessTokens = DB::table('oauth_access_tokens')->where('id', $this->user->token()->id)->get();

        if($accessTokens){
            DB::table('oauth_access_tokens')->where('id', $this->user->token()->id)->delete();
        }

        return $this->successResponse($accessTokens);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthUserForAdmin(){
        $user = [];
        if (auth()->user()) {
            $user['client'] = auth()->user()->client;
        }

        $user['sniffr_app'] = [
            "user" => (auth()->user() ? auth()->user() : "''")
        ];
        return $this->successResponse($user);
    }
}
