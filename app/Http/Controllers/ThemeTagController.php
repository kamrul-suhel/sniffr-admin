<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Tag;



class ThemeTagController extends Controller {

    public static $rules = array(
        // 'username' => 'required|unique:users',
        // 'email' => 'required|email|unique:users',
        // 'password' => 'required|confirmed'
    );

    public function __construct()
    {
        //$this->middleware('secure');
        // $settings = config('settings.site');
        // $this->videos_per_page = $settings->videos_per_page;
    }

    /**
     * Display the specified video.
     *
     * @param  int  $id
     * @return Response
     */
    public function index()
    {

        $tags = Tag::latest()->get()->pluck('name')->toJson();

        return response($tags, 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Content-Type', 'application/json');

    }

}
