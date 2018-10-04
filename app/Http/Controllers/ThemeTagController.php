<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use App\Tag;

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
