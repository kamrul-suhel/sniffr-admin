<?php

namespace App\Http\Controllers;

use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use Auth;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\User;
use App\Page;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\Jobs\QueueEmail;
use App\Notifications\DetailsReview;

class DetailsController extends Controller
{
    use FrontendResponse;
    use VideoHelper;

    protected $rules = [
        'description' => 'required',
        'permission' => 'required',
        'submitted_elsewhere' => 'required',
        'contact_is_owner' => 'required',
        'allow_publish' => 'required',
        'is_exclusive' => 'required'
    ];

    public function __construct()
    {
        $user = Auth::user();

        $this->data = [
            'user' => $user,
            'theme_settings' => config('settings.theme'),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];
    }

    /**
     * @param Request $request
     * @param $code
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function show(Request $request, $code)
    {

        if ($request->ajax() || $request->isJson()) {
            $video = Video::select($this->getVideoFieldsForFrontend())
                ->where('more_details_code', $code)
                ->with('contact')
                ->first();

            if($video){
                $iframe = $this->getVideoHtml($video, true);
                $video['iframe'] = $iframe;
                return $this->successResponse($video);
            }

            return $this->errorResponse('Sorry, we could not find your video');

        }

        return $this->getFrontendServerResponse($request);
    }

    /**
     * @param $code
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function form($code)
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'details';
        $this->data['video'] = Video::where('more_details_code', $code)->first();

        return view('Theme::templates/iframe', $this->data);
    }

    /**
     * @param Request $request
     * @param $code
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function store(Request $request, $code)
    {
        $video = Video::where('more_details_code', $code)->first();

        $validator = Validator::make(Input::all(), $this->rules);
        $this->validate($request, $this->rules);

        if ($validator->fails()) {
            if ($request->ajax() || $request->isJson()) {
                return $this->errorResponse('Sorry there is something wrong please review the form and submit again');
            }

            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        }

        //get additional form data
        $contact = Contact::where('id', $video->contact_id)->first();
        $contact->tel = Input::get('tel');
        $contact->save();

        $date = Input::get('date_filmed');
        if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/", $date)) {
            $video->date_filmed = Input::get('date_filmed');
        }

        $video->location = Input::get('location');
        $video->description = Input::get('description');
        $video->filmed_by_me = Input::get('filmed_by_me') == 1  ? 1 : 0;
        $video->permission = Input::get('permission') == 1  ? 1 : 0;
        $video->submitted_elsewhere = Input::get('submitted_elsewhere') == 1 ? 1 : 0;
        $video->submitted_where = Input::get('submitted_where');
        $video->contact_is_owner = Input::get('contact_is_owner') == 'yes' || 1 ? 1 : 0;
        $video->allow_publish = Input::get('allow_publish') == 'yes' || 1 ? 1 : 0;
        $video->is_exclusive = Input::get('is_exclusive') == 'yes' || 1 ? 1 : 0;
        $video->more_details = 1;
        $video->state = 'pending';
        $video->save();

        // Notification of new video
        if (env('APP_ENV') != 'local') {
			$user = new User();
			$user->slackChannel('submissions')->notify(new DetailsReview($video));
        }

        // Send thanks notification email (via queue after 2mins)
        QueueEmail::dispatch($video->id, 'details_thanks');

        $this->data['video'] = $video;

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse();
        }
        return view('frontend.master', $this->data);
    }
}
