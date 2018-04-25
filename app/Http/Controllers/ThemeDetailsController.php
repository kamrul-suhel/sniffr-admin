<?php

namespace App\Http\Controllers;

use App\Libraries\VideoHelper;
use App\Traits\FrontendResponder;
use Auth;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Page;
use App\Menu;
use App\Video;
use App\Contact;
use App\VideoCategory;
use App\Jobs\QueueEmail;

use App\Notifications\DetailsReview;

class ThemeDetailsController extends Controller
{
    use FrontendResponder;
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
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'theme_settings' => config('settings.theme'),
            'video_categories' => VideoCategory::all(),
            'pages' => Page::where('active', '=', 1)->get(),
        ];
    }

    /**
     * Show the upload form
     *
     * @param Request $request
     * @param $code
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $code)
    {
        if($request->ajax()){
            $video = Video::select($this->getVideoFieldsForFrontend())
                ->where('more_details_code', $code)
                ->with('contact')
                ->first();

            $iframe = $this->getVideoHtml($video, true);
            $video['iframe'] = $iframe;
            if($video){
                return $this->successResponse($video);
            }else{
                return $this->errorResponse("Not found");
            }
        }

        return view('frontend.master');
    }

    /**
     * Returns the details form with no page wrapper
     *
     * @param $code
     * @return Response
     */
    public function form($code)
    {
        $this->data['iframe'] = 'true';
        $this->data['form'] = 'details';
        $this->data['video'] = Video::where('more_details_code', $code)->first();

        return view('Theme::templates/iframe', $this->data);
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

            if($request->ajax()){
                return $this->errorResponse('Sorry there is something wrong please review the form and submit again');
            }

            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        } else {
            //get additional form data
            $contact = Contact::where('id',$video->contact_id)->first();
            $contact->tel = Input::get('tel');
            $contact->save();

            $date = Input::get('date_filmed');
            if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$date)) {
                $video->date_filmed = Input::get('date_filmed');
            }
            
            $video->location = Input::get('location');
            $video->description = Input::get('description');
            $video->filmed_by_me = Input::get('filmed_by_me');
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
            if(env('APP_ENV') != 'local'){
                $video->notify(new DetailsReview($video));
            }
            
            // Send thanks notification email (via queue after 2mins)
            QueueEmail::dispatch($video->id, 'details_thanks');

            $this->data['video'] = $video;

            if($request->ajax()){
                return $this->successResponse();
            }else{
                return view('frontend.master', $this->data);
            }

        }
    }
}
