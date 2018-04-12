<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Page;
use App\Menu;
use App\Video;
use App\Contact;
use App\VideoCategory;

use App\Libraries\VideoHelper;
use App\Jobs\QueueEmail;
use App\Jobs\QueueVideo;
use App\Notifications\SubmissionNewNonEx;

class ThemeSubmissionController extends Controller {

    protected $rules = [
        'full_name' => 'required',
        'email' => 'required|email',
        'title' => 'required',
        'file' => 'file|mimes:ogg,mp4,qt,avi,wmv,m4v,mov,webm,3gpp,quicktime|min:1|max:500000',
        'terms' => 'required'
    ];

    public function __construct()
    {
        $user = Auth::user();

        $this->data = [
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => config('settings.theme'),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];
    }

    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function index()
    {
        return view('Theme::submission', $this->data);
    }

    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function form()
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'submission';

        return view('Theme::templates/iframe', $this->data);
    }

    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function thanks()
    {
        return view('Theme::thanks', $this->data);
    }

    /**
     * Store a newly created video in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        //increase memory limits and upload post size
        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '512M');
        ini_set('post_max_size', '512M');

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
            $contact->full_name = Input::get('full_name');
            $contact->email = Input::get('email');
            $contact->tel = Input::get('tel');
            $contact->save();
        }

        //add additional form data to db (with video file info)
        $video = new Video();
        $video->alpha_id = VideoHelper::quickRandom();
        $video->contact_id = $contact->id;
        $video->title = Input::get('title');

        //handle file upload to S3 and Youtube ingestion
        $fileSize = $filePath = '';
        if($request->hasFile('file')){
            $fileOriginalName = strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/','', pathinfo(Input::file('file')->getClientOriginalName(), PATHINFO_FILENAME)));

            $fileName = time().'-'.$fileOriginalName.'.'.$request->file->getClientOriginalExtension();

            $file = $request->file('file');
            $fileMimeType = $file->getMimeType();
            $fileSize = $file->getClientSize();

            // Upload to S3
            $t = Storage::disk('s3')->put($fileName, file_get_contents($file), 'public');
            $filePath = Storage::disk('s3')->url($fileName);

            $video->url = Input::get('url');
            $video->file = $filePath;
            $video->mime = $fileMimeType;
        }else{
            //Check link details
            $linkDetails = VideoHelper::videoLinkChecker(Input::get('url'));

            $video->youtube_id = $linkDetails['youtube_id'];
            $video->image = $linkDetails['image'];
            $video->thumb = $linkDetails['thumb'];
            $video->embed_code = $linkDetails['embed_code'];
            $video->url = $linkDetails['url'];
            $video->vertical = $linkDetails['vertical'];

            $filePath = $video->url;
        }

        $video->state = 'restricted';
        $video->rights = 'nonex';
        $video->referrer = Input::get('referrer');
        $video->notes = Input::get('notes');
        $video->credit = Input::get('credit');
        $video->source = Input::get('source');
        $video->save();

        // May also need to action Youtube upload (or at least action anaylsis bit from AdminVideoController) as we skip "accepted" state

        // Notification of new video
        if(env('APP_ENV') != 'local'){
            $video->notify(new SubmissionNewNonEx($video));
        }
        
        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'submission_thanks_nonex');

        if($request->hasFile('file')){
            // Send video to queue for watermarking
            QueueVideo::dispatch($video->id)
                ->delay(now()->addSeconds(5));
        }

        $iframe = Input::get('iframe') ? Input::get('iframe') : 'false';

        if($isJson) {
            return response()->json(['status' => 'success', 'iframe' => $iframe, 'href' => 'https://www.unilad.co.uk/submit/thanks', 'message' => 'Video Successfully Added!', 'files' => ['name' => Input::get('title'), 'size' => $fileSize, 'url' => $filePath]]);
        } else {
            if($iframe == 'true'){
                return Redirect::to('https://www.unilad.co.uk');
            }else{
                return view('Theme::thanks', $this->data)->with(array('note' => 'Video Successfully Added!', 'note_type' => 'success') );
            }
        }
    }
}
