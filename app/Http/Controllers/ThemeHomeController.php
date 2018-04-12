<?php

namespace App\Http\Controllers;

use App\Page;
use App\Menu;
use App\Video;
use App\VideoCategory;

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
        $data = [
            'videos' => Video::where('state', 'licensed')->orderBy('created_at', 'DESC')->simplePaginate($this->videos_per_page),
            'current_page' => 1,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos',
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::home', $data);
    }
}