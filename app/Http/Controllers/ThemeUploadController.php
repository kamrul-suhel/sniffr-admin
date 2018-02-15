<?php

namespace App\Http\Controllers;

use View;
use Auth;
use MyYoutube;
use Redirect;
use Validator;
use Carbon\Carbon;

use FFMpeg;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Tag;
use App\Page;
use App\Menu;
use App\User;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ImageHandler;
use App\Libraries\ThemeHelper;
use App\Libraries\VideoHelper;

use App\Jobs\QueueEmail;
use App\Jobs\QueueVideo;
use App\Notifications\SubmissionNew;
use App\Notifications\SubmissionAlert;

class ThemeUploadController extends Controller {

    protected $rules = [
        'alpha_id' => 'unique',
        'full_name' => 'required',
        'email' => 'required|email',
        'title' => 'required',
        // 'url' => 'required_without_all:url,file',
        'file' => 'file|mimes:ogg,mp4,qt,avi,wmv,m4v,mov,webm,3gpp,quicktime|min:1|max:500000',
        'terms' => 'required'
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
     * Returns the form with no page wrapper
     *
     * @return Response
     */
    public function form()
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'details';

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
        // ini_set('max_input_time', 1800);
        // ini_set('memory_limit', '1000M');
        // ini_set('max_input_vars', 1800);
        // ini_set('max_input_vars', 1800);
        // ini_set('max_allowed_packet', '1000M');

        $isJson = $request->ajax();

        //validate the request
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails())
        {
            $file_temp = $request->file('file');
            $mime_temp = $file_temp->getMimeType();
            if($isJson) {
                return response()->json(['status' => 'error, file did not pass validation check '.$mime_temp]);
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

        $video->state = 'new';
        $video->rights = 'ex';
        $video->source = Input::get('source');
        $video->save();

        // Slack notifications
        $video->notify(new SubmissionNew($video));

        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'submission_thanks');

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

    public function issueAlert() {
        $alert = 'File: '.Input::get('file').',
        Line: '.Input::get('line').',
        Message: '.Input::get('message');
        // Slack notifications
        $user = new User();
        $user->notify(new SubmissionAlert($alert));
        //return success
        return response()->json(['status' => 'success', 'message' => 'Successfully sent alert']);
    }
}
