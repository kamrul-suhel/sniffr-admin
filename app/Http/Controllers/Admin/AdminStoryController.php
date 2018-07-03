<?php

namespace App\Http\Controllers\Admin;

use App\Traits\FrontendResponse;
use App\Traits\WordpressAPI;
use Goutte;
use Auth;
use Validator;
use Redirect;
use App\User;
use App\Story;
use App\Asset;
use App\Video;
use App\VideoCategory;
use App\VideoCollection;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
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
        $state = ($request->input('state') ? $request->input('state') : '');
        $decision = $request->input('decision', null);

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

        // only display states within selected decision point
        if($decision) {
            $found=0;
            foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
                if($state==$state_values['value']) {
                    $found=1;
                }
            }
            // ^ ABOVE: need a way to search state values to see if state exists within a decision array
            if($found==1) {
                $stories = $stories->where('state', $state);
            } else {
                $state = '';
                foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
                    $stories = $stories->orWhere('state', $state_values['value']);
                }
            }
        }

        $stories = $stories->orderBy('updated_at', 'DESC')->paginate(12);

        $data = [
            'stories' => $stories,
            'state' => $state,
            'decision' => $decision,
            'users' => User::where([['client_id', NULL]])->get(),
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
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'videos' => Video::where([['state', 'licensed'], ['file', '!=', NULL]])->get()
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
        $story->state = (Input::get('state') ? Input::get('state') : 'unapproved');
        $story->title = ucwords(Input::get('title'));
        $story->description = (Input::get('description') ? Input::get('description') : NULL);
        $story->excerpt = (Input::get('excerpt') ? Input::get('excerpt') : NULL);
        $story->source = (Input::get('source') ? Input::get('source') : NULL);
        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : Auth::user()->id);
        //$story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : User::where('id', Auth::user()->id)->pluck('username')->first());
        $story->active = 1;

        if (Input::hasFile('story_image')) {
            $imageFile = Input::file('story_image');
            $imageUrl = $this->saveImageFile($imageFile);
            $story->thumb = ($imageUrl ? $imageUrl : $story->thumb);
        } else {
            if (Input::get('story_image_source_url')) {
                $story->thumb = Input::get('story_image_source_url');
            }
        }

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
        $story = Story::where('alpha_id', $id)
            ->first();

        var_dump($story->state);

        foreach(config('stories.decisions') as $current_decision => $decision) {
            // if($state==$state_values['value']) {
            //     $found=1;
            // }
            var_dump(in_array($story->state, (array)$decision));

            //var_dump($decision);
        }

        dd('--------------');

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
            'story' => $story,
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Update Story',
            'user' => Auth::user(),
            'users' => User::all(),
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'videos' => Video::where([['state', 'licensed'], ['file', '!=', NULL]])->get()
        ];

        return view('admin.stories.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        dd($data['source_date']);
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

        if (Input::get('excerpt')) {
            $story->excerpt = Input::get('excerpt');
        }

        if (Input::get('source')) {
            $story->source = Input::get('source');
        }

        if (Input::hasFile('story_image')) {
            $imageFile = Input::file('story_image');
            $imageUrl = $this->saveImageFile($imageFile);
            $story->thumb = ($imageUrl ? $imageUrl : $story->thumb);
        } else {
            if (Input::get('story_image_source_url')!=$story->thumb) {
                $story->thumb = Input::get('story_image_source_url');
            }
        }

        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : $story->user_id);
        $story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : NULL);

        if (Input::get('videos')) {
            $story->videos()->sync(Input::get('videos'));
        }

        $story->save();

        // need states for when syncing stories to WP

        return Redirect::to('admin/stories')->with([
            'note' => 'Successfully Updated Story!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param Request $request
     * @param $state
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function status(Request $request, $state, $id)
    {
        $isJson = $request->ajax();
        $decision = $request->input('decision');
        $remove = 'no';

        $story = Story::where('alpha_id', $id)->first();
        $previous_state = $story->state;
        $story->state = ($story->state!=$state ? $state : $story->state);

        // create message for frontend
        $message = 'Successfully ' . ucfirst($state) . ' Story';

        // sync to WP + custom message + whether to remove from view (depending on state)
        switch (true) {
            case ($state == 'approved'):
                // add new post to WP
                // $parameters = 'title='.urlencode($story->title).'&content='.urlencode($story->description);
                // $result = $this->apiPost('posts', $parameters, true);
                // // update stories record with WP response from post
                // if($result->id){
                //     $story->wp_id = $result->id;
                //     $story->status = $result->status;
                //     $story->date_ingested = $story->created_at;
                // }
                $message = 'Ready to license';
                break;
        }

        // Save story data to database
        $story->save();

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => $message,
                'state' => $state,
                'remove' => $remove,
                'story_id' => $story->id,
                'story_alpha_id' => $story->alpha_id,
                'decision' => $decision,
            ]);
        } else {
            return Redirect::to('admin/stories/?decision=' . $decision)
                ->with([
                    'note' => 'Story Updated',
                    'note_type' => 'success',
                ]);
        }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateField(Request $request)
    {
        $isJson = $request->ajax();
        $id = $request->input('story_id');
        $field_id = $request->input('field_id');
        $field_value = $request->input('field_value');
        $story = Story::where('alpha_id', $id)
            ->first();


        if($field_id&&$field_value) {
            switch (true) {
                case ($field_id == 'priority'):
                    $story->priority = ($field_value!='Priority' ? $field_value : $story->priority);
                    break;
                case ($field_id == 'destination'):
                    $story->destination = ($field_value!='Destination' ? $field_value : $story->destination);
                    break;
                case ($field_id == 'state'):
                    $story->state = ($field_value!='State' ? $field_value : $story->state);
                    break;
                case ($field_id == 'assign_to'):
                    $story->user_id = ($field_value!='Assign To' ? $field_value : $story->user_id);
                    break;
            }

            // Save story data to database
            $story->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Updated',
                'field_id' => ($field_id ? $field_id : 0),
                'field_value' => ($field_value ? $field_value : NULL),
                'story_id' => ($story ? $story->id : 0),
                'story_alpha_id' => ($story ? $story->alpha_id : 0),
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Error',
                'field_id' => ($field_id ? $field_id : 0),
                'field_value' => ($field_value ? $field_value : NULL),
                'story_id' => ($story ? $story->id : 0),
                'story_alpha_id' => ($story ? $story->alpha_id : 0),
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSource(Request $request)
    {
        $this->selected = NULL;
        $id = $request->input('story_id');
        $url = $request->input('url');

        if($url) {
            $crawler = Goutte::request('GET', $url);
            $crawler->filter('img')->each(function($element){
                if (strpos($element->attr('src'), 'jpg')||strpos($element->attr('src'), 'png')) {
                    list($width, $height, $type, $attr) = getimagesize($element->attr('src'));
                    if($width>400) {
                       $this->selected = $element->attr('src');
                    }
                }
            });
        }

        if($this->selected) {
            if($id) {
                $story = Story::where('alpha_id', $id)
                    ->first();
                $story->source = $this->selected;
                $story->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Success',
                'url' => $this->selected,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Error',
            ]);
        }
    }

    /**
     * @param UploadedFile $imageFile
     * @return string
     */
    private function saveImageFile(UploadedFile $imageFile)
    {
        $imageFileName = time() . '.' . $imageFile->getClientOriginalExtension();
        $t = \Storage::disk('s3')->put($imageFileName, file_get_contents($imageFile), 'public');

        if (!$t) {
            abort(500);
        }

        return \Storage::disk('s3')->url($imageFileName);
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
