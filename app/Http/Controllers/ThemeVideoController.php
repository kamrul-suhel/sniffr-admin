<?php

namespace App\Http\Controllers;

use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Auth;
use Redirect;
use App\Tag;
use App\Page;
use App\Menu;
use App\Video;
use App\VideoTag;
use App\Setting;
use App\VideoCategory;

use App\Libraries\ThemeHelper;

class ThemeVideoController extends Controller {
    use VideoHelper;

    private $videos_per_page = 24;
    private $settings;

    public function __construct()
    {
        $this->settings = Setting::first();
        $this->videos_per_page = $this->settings->videos_per_page;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request, $id)
    {
        if(Auth::guest()){
            $video = Video::where('state', 'licensed')->with('tags')->orderBy('licensed_at', 'DESC')->where('alpha_id', $id)->first();
        }else{
            $video = Video::with('tags')->where('alpha_id', $id)->first();
        }

        //Make sure video is active
        if((!Auth::guest() && Auth::user()->role == 'admin') || $video->state == 'licensed'){
            $favorited = false;
            // if(!Auth::guest()):
            //     $favorited = Favorite::where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video->id)->first();
            // endif;

            $downloaded = false;
            // if(!Auth::guest()):
            //     $downloaded = Download::where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video->id)->count();
            // endif;

            $view_increment = $this->handleViewCount($id);
            $iframe = $this->getVideoHtml($video, true);

            $data = array(
                'video' => $video,
                'iframe' => $iframe,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'view_increment' => $view_increment,
                'favorited' => $favorited,
                'downloaded' => $downloaded,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => ThemeHelper::getThemeSettings(),
                'pages' => Page::where('active', '=', 1)->get(),
                'settings'  => $this->settings
                );
//            return view('Theme::video', $data);
//            return view('Theme::video', $data);
            if($request->ajax()){
                return $data;
            }else{
                return view('frontend.pages.videos.video_detail', $data);
            }

        } else {
            if($request->ajax()){
                return response(['note' => 'Sorry, this video is no longer active.', 'note_type' => 'error']);
            }
            return Redirect::to('videos')->with(array('note' => 'Sorry, this video is no longer active.', 'note_type' => 'error'));
        }
    }

    public function cachedIndex()
    {
        $video = new Video;
        $menu = new Menu;
        $page = Input::get('page', 1);
        $videos = $video->getCachedVideosLicensedPaginated($this->videos_per_page, $page);

        $data = [
            'videos' => $videos,
            'page_title' => 'All Videos',
            'page_description' => 'Page ' . $page,
            'current_page' => $page,
            'menu' => $menu->orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos',
            'video_categories' => VideoCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => (new Page)->where('active', '=', 1)->get(),
        ];
        return view('Theme::video-list', $data);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show($id)
    {
        $video = (new \App\Video)->where('state', 'licensed')
            ->with('tags')
            ->orderBy('licensed_at', 'DESC')
            ->where('alpha_id', $id)
            ->first();

        //Make sure video is active
        if((!Auth::guest() && Auth::user()->role == 'admin') || $video->state == 'licensed'){
            $favorited = false;
            // if(!Auth::guest()):
            //     $favorited = Favorite::where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video->id)->first();
            // endif;

            $downloaded = false;
            // if(!Auth::guest()):
            //     $downloaded = Download::where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video->id)->count();
            // endif;

            $view_increment = $this->handleViewCount($id);

            $data = array(
                'video' => $video,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'view_increment' => $view_increment,
                'favorited' => $favorited,
                'downloaded' => $downloaded,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => ThemeHelper::getThemeSettings(),
                'pages' => Page::where('active', '=', 1)->get(),
            );
            return view('Theme::video', $data);

        } else {
            return Redirect::to('videos')->with(array('note' => 'Sorry, this video is no longer active.', 'note_type' => 'error'));
        }
    }

    /*
     * Page That shows the latest video list
     *
     */
    public function videos(Request $request)
    {
        $page = Input::get('page');
        if( !empty($page) ){
            $page = Input::get('page');
        } else {
            $page = 1;
        }

        $videos = Video::where('state', 'licensed')->orderBy('id', 'DESC')->paginate($this->videos_per_page);

        $data = array(
            'videos' => $videos,
            'page_title' => 'All Videos',
            'page_description' => 'Page ' . $page,
            'current_page' => $page,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos',
            'video_categories' => VideoCategory::all(),
            'post_categories' => PostCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
            );

        if($request->ajax()){
            return $data;
        }

        return view('frontend.pages.videos.videos', $data);
    }


    public function tag(Request $request, $tag)
    {
        $page = Input::get('page');
        if( !empty($page) ){
            $page = Input::get('page');
        } else {
            $page = 1;
        }

        if(!isset($tag)){
            return Redirect::to('videos');
        }

        $tag_name = $tag;

        $tag = Tag::where('name', '=', $tag)->first();

        $tags = VideoTag::where('tag_id', '=', $tag->id)->get();

        $tag_array = array();
        foreach($tags as $key => $tag){
            array_push($tag_array, $tag->video_id);
        }

        $videos = Video::where('state', 'licensed')->whereIn('id', $tag_array)->paginate($this->videos_per_page);

        $data = array(
            'videos' => $videos,
            'current_page' => $page,
            'page_title' => 'Videos tagged with "' . $tag_name . '"',
            'page_description' => 'Page ' . $page,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos/tags/' . $tag_name,
            'video_categories' => VideoCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
            );

        if($request->ajax()){
            return response($data);
        }else{
            return view('frontend.pages.videos.video_tag', $data);
        }
    }

    public function category($category)
    {
        $page = Input::get('page');
        if( !empty($page) ){
            $page = Input::get('page');
        } else {
            $page = 1;
        }

        $cat = VideoCategory::where('slug', '=', $category)->first();

        $parent_cat = VideoCategory::where('parent_id', '=', $cat->id)->first();

        if(!empty($parent_cat->id)){
            $parent_cat2 = VideoCategory::where('parent_id', '=', $parent_cat->id)->first();
            if(!empty($parent_cat2->id)){
                $videos = Video::where('state', 'licensed')->where('video_category_id', '=', $cat->id)->orWhere('video_category_id', '=', $parent_cat->id)->orWhere('video_category_id', '=', $parent_cat2->id)->orderBy('licensed_at', 'DESC')->simplePaginate(9);
            } else {
                $videos = Video::where('state', 'licensed')->where('video_category_id', '=', $cat->id)->orWhere('video_category_id', '=', $parent_cat->id)->orderBy('licensed_at', 'DESC')->simplePaginate(9);
            }
        } else {
            $videos = Video::where('state', 'licensed')->where('video_category_id', '=', $cat->id)->orderBy('licensed_at', 'DESC')->simplePaginate(9);
        }


        $data = array(
            'videos' => $videos,
            'current_page' => $page,
            'category' => $cat,
            'page_title' => 'Videos - ' . $cat->name,
            'page_description' => 'Page ' . $page,
            'pagination_url' => '/videos/category/' . $category,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
        );

        return view('Theme::video-list', $data);
    }

    public function handleViewCount($id){
        // check if this key already exists in the view_media session
        $blank_array = array();
        if (! array_key_exists($id, session('viewed_video', $blank_array) ) ) {

            try{
                // increment view
                $video = Video::where('alpha_id', $id)->first();
                $video->views = $video->views + 1;
                $video->save();
                // Add key to the view_media session
                session('viewed_video.'.$id);
                return true;
            } catch (Exception $e){
                return false;
            }
        } else {
            return false;
        }
    }

}
