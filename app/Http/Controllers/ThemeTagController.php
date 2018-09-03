<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Traits\FrontendResponse;

class ThemeTagController extends Controller
{
    use FrontendResponse;
    /**
     * @return mixed
     */
    public function index()
    {
        $data = [
            'tags' => Tag::latest()->get()->pluck('name','id')
        ];
        return $this->successResponse($data);
    }
}
