<?php

namespace App\Http\Controllers\Api\v1;

use App\Traits\FrontendResponse;

class SettingController extends BaseApiController
{
    use FrontendResponse;
    //
    public function index(){
        $settings['public'] = config('settings.public');
        $settings['pricing'] = config('pricing');
//        $settings['tags'] = Tag::latest()->get()->pluck('name');

        return $this->successResponse($settings);
    }
}
