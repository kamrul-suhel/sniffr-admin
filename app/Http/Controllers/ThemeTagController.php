<?php

namespace App\Http\Controllers;

use App\Tag;

class ThemeTagController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        $tags = Tag::latest()->get()->pluck('name')->toJson();

        return response($tags, 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Content-Type', 'application/json');
    }
}
