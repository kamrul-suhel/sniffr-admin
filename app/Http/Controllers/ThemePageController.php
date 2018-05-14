<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\User;
use App\Page;
use App\Menu;
use App\VideoCategory;


class ThemePageController extends Controller
{
    /**
     * @param $slug
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function index($slug)
    {
        $page = Page::where('slug', '=', $slug)->first();

        if ((!Auth::guest() && Auth::user()->role == 'admin') || $page->active) {

            $author = User::find($page->user_id);
            $data = [
                'page' => $page,
                'author' => $author,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];
            return view('Theme::page', $data);
        }
        return Redirect::to('pages')->with(['note' => 'Sorry, this page is no longer active.', 'note_type' => 'error']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function pages()
    {
        $data = [
            'page_title' => 'Pages',
            'page_description' => 'All Pages',
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::page-list', $data);
    }
}