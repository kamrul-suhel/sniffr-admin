<?php

namespace App\Http\Controllers\Api\v1;

use App\Contact;
use App\Http\Requests\Video\CreateVideoRequest;
use App\Jobs\QueueEmail;
use App\Libraries\VideoHelper;
use App\Notifications\SubmissionNew;
use App\Traits\FrontendResponse;
use App\User;
use Illuminate\Http\Request;
use Response;
use App\Video;
use Auth;
use App\VideoCategory;

use Illuminate\Support\Facades\Input;

class VideoController extends BaseApiController {

	use FrontendResponse;
    use VideoHelper;
    const HOME_URL = 'https://www.unilad.co.uk';
    const THANKS_URL = 'https://www.unilad.co.uk/submit/thanks';

	private $default_limit = 50;

    /**
     * @return \Illuminate\Http\JsonResponse
     */
	public function index()
	{
		$response = Video::where('active', '=', '1');

		if(Input::get('offset')){
			$reponse = $response->skip(Input::get('offset'));
		}

		if( Input::get('filter') && Input::get('order') ){
			$response = $response->orderBy(Input::get('filter'), Input::get('order'));
		} else {
			$response = $response->orderBy('created_at', 'desc');
		}

		if(Input::get('limit')){
			$response = $response->take(Input::get('limit'));
		} else {
			$response = $response->take($this->default_limit);
		}

		return Response::json($response->get($this->public_columns), 200);
	}

    /**
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(string $id)
    {
        $video = Video::select($this->getVideoFieldsForFrontend())
            ->where('state', 'licensed')
            ->with('tags')
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

	public function video($id)
	{
		$settings = config('settings.site');
		$video = Video::find($id);

		// If user has access to all the content
		//if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() && Auth::user()->subscribed()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings['free_registration'] && Auth::user()->role == 'registered') ){
		if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest()) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings['free_registration'] && Auth::user()->role == 'registered') ){
			$columns = null;
		// Else we need to restrict the columns we return
		} else {
			$columns = $this->public_columns;
		}
		return Response::json(Video::where('id', '=', $id)->get($columns), 200);
	}

	public function video_categories(){
		return Response::json(VideoCategory::orderBy('order')->get(), 200);
	}

	public function video_category($id){
		$video_category = VideoCategory::find($id);
		return Response::json($video_category, 200);
	}

    /**
     * @param CreateVideoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateVideoRequest $request)
    {
        ini_set('max_execution_time', 1800);
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
        $video->rights = $contact->blacklist ? 'problem' : 'ex';
        $video->notes = $contact->blacklist ? "Video was automatically moved to Problem as the contact: '. $contact->full_name .' is Blacklisted" : null;
        $video->terms = Input::get('terms') ? 1 : 0;
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
            $user = new User();
            $user->slackChannel('submissions')->notify(new SubmissionNew($video));
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

}
