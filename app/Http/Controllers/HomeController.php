<?php

namespace App\Http\Controllers;

use App\Video;

class HomeController extends Controller
{
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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $data = [
            'videos' => Video::where('state', 'licensed')
                ->orderBy('created_at', 'DESC')
                ->paginate($this->videos_per_page),
        ];

		return view('frontend.master',$data);
	}
}