<?php

namespace App\Http\Controllers\Api\v1;


class SettingController extends BaseApiController
{
    //
    public function index(){
        $settings['public'] = config('settings.public');
        $settings['pricing'] = config('pricing');
//        $settings['tags'] = Tag::latest()->get()->pluck('name');

        return $this->successResponse($settings);
    }
}
