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
    public function index(Request $request)
    {
        $search_value = $request->input('search_value', null);
        $state = ($request->input('state', 'all') ? $request->input('state', 'all') : 'all');

        $stories = new Story;

        if ($search_value) {
            $stories = $stories->where(function ($query) use ($search_value) {
                $query->where('title', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('author', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('excerpt', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('description', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('alpha_id', $search_value);
            });
        }

        if ($state != 'all') {
            $stories = $stories->where('state', $state);
            //session(['state' => $state]); not sure what this does?
        }

        $stories = $stories->orderBy('updated_at', 'DESC')->paginate(12);

        $data = [
            'stories' => $stories,
            'state' => $state,
            'users' => User::all(),
            'user' => Auth::user(),
        ];

        return view('admin.stories.index', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMailerVideos(Request $request)
    {
        if ($request->ajax()) {

            if ($request->search) {
                $search_value = $request->search;
                $videos = Video::where([['state', 'licensed'], ['file', '!=', NULL], ['title', 'LIKE', '%' . $search_value . '%']])
                    ->orWhere('alpha_id', $search_value)
                    ->orderBy('licensed_at', 'DESC')
                    ->paginate(12);
            } else {
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
        //$story->excerpt = (Input::get('excerpt') ? Input::get('excerpt') : NULL);
        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : Auth::user()->id);
        //$story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : User::where('id', Auth::user()->id)->pluck('username')->first());
        $story->active = 1;
        $story->save();

        if (Input::get('videos')) {
            $story->videos()->sync(Input::get('videos'));
        }

        // post story to WP
        $parameters = 'title='.urlencode($story->title).'&content='.urlencode($story->description);
        $result = $this->apiPost('posts', $parameters, true);

        // update stories record with WP response from post
        if($result->id){
            $story->wp_id = $result->id;
            $story->status = $result->status;
            $story->date_ingested = $story->created_at;
            $story->save();
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

        // if (Input::get('excerpt')) {
        //     $story->excerpt = Input::get('excerpt');
        // }

        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : NULL);
        $story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : NULL);

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
