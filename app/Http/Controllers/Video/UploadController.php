<?php

namespace App\Http\Controllers\Video;

use App\Http\Controllers\Controller;
use App\Http\Requests\Video\CreateVideoRequest;
use App\Services\VideoService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use App\Page;
use App\Menu;
use App\User;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\Libraries\ThemeHelper;
use App\Libraries\VideoHelper;
use App\Jobs\QueueEmail;
use App\Notifications\SubmissionNew;
use App\Notifications\SubmissionAlert;

class UploadController extends Controller
{
    const HOME_URL = 'https://www.unilad.co.uk';
    const THANKS_URL = 'https://www.unilad.co.uk/submit/thanks';

    /**
     * @var VideoService
     */
    private $videoService;

    /**
     * @var []
     */
    private $data;

    /**
     * UploadController constructor.
     * @param \App\Services\VideoService $videoService
     */
    public function __construct(VideoService $videoService)
    {
        $user = Auth::user();

        $this->data = [
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];
        $this->videoService = $videoService;
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
        $this->data['form'] = 'upload';

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
     * @param CreateVideoRequest $request
     * @return $this|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(CreateVideoRequest $request)
    {
        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '512M');
        ini_set('post_max_size', '512M');

        // TODO remove when frontend 3 is completed?
        $isJson = $request->ajax() || $request->isJson();

        //save Contact
        $contact = Contact::where('email', Input::get('email'))->first();

        if (!$contact) {
            $contact = new Contact();
            $contact->full_name = Input::get('full_name');
            $contact->email = Input::get('email');
            $contact->tel = Input::get('tel');
            $contact->save();
        }

        // save Video
        $video = new Video();
        $video->alpha_id = VideoHelper::quickRandom();
        $video->contact_id = $contact->id;
        $video->title = Input::get('title', 'Untitled ' . $video->alpha_id);
        $video->state = 'new';
        $video->rights = 'ex';
        $video->source = Input::get('source');
        $video->ip = $request->ip();
        $video->user_agent = $request->header('User-Agent');
        $video->save();

        $fileSize = $filePath = '';

        //handle file upload to S3 and Youtube ingestion
        $filePath = $request->hasFile('file')
            ? $this->videoService->saveUploadedVideoFile($video, $request->file)
            : $this->videoService->saveVideoLink($video, Input::get('url'));

        // Slack notification
        if (env('APP_ENV') != 'local') {
            $video->notify(new SubmissionNew($video));
        }

        // thanks notification email
        QueueEmail::dispatch($video->id, 'submission_thanks');

        //TODO remove when frontend 3 is completed?
        $iFrame = Input::get('iframe', 'false');
        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'iframe' => $iFrame,
                'href' => self::THANKS_URL,
                'message' => 'Video Successfully Added!',
                'files' => [
                    'name' => Input::get('title'),
                    'size' => $fileSize,
                    'url' => $filePath
                ]
            ]);
        }

        if ($iFrame == 'true') {
            return Redirect::to(self::HOME_URL);
        }

        //TODO remove when frontend 3 is completed
        return view('Theme::thanks', $this->data)->with([
            'note' => 'Video Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
    /**
     * TODO: Finish it or delete it
     *
     * @codeCoverageIgnore
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueAlert(Request $request)
    {
        $alert = 'File: ' . Input::get('file') . ',
        Line: ' . Input::get('line') . ',
        Message: ' . Input::get('message') . ',
        Exception: ' . Input::get('exception') . ',
        Title: ' . Input::get('user_title') . ',
        Email: ' . Input::get('user_email') . ',
        File: ' . Input::get('user_file') . ',
        Url: ' . Input::get('user_url') . ',
        UserAgent: ' . $_SERVER['HTTP_USER_AGENT'] . '';
        $user = new User();
        $user->notify(new SubmissionAlert($alert));
        return response()->json(['status' => 'success', 'message' => 'Successfully sent alert']);
    }

    /**
     * TODO: Finish it or delete it
     *
     * @codeCoverageIgnore
     * @param Request $request
     */
    public function videoCheck(Request $request)
    {
        $postHeader = $request->header('x-amz-sns-message-type');
        if ($postHeader) {
            $postBody = $request->file();
            $postBody = array_values($postBody)[0];
            $postFile = file_get_contents($postBody->getRealPath());
            $postFile = preg_replace('!\\r?\\n!', '', $postFile);
            $postFile = str_replace('(', '{', $postFile);
            $postFile = str_replace(')', '}', $postFile);
            $postFile = json_decode($postFile);

            if (!$postFile->jobId) {
                abort('404');
            }

            $user = new User();
            $user->notify(new SubmissionAlert(
                'watermark test ' . $postHeader .
                ' (jobId: ' . $postFile->jobId .
                ', input: ' . $postFile->input->key .
                ', output: ' . $postFile->outputs->key . ')'
            ));
        }

        response()->json(['jobId' => $postFile->jobId, 'input' => $postFile->input->key, 'output' => $postFile->outputs->key, 'duration' => $postFile->outputs->duration]);
    }
}
