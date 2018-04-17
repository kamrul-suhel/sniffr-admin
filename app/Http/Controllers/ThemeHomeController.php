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
    private $videos_per_page = 12;

    public function __construct()
    {
        $settings = config('settings.site');
        $this->videos_per_page = $settings['videos_per_page'];
    }

    public function index()
    {
        $total_video = Video::all()->count();

        $current_month_upload_video = Video::where('created_at', '>=', Carbon::now()->startOfMonth())->count();
        $active_video = Video::where('active', 1)->count();

        $data = [
            'total_video' => $total_video,
            'current_month_upload_video' => $current_month_upload_video,
            'active_video'  => $active_video,
            'videos' => Video::where('state', 'licensed')->orderBy('created_at', 'DESC')->simplePaginate($this->videos_per_page),
            'current_page' => 1,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos',
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

		return view('frontend.master',$data);
	}
}