<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
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
