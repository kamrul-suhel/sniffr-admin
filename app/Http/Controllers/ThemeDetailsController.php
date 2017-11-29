<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Page;
use App\Menu;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\PostCategory;

use App\Mail\DetailsReview;
use App\Mail\DetailsThanks;

use App\Libraries\ImageHandler;
use App\Libraries\ThemeHelper;

class ThemeDetailsController extends Controller
{
    protected $rules = [
        // 'first_name' => 'required',
        // 'last_name' => 'required',
        // 'email' => 'required|email',
        // 'url' => 'required_without_all:url,file',
        // 'terms' => 'required'
    ];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $user = Auth::user();

        $this->data = array(
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'video_categories' => VideoCategory::all(),
            'post_categories' => PostCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        );
    }

    /**
     * Show the upload form
     *
     * @return \Illuminate\Http\Response
     */
    public function index($code)
    {
        $this->data['video'] = Video::where('more_details_code', $code)->first();

        return view('Theme::details', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request, $code)
    {
        $video = Video::where('more_details_code', $code)->first();

        $validator = Validator::make(Input::all(), $this->rules);

        $this->validate($request, $this->rules);

        if ($validator->fails()) {
            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        } else {
            $video->date_filmed = Input::get('date_filmed');
            $video->location = Input::get('location');
            $video->description = Input::get('description');
            $video->permission = Input::get('permission') == 'yes' ? 1 : 0;
            $video->submitted_elsewhere = Input::get('submitted_elsewhere') == 'yes' ? 1 : 0;
            $video->submitted_where = Input::get('submitted_where');
            $video->contact_is_owner = Input::get('contact_is_owner');
            $video->allow_publish = Input::get('allow_publish');
            $video->contact_is_owner = Input::get('contact_is_owner');
            $video->is_exclusive = Input::get('is_exclusive');
            $video->more_details = 1;
            $video->state = 'pending';
            $video->save();

            // Notification of new video
            Mail::to('submissions@unilad.co.uk')->send(new DetailsReview($video));

            // Send thanks notification
            Mail::to($video->contact->email)->send(new DetailsThanks($video));

            $this->data['video'] = $video;

            return view('Theme::details', $this->data);
        }
    }
}
