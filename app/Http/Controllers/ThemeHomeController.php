<?php

namespace App\Http\Controllers;

use App\Page;
use App\Menu;
use App\Video;
use App\VideoCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Traits\FrontendResponder;

class ThemeHomeController extends Controller
{
    use FrontendResponder;

    public function __construct()
    {
    
    }

    public function index(Request $request)
    {

        if($request->ajax()){
            $data = [
                'videos' => Video::where('state', 'licensed')
                       ->orderBy('id', 'DESC')
                        ->limit(12)
                        ->get()
            ];

            return $this->successResponse($data);
        }
		return view('frontend.master');
	}
}