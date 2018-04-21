<?php

namespace App\Http\Controllers;

use App\Page;
use App\Menu;
use App\Video;
use App\VideoCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ThemeHomeController extends Controller
{

    public function __construct()
    {
    
    }

    public function index(Request $request)
    {

        if($request->ajax()){
            $data = [
                'videos' => Video::where('state', 'licensed')
                       ->orderBy('created_at', 'DESC')
                        ->limit(12)
                        ->get()
            ];
        }
		return view('frontend.master');
	}
}