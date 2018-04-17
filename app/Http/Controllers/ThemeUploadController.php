<?php

namespace App\Http\Controllers;

use App\Libraries\EmailVerifyHelper;
use App\Setting;
use App\Traits\FrontendResponser;
use Aws\S3\S3Client;
use View;
use Auth;
use Redirect;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Page;
use App\Menu;
use App\User;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\Libraries\ThemeHelper;
use App\Libraries\VideoHelper;
use App\Jobs\QueueEmail;
use App\Jobs\QueueVideo;
use App\Notifications\SubmissionNew;
use App\Notifications\SubmissionAlert;

class ThemeUploadController extends Controller
{

    use FrontendResponser;

    protected $rules = [
        'alpha_id' => 'unique',
        'full_name' => 'required',
        'email' => 'required|email',
        'title' => 'required',
        'file' => 'file|mimes:ogg,mp4,qt,avi,wmv,m4v,mov,webm,3gpp,quicktime|min:1|max:500000',
        'terms' => 'required'
    ];

    public function __construct()
    {
        $user = Auth::user();
        $settings = Setting::first();

        $this->data = [
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
            'settings'  => $settings
        ];
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('frontend.master', $this->data);
    }

    /**
     * Returns the form with no page wrapper
     *
     * @return Response
     */
    public function form()
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'upload';

        return view('frontend.iframe', $this->data);
    }

    /**
     * Display a listing of videos
     *
     * @return Response
     */
    public function thanks()
    {
        return view('frontend.pages.upload_video.thanks', $this->data);
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

        $isJson = $request->ajax() || $request->isJson();

        //validate the request
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails())
        {
            $mime_temp = '';

            $file_temp = $request->file('file');
            if ($file_temp) {
                $mime_temp = $file_temp->getMimeType();
            }

            if($isJson) {
                return $validator->errors();
                return $this->errorResponse('error, file did not pass validation check ');
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
        $video->title = Input::get('title', 'Untitled '.$video->alpha_id);


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
            //$video->youtube_time = $linkDetails['youtube_time'];
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
        $video->ip = $request->ip(); //$_SERVER["HTTP_CF_CONNECTING_IP"]
        $video->user_agent = $request->header('User-Agent');
        $video->save();


        // Slack notifications
        if(env('APP_ENV') != 'local'){
            $video->notify(new SubmissionNew($video));
        }
        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'submission_thanks');

        if($request->hasFile('file')){
            // Send video to queue for watermarking
            QueueVideo::dispatch($video->id)
                ->delay(now()->addSeconds(5));
        }

        $iframe = Input::get('iframe') ? Input::get('iframe') : 'false';
        if($isJson) {
            $data = [
                'status' => 'success',
                'iframe' => $iframe,
                'href' => 'https://www.unilad.co.uk/submit/thanks',
                'message' => 'Video Successfully Added!',
                'files' => ['name' => Input::get('title'),
                    'size' => $fileSize,
                    'url' => $filePath]
            ];
            return $this->successResponse($data);
        } else {
            if($iframe == 'true'){
                return Redirect::to('https://www.unilad.co.uk');
            }else{
                return view('Theme::thanks', $this->data)->with(array('note' => 'Video Successfully Added!', 'note_type' => 'success') );
            }
        }
    }

    public function issueAlert(Request $request) {
        $alert = 'File: '.Input::get('file').',
        Line: '.Input::get('line').',
        Message: '.Input::get('message').',
        Exception: '.Input::get('exception').',
        Title: '.Input::get('user_title').',
        Email: '.Input::get('user_email').',
        File: '.Input::get('user_file').',
        Url: '.Input::get('user_url').',
        UserAgent: '.$_SERVER['HTTP_USER_AGENT'].'';
        //$all = Input::all();
        // Slack notifications
        $user = new User();
        $user->notify(new SubmissionAlert($alert));
        //return success
        return response()->json(['status' => 'success', 'message' => 'Successfully sent alert']);
    }

    public function videoCheck(Request $request) {
        $postHeader = $request->header('x-amz-sns-message-type');
        if($postHeader) {
            $postBody = $request->file();
            $postBody = array_values($postBody)[0];
            $postFile = file_get_contents($postBody->getRealPath());
            $postFile = preg_replace('!\\r?\\n!', '', $postFile);
            $postFile = str_replace('(', '{', $postFile);
            $postFile = str_replace(')', '}', $postFile);
            $postFile = json_decode($postFile);

            // echo $postFile->jobId.'<br />';
            // echo $postFile->input->key.'<br />';
            // echo $postFile->outputs->key.'<br />';
            // echo $postFile->outputs->duration.'<br />';

            $youtube_ingest = false;
            if($postFile->jobId){
                $user = new User();
                $user->notify(new SubmissionAlert('watermark test '.$postHeader.' (jobId: '.$postFile->jobId.', input: '.$postFile->input->key.', output: '.$postFile->outputs->key.')'));
            }
        }

        response()->json(['jobId' => $postFile->jobId, 'input' => $postFile->input->key, 'output' => $postFile->outputs->key, 'duration' => $postFile->outputs->duration]);
    }
}
