<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use App\User;
use App\Story;
use App\Video;
use App\Contact;
use App\Comment;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;

class AdminStoryController extends Controller
{
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
    public function index()
    {
        $stories = Story::orderBy('updated_at', 'DESC')->paginate(10);

        $data = [
            'stories' => $stories,
            'users' => User::all(),
            'user' => Auth::user()
        ];

        return view('admin.stories.index', $data);
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

        if ($validator->fails())
        {
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

        if(Input::get('videos')) {
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
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $story = Story::findOrFail($id);

        $validator = Validator::make($data, $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        if(Input::get('title')) {
            $story->title = Input::get('title');
        }

        $story->state = (Input::get('state') ? Input::get('state') : 'sourced');

        if(Input::get('description')) {
            $story->description = Input::get('description');
        }

        if(Input::get('notes')) {
            $story->notes = Input::get('notes');
        }

        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : NULL);

        if(Input::get('videos')) {
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

        if(!$story){
            abort(404);
        }

        $story->destroy($id);

        return Redirect::to('admin/clients')->with([
            'note' => 'Successfully Deleted Story',
            'note_type' => 'success'
        ]);
    }
}
