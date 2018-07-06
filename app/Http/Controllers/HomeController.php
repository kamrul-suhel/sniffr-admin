<?php

namespace App\Http\Controllers;

use App\Traits\FrontendResponse;
use App\Video;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    use FrontendResponse;

    /**
     * @var int
     */
    private $videos_per_page;

    /**
     * HomeController constructor.
     */
    public function __construct()
    {
        $this->videos_per_page = config('settings.site.videos_per_page');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
		return view('frontend.master');
	}
}