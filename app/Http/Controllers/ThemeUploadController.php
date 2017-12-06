<?php

namespace App\Http\Controllers;

use View;
use Auth;
use MyYoutube;
use Redirect;
use Validator;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Tag;
use App\Page;
use App\Menu;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ImageHandler;
use App\Libraries\ThemeHelper;

use App\Mail\SubmissionNew;
use App\Mail\SubmissionThanks;

class ThemeUploadController extends Controller {

    protected $rules = [
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required|email',
        // 'url' => 'required_without_all:url,file',
        'file' => 'mimes:flv,ogg,mp4,qt,avi,wmv,m4v,webm|max:200000',
        // 'terms' => 'required'
    ];

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
     * Display a listing of videos
     *
     * @return Response
     */
    public function index()
    {
        return view('Theme::upload', $this->data);
    }

    /**
     * Store a newly created video in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $isJson = $request->ajax();

        //validate the request
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails())
        {
            if($isJson) {
                return response()->json(['status' => 'error']);
            } else {
                return Redirect::back()
                    ->withErrors($validator)
                    ->withInput();
            }
        }

        //get additional form data
        $contact = Contact::where('email',Input::get('email'))->first();
        //if contact exists
        if(!$contact){
            $contact = new Contact();
            $contact->first_name = Input::get('first_name');
            $contact->last_name = Input::get('last_name');
            $contact->email = Input::get('email');
            $contact->save();
        }

        //handle file upload to S3 and Youtube ingestion
        $filePath = $fileMimeType = $youtubeId = '';
        if($request->hasFile('file')){

            $fileOriginalName = pathinfo(Input::file('file')->getClientOriginalName(), PATHINFO_FILENAME);

            $fileName = time().'-'.$fileOriginalName.'.'.$request->file->getClientOriginalExtension();

            $file = $request->file('file');
            $fileMimeType = $file->getMimeType();
            $fileSize = $file->getClientSize();

            // Upload to S3
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $filePath = Storage::disk('s3')->url($fileName);

            // Upload it to youtube!!! ??
            $video = MyYoutube::upload($file, ['title' => Input::get('title')], 'unlisted');
            $youtubeId  = $video->getVideoId();
        }else{
            if($isJson) {
              return response()->json(['status' => 'fail', 'message' => 'Video Successfully Added!', 'files' => ['name' => Input::get('title'), 'size' => $fileSize, 'url' => $filePath]]);
            } else {
              return Redirect::back()
                ->withErrors(array('message' => 'There was a problem uploading the file.'))
                ->withInput();
            }
        }

        //add additional form data to db (with video file info)
        $video = new Video();
        $video->contact_id = $contact->id;
        $video->title = Input::get('title');
        $video->url = Input::get('url');
        $video->file = $filePath;
        $video->youtube_id = $youtubeId;
        $video->mime = $fileMimeType;
        $video->state = 'new';
        $video->save();

        // Add Email notifications
        // Notification of new video
        Mail::to('submissions@unilad.co.uk')->send(new SubmissionNew($video));

        // Send thanks notification
        Mail::to($contact->email)->send(new SubmissionThanks($video));

        //dd($request);

        if($isJson) {
            return response()->json(['status' => 'success', 'message' => 'Video Successfully Added!', 'files' => ['name' => Input::get('title'), 'size' => $fileSize, 'url' => $filePath]]);
        } else {
            return view('Theme::thanks', $this->data)->with(array('note' => 'Video Successfully Added!', 'note_type' => 'success') );
        }
    }
}
