<?php

namespace App\Http\Controllers\Admin;

use App\Traits\FrontendResponse;
use App\Traits\WordpressAPI;
use Auth;
use Validator;
use Redirect;
use App\User;
use App\Story;
use App\Asset;
use App\Video;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;

use App\Jobs\QueueStory;

class AdminStoryController extends Controller
{
    use FrontendResponse, WordpressAPI;

    protected $rules = [
        'title' => 'required'
    ];

    public function __construct(Request $request)
    {
        $this->middleware(['admin:admin,manager,editorial']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function refresh()
    {
        //increase execution time
        ini_set('max_execution_time', 1800);

        $version = VideoHelper::quickRandom(); // set random version for cache busting
        $pages = mt_rand(100,200); // set random number over 100 for per page (if needed)

        $posts_publish = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts_draft = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&status=draft&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts_pending = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&status=pending&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts = array_merge(array_merge($posts_pending, $posts_publish), $posts_draft);

        // set dispatched for sending response back to ajax
        $dispatched = false;

        // store stories from wordpress in database
        foreach($posts as $post){

            // checks if wp post already exists within sniffr stories
            $story = Story::where([['wp_id', $post->id]])->first();

            if(!$story) {
                QueueStory::dispatch($post, 'new', (Auth::user() ? Auth::user()->id : 0))
                    ->delay(now()->addSeconds(2));
                $dispatched = true;
            } else {
                $storyTime = Carbon::parse($story->date_ingested);
                $postTime = Carbon::parse($post->date);
                $differenceTime = $postTime->diffInSeconds($storyTime);

                // if wp post is updated 5mins after our own story record
                if($differenceTime>150) {
                    QueueStory::dispatch($post, 'update', (Auth::user() ? Auth::user()->id : 0))
                        ->delay(now()->addSeconds(2));
                    $dispatched = true;
                }
            }
        }

        //return Redirect::to('admin/stories'); //return response()->json($formatted_posts);
        return response()->json([
            'status' => 'success',
            'dispatched' => $dispatched,
            'message' => 'all good',
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function checkJobs() {
        $jobs = \DB::table('jobs')->where('payload', 'LIKE' , '%QueueStory%')->count();
        return response()->json([
            'status' => 'success',
            'jobs' => $jobs,
            'message' => 'all good',
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            if($request->search){
                $stories = Story::where('title', 'LIKE', '%'.$request->search. '%')
                    ->orWhere('alpha_id', 'LIKE', '%'. $request->search . '%')
                    ->orderBy('date_ingested', 'DESC')
                    ->paginate(12);
            }else{
                $stories = Story::orderBy('date_ingested', 'DESC')
                    ->paginate(12);
            }

            $data = [
                'stories' => $stories
            ];
            return $this->successResponse($data);
        }

        return view('admin.stories.index'); //return response()->json($formatted_posts);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMailerVideos(Request $request)
    {
        if ($request->ajax()) {

            if($request->search){
                $search_value = $request->search;
                $videos = Video::where([['state', 'licensed'], ['file', '!=', NULL], ['title', 'LIKE', '%'. $search_value . '%']])
                    ->orWhere('alpha_id', $search_value)
                    ->orderBy('licensed_at', 'DESC')
                    ->paginate(12);
            }else{
                $videos = Video::with('createdUser')
                    ->where([['state', 'licensed'], ['file', '!=', NULL]])
                    ->orderBy('licensed_at', 'DESC')
                    ->paginate(12);
            }
            $data = [
                'videos' => $videos
            ];
            return $this->successResponse($data);
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
            'post_route' => url('admin/stories/store'),
            'button_text' => 'Add New Story',
            'user' => Auth::user(),
            'users' => User::all(),
            'videos' => Video::all()
        ];

        return view('admin.stories.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $validator = Validator::make($data = Input::all(), $this->rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $story = new Story();
        $story->alpha_id = VideoHelper::quickRandom();
        $story->state = (Input::get('state') ? Input::get('state') : 'sourced');
        $story->title = Input::get('title');
        $story->description = (Input::get('description') ? Input::get('description') : NULL);
        $story->notes = (Input::get('notes') ? Input::get('notes') : NULL);
        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : NULL);
        $story->active = 1;
        $story->save();

        if (Input::get('videos')) {
            $story->videos()->sync(Input::get('videos'));
        }

        return Redirect::to('admin/stories')->with([
            'note' => 'New Story Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $story = Story::find($id);

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
            'story' => $story,
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Update Story',
            'user' => Auth::user(),
            'users' => User::all(),
            'videos' => Video::all()
        ];

        //dd($story->videos);

        return view('admin.stories.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $story = Story::findOrFail($id);

        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        if (Input::get('title')) {
            $story->title = Input::get('title');
        }

        $story->state = (Input::get('state') ? Input::get('state') : 'sourced');

        if (Input::get('description')) {
            $story->description = Input::get('description');
        }

        if (Input::get('notes')) {
            $story->notes = Input::get('notes');
        }

        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : NULL);

        if (Input::get('videos')) {
            $story->videos()->sync(Input::get('videos'));
        }

        $story->save();

        return Redirect::to('admin/stories/edit' . '/' . $id)->with([
            'note' => 'Successfully Updated Story!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $story = Story::find($id);

        if (!$story) {
            abort(404);
        }

        $story->destroy($id);

        return Redirect::to('admin/clients')->with([
            'note' => 'Successfully Deleted Story',
            'note_type' => 'success'
        ]);
    }
}
