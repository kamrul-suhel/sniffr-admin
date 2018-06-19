<?php

namespace App\Http\Controllers\Video;

use App\Http\Controllers\Controller;
use App\Http\Requests\Video\CreateVideoRequest;
use App\Services\VideoService;
use App\Traits\FrontendResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Page;
use App\User;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\Libraries\VideoHelper;
use App\Jobs\QueueEmail;
use App\Notifications\SubmissionNew;
use App\Notifications\SubmissionAlert;

class VideoController extends Controller
{
    use FrontendResponse;
    use VideoHelper;
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
     * @var int
     */
    private $videos_per_page;

    /**
     * VideoController constructor.
     * @param \App\Services\VideoService $videoService
     */
    public function __construct(VideoService $videoService)
    {
        //TODO: Remove pages?
        $settings = config('settings.site');
        $this->videos_per_page = $settings['videos_per_page'] ?: 24;
        $this->data = [
            'user' => Auth::user(),
            'theme_settings' => config('settings.theme'),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        $this->videoService = $videoService;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function upload()
    {
        return view('frontend.master', $this->data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function form()
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'upload';
        return view('frontend.iframe', $this->data);
    }

    /**
     * @param CreateVideoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateVideoRequest $request)
    {
        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '512M');
        ini_set('post_max_size', '512M');

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
        $video->title = $request->input('title') ?: ('Untitled ' . $video->alpha_id);
        $video->state = 'new';
        $video->rights = 'ex';
        $video->source = Input::get('source');
        $video->ip = $request->ip();
        $video->user_agent = $request->header('User-Agent');
        $video->save();

        $fileSize = $filePath = '';

        //handle file upload to S3 and Youtube ingestion
        if ($request->hasFile('file')) {
            $filePath = $this->videoService->saveUploadedVideoFile($video, $request->file('file'));
        }

        if ($request->get('url')) {
            $filePath = $this->videoService->saveVideoLink($video, $request->get('url'));
        }

        // Slack notification
        if (env('APP_ENV') == 'prod') {
            $video->notify(new SubmissionNew($video));
        }

        // thanks notification email
        QueueEmail::dispatch($video->id, 'submission_thanks');

        //TODO remove when frontend 3 is completed?
        $iFrame = Input::get('iframe', 'false');

        return $this->successResponse([
            'status' => 'success',
            'iframe' => $iFrame,
            'href' => self::THANKS_URL,
            'message' => 'Video Successfully Added!',
            'files' => [
                'name' => $video->title,
                'size' => $fileSize,
                'url' => $filePath
            ]
        ]);
    }

    /**
     * TODO: Method is not being used
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
     * TODO: Method is not being used
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

            response()->json([
                'jobId' => $postFile->jobId,
                'input' => $postFile->input->key,
                'output' => $postFile->outputs->key,
                'duration' => $postFile->outputs->duration
            ]);
        }
        // TODO: error response
        response()->json([]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        if ($request->ajax() || $request->isJson()) {
            $videos = Video::select($this->getVideoFieldsForFrontend())->where('state', 'licensed')
                ->orderBy('id', 'DESC')
                ->paginate($this->videos_per_page);

            $data = [
                'videos' => $videos,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => (new Page)->where('active', '=', 1)->get(),
            ];

            return $this->successResponse($data);
        }

        return view('frontend.master');
    }

    /**
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request, string $id)
    {
        $isJson = $request->ajax() || $request->isJson();
        if ($isJson) {
            $video = Video::select($this->getVideoFieldsForFrontend())
                ->where('state', 'licensed')
                ->with('tags')
				->with('order')
                ->orderBy('licensed_at', 'DESC')
                ->where('alpha_id', $id)
                ->first();
            $iFrame = $this->getVideoHtml($video, true);
            $view_increment = $this->handleViewCount($id);
            $data = [
                'video' => $video,
                'iframe' => $iFrame,
                'view_increment' => $view_increment,
            ];

            return $this->successResponse($data);
        }
        return view('frontend.master');
    }

    /**
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     * Letter we will remove this code it is for frontend not client video show method
     */
//    public function show(Request $request, string $id)
//    {
//        $video = Video::where('state', 'licensed')
//            ->with('tags')
//            ->orderBy('licensed_at', 'DESC')
//            ->where('alpha_id', $id)
//            ->first();
//        $isJson = $request->ajax() || $request->isJson();
//
//        //Make sure video is active
//        if ((Auth::check()) && (($video) && ((Auth::user()->role == 'admin' || Auth::user()->role == 'client') || $video->state == 'licensed'))) {
//            $favorited = false;
//            $downloaded = false;
//            $iFrame = $this->getVideoHtml($video, true);
//            $ordered = Order::where('video_id', $video->id)
//                ->where('client_id', Auth::user()->client_id)
//                ->first();
//
//            $view_increment = $this->handleViewCount($id);
//
//            $data = [
//                'video' => $video,
//                'iframe' => $iFrame,
//                'ordered' => $ordered ? true : false,
//                'view_increment' => $view_increment,
//                'favorited' => $favorited,
//                'downloaded' => $downloaded,
//                'video_categories' => VideoCategory::all(),
//                'theme_settings' => config('settings.theme'),
//                'pages' => Page::where('active', '=', 1)->get(),
//            ];
//
//            if ($isJson) {
//                return $this->successResponse($data);
//            }
//
//            return view('frontend.master', $data);
//        }
//
//        if ($isJson) {
//            return $this->errorResponse('Sorry, this video is no longer active');
//        }
//
//        return Redirect::to('videos')->with([
//            'note' => 'Sorry, this video is no longer active.',
//            'note_type' => 'error'
//        ]);
//    }

    /**
     * @param Request $request
     * @param string $tagName
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function findByTag(Request $request, string $tagName)
    {
        if ($request->ajax() || $request->isJson()) {
            if (!isset($tagName)) {
                return redirect()->to('video_index');
            }

            $videos = Video::select($this->getVideoFieldsForFrontend())
                ->where('state', 'licensed')
                ->whereHas('tags', function ($query) use ($tagName) {
                    $query->where('name', '=', $tagName);
                })
                ->paginate($this->videos_per_page);

            return $this->successResponse(['videos' => $videos]);
        }

        return view('frontend.master');
    }

    /**
     * TODO: are we using this method?
     * @param VideoCategory $videoCategory
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function category(VideoCategory $videoCategory)
    {
        $page = Input::get('page', 1);

        $cat = VideoCategory::where('slug', '=', $videoCategory)->first();

        $parent_cat = VideoCategory::where('parent_id', '=', $cat->id)->first();

        if (!empty($parent_cat->id)) {
            $parent_cat2 = VideoCategory::where('parent_id', '=', $parent_cat->id)->first();
            if (!empty($parent_cat2->id)) {
                $videos = Video::select($this->getVideoFieldsForFrontend())
                    ->where('state', 'licensed')
                    ->where('video_category_id', '=', $cat->id)
                    ->orWhere('video_category_id', '=', $parent_cat->id)
                    ->orWhere('video_category_id', '=', $parent_cat2->id)
                    ->orderBy('licensed_at', 'DESC')
                    ->simplePaginate(9);
            } else {
                $videos = Video::where('state', 'licensed')
                    ->where('video_category_id', '=', $cat->id)
                    ->orWhere('video_category_id', '=', $parent_cat->id)
                    ->orderBy('licensed_at', 'DESC')
                    ->simplePaginate(9);
            }
        } else {
            $videos = Video::where('state', 'licensed')
                ->where('video_category_id', '=', $cat->id)
                ->orderBy('licensed_at', 'DESC')
                ->simplePaginate(9);
        }

        $data = [
            'videos' => $videos,
            'current_page' => $page,
            'category' => $cat,
            'page_title' => 'Videos - ' . $cat->name,
            'page_description' => 'Page ' . $page,
            'pagination_url' => '/videos/category/' . $videoCategory,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::video-list', $data);
    }

    /**
     * @param $id
     * @return bool
     * TODO: Method is not being used?
     *
     * @codeCoverageIgnore
     */
    public function handleViewCount($id)
    {
        // check if this key already exists in the view_media session
        $blank_array = [];
        if (!array_key_exists($id, session('viewed_video', $blank_array))) {

            try {
                // increment view
                $video = Video::where('alpha_id', $id)->first();
                $video->views = $video->views + 1;
                $video->save();
                // Add key to the view_media session
                session('viewed_video.' . $id);
                return true;
            } catch (\Exception $e) {
                return false;
            }
        }

        return false;
    }
}
