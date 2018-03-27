<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\User;
use App\Post;
use App\Page;
use App\Menu;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;
use App\Libraries\ThemeHelper;
use Illuminate\Support\Facades\Input;

class ThemePostController extends Controller
{
    private $posts_per_page = 12;

    public function __construct()
    {
        $settings = Setting::first();
        $this->posts_per_page = $settings->posts_per_page;
    }

    /**
     * @param $slug
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show($slug)
    {
        $post = Post::where('slug', '=', $slug)->first();

        if ((!Auth::guest() && Auth::user()->role == 'admin') || $post->active) {
            $author = User::find($post->user_id);
            $data = [
                'post' => $post,
                'author' => $author,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'video_categories' => VideoCategory::all(),
                'post_categories' => PostCategory::all(),
                'theme_settings' => ThemeHelper::getThemeSettings(),
                'pages' => Page::where('active', '=', 1)->get(),
            ];
            return view('Theme::post', $data);
        }

        return Redirect::to('posts')->with(array('note' => 'Sorry, this post is no longer active.', 'note_type' => 'error'));
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $page = Input::get('page', 1);

        $data = [
            'posts' => Post::where('active', '=', '1')->orderBy('created_at', 'DESC')->simplePaginate($this->posts_per_page),
            'current_page' => $page,
            'page_title' => 'All Posts',
            'page_description' => 'Page ' . $page,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/posts',
            'video_categories' => VideoCategory::all(),
            'post_categories' => PostCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::post-list', $data);
    }

    /**
     * @param $category
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function category($category)
    {
        $page = Input::get('page', 1);

        $cat = PostCategory::where('slug', '=', $category)->first();
        $data = [
            'posts' => Post::where('active', '=', '1')->where('post_category_id', '=', $cat->id)->orderBy('created_at', 'DESC')->simplePaginate($this->posts_per_page),
            'current_page' => $page,
            'category' => $cat,
            'page_title' => 'Posts - ' . $cat->name,
            'page_description' => 'Page ' . $page,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/posts/category/' . $category,
            'video_categories' => VideoCategory::all(),
            'post_categories' => PostCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::post-list', $data);
    }
}