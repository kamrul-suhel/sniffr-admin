<?php

namespace App\Http\Controllers\Video;

use App\Http\Controllers\Controller;
use App\Http\Requests\Video\CreateVideoRequest;
use App\Services\VideoService;
use App\Tag;
use App\VideoTag;
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
use App\Libraries\VideoHelper;
use App\Jobs\QueueEmail;
use App\Notifications\SubmissionNew;
use App\Notifications\SubmissionAlert;

class VideoController extends Controller
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
     * @var int
     */
    private $videos_per_page;

    /**
     * VideoController constructor.
     * @param \App\Services\VideoService $videoService
     */
    public function __construct(VideoService $videoService)
    {
        $settings = config('settings.site');
        $this->videos_per_page = $settings['videos_per_page'] ?: 24;

        $user = Auth::user();

        $this->data = [
            'user' => $user,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => config('settings.theme'),
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
    public function uploadForm()
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
     * TODO: Methods is not being used
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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
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
            'theme_settings' => config('settings.theme'),
            'pages' => (new Page)->where('active', '=', 1)->get(),
        ];
        return view('Theme::video-list', $data);
    }

    /**
     * @param integer $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(integer $id)
    {
        $video = Video::where('state', 'licensed')
            ->with('tags')
            ->orderBy('licensed_at', 'DESC')
            ->where('alpha_id', $id)
            ->first();

        //Make sure video is active
        if ((!Auth::guest() && Auth::user()->role == 'admin') || $video->state == 'licensed') {
            $favorited = false;
            $downloaded = false;

            $view_increment = $this->handleViewCount($id);

            $data = [
                'video' => $video,
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'view_increment' => $view_increment,
                'favorited' => $favorited,
                'downloaded' => $downloaded,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];
            return view('Theme::video', $data);
        }

        return Redirect::to('videos')->with([
            'note' => 'Sorry, this video is no longer active.',
            'note_type' => 'error'
        ]);
    }

    /**
     * TODO: rename this method
     * @param Tag $tag
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function findByTag(Tag $tag)
    {
        $page = Input::get('page', 1);

        if (!isset($tag)) {
            return Redirect::to('videos');
        }

        $tag_name = $tag;

        $tag = Tag::where('name', '=', $tag)->first();

        $tags = VideoTag::where('tag_id', '=', $tag->id)->get();

        $tag_array = [];
        foreach ($tags as $key => $tag) {
            array_push($tag_array, $tag->video_id);
        }

        $videos = Video::where('state', 'licensed')
            ->whereIn('id', $tag_array)
            ->paginate($this->videos_per_page);

        $data = [
            'videos' => $videos,
            'current_page' => $page,
            'page_title' => 'Videos tagged with "' . $tag_name . '"',
            'page_description' => 'Page ' . $page,
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'pagination_url' => '/videos/tags/' . $tag_name,
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::video-list', $data);
    }

    /**
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
                $videos = Video::where('state', 'licensed')
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
