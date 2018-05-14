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
        if ($request->ajax() || $request->isJson()) {
            $data = [
                'videos' => Video::where(function ($query) {
                    $query->where([['state', 'licensed'], ['active', 1], ['featured', 1]])
                        ->orWhere('state', 'licensed')->orderBy('licensed_at', 'DESC');
                })
                    ->orderBy('featured', 'DESC')
                    ->orderBy('licensed_at', 'DESC')
                    ->limit(12)
                    ->get()
            ];
            return $this->successResponse($data);
        }
		return view('frontend.master');
	}
}