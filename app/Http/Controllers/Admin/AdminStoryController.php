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
use App\Contact;
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
        $decision = $request->input('decision', 'content-sourced');
        $assigned_to = $request->input('assigned_to', null);

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

        if ($assigned_to) {
            $stories = $stories->where('user_id', $assigned_to);
        }

        // only display states within selected decision point
        if($decision) {
            $found=0;
            foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
                if($state==$state_values['value']) {
                    $found=1;
                }
            }
            // ^ ABOVE: need a better way to search state values to see if state exists within a decision array
            if($found==1) {
                $stories = $stories->where('state', $state);
            } else {
                $state = ''; //$current_state[0]; //set current state to first state within decision
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
            'assigned_to' => $assigned_to,
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
            'contacts' => Contact::all(),
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
        $story->contact_id = (Input::get('contact_id') ? Input::get('contact_id') : NULL);
        //$story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : User::where('id', Auth::user()->id)->pluck('username')->first());
        $story->active = 1;
        $story->contact_is_owner = (Input::get('contact_is_owner') ? Input::get('contact_is_owner') : NULL);
        $story->allow_publish = (Input::get('allow_publish') ? Input::get('allow_publish') : NULL);
        $story->permission = (Input::get('permission') ? Input::get('permission') : NULL);
        $story->type = (Input::get('type') ? Input::get('type') : NULL);
        $story->notes = (Input::get('notes') ? Input::get('notes') : NULL);
        $story->source_type = (Input::get('source_type') ? Input::get('source_type') : NULL);
        $story->sourced_at = (Input::get('sourced_at') ? Carbon::parse(Input::get('sourced_at')) : NULL);
        $story->location = (Input::get('location') ? Input::get('location') : NULL);
        $story->removed_from_social = (Input::get('removed_from_social') ? Input::get('removed_from_social') : NULL);
        $story->problem_status = (Input::get('problem_status') ? Input::get('problem_status') : NULL);
        $story->submitted_to = (Input::get('submitted_to') ? implode(',', Input::get('submitted_to')) : NULL);
        $story->rights = (Input::get('rights') ? Input::get('rights') : NULL);
        $story->rights_type = (Input::get('rights_type') ? Input::get('rights_type') : NULL);
        $story->story_category_id = (Input::get('category') ? Input::get('category') : NULL);
        $story->story_collection_id = (Input::get('collection') ? Input::get('collection') : NULL);

        if (Input::hasFile('story_image')) {
            $imageFile = Input::file('story_image');
            $imageUrl = $this->saveImageFile($imageFile);
            $story->thumb = ($imageUrl ? $imageUrl : $story->thumb);
        } else {
            if (Input::get('story_image_source_url')) {
                $story->thumb = Input::get('story_image_source_url');
            }
        }

        // Need to add / update contact
        if(Input::get('contact_email')) {
            $contact = new Contact();
            $contact->full_name = Input::get('contact_full_name');
            $contact->email = Input::get('contact_email');
            $contact->tel = Input::get('contact_tell');
            $contact->save();
            $story->contact_id = $contact->id;
            // should they get an email or something?
        } else {
            $story->contact_id = (Input::get('contact_id') ? Input::get('contact_id') : NULL);
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
        $story = Story::with('currentContract')->where('alpha_id', $id)
            ->first();

        $decision = Input::get('decision');
        //array_key_exists($story->state,config('stories.decisions.'.$decision)) looks for state within specific decision step

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
            'story' => $story,
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Save Draft',
            'decision' => $decision,
            'user' => Auth::user(),
            'users' => User::all(),
            'contacts' => Contact::all(),
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
        $id = $data['id'];
        $decision = $data['decision'];
        $story = Story::findOrFail($id);

        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        if (Input::hasFile('story_image')) {
            $imageFile = Input::file('story_image');
            $imageUrl = $this->saveImageFile($imageFile);
            $story->thumb = ($imageUrl ? $imageUrl : $story->thumb);
        } else {
            if (Input::get('story_image_source_url')&&Input::get('story_image_source_url')!=$story->thumb) {
                $story->thumb = Input::get('story_image_source_url');
            }
        }

        $story->title = (Input::get('title') ? Input::get('title') : $story->title);
        $story->state = (Input::get('state') ? Input::get('state') : $story->state);
        $story->description = (Input::get('description') ? Input::get('description') : $story->description);
        $story->excerpt = (Input::get('excerpt') ? Input::get('excerpt') : $story->excerpt);
        $story->source = (Input::get('source') ? Input::get('source') : $story->source);
        $story->contact_is_owner = (Input::get('contact_is_owner') == 1  ? 1 : NULL);
        $story->allow_publish = (Input::get('allow_publish') == 1  ? 1 : NULL);
        $story->permission = (Input::get('permission') == 1  ? 1 : NULL);
        $story->story_category_id = (Input::get('category') ? Input::get('category') : NULL);
        $story->story_collection_id = (Input::get('collection') ? Input::get('collection') : NULL);
        $story->type = (Input::get('type') ? Input::get('type') : $story->type);
        $story->notes = (Input::get('notes') ? Input::get('notes') : $story->notes);
        $story->source_type = (Input::get('source_type') ? Input::get('source_type') : $story->source_type);
        $story->sourced_at = (Input::get('sourced_at') ? Carbon::parse(Input::get('sourced_at')) : ($story->sourced_at ? $story->sourced_at : NULL));
        $story->location = (Input::get('location') ? Input::get('location') : $story->location);
        $story->removed_from_social = (Input::get('removed_from_social') ? Input::get('removed_from_social') : $story->removed_from_social);
        $story->problem_status = (Input::get('problem_status') ? Input::get('problem_status') : '');
        $story->submitted_to = (Input::get('submitted_to') ? implode(',', Input::get('submitted_to')) : '');
        $story->rights = (Input::get('rights') ? Input::get('rights') : '');
        $story->rights_type = (Input::get('rights_type') ? Input::get('rights_type') : '');
        $story->user_id = (Input::get('user_id') ? Input::get('user_id') : $story->user_id);
        $story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('username')->first() : NULL);

        // Need to add / update contact
        if(Input::get('contact_email')) {
            $contact = new Contact();
            $contact->full_name = Input::get('contact_full_name');
            $contact->email = Input::get('contact_email');
            $contact->tel = Input::get('contact_tel');
            $contact->save();
            $story->contact_id = $contact->id;
            // should they get an email or something?
        } else {
            $story->contact_id = (Input::get('contact_id') ? Input::get('contact_id') : $story->contact_id);
        }

        if (Input::get('videos')) {
            $story->videos()->sync(Input::get('videos'));
        }

        $story->save();

        // need states for when syncing stories to WP

        return Redirect::to('admin/stories/?decision='.$decision)->with([
            'note' => 'Successfully Saved Story!',
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
        if (!$story) {
            abort(404);
        }
        $story->state = ($story->state!=$state ? $state : $story->state);
        $story->save();

        // create message for frontend
        $message = 'Successfully ' . ucfirst($state) . ' Story';

        // sync to WP + custom message + whether to remove from view (depending on state)
        switch (true) {
            case ($state == 'unapproved' || $state == 'rejected' || $state == 'approved'):
                break;
            case ($state == 'unlicensed'):
                // add new post to WP
                QueueStory::dispatch($id, 'push', (!empty(Auth::id()) ? Auth::id() : 0));
                $message = 'Pushed to WP + Ready to license';
                break;
            case ($state == 'writing-completed' || $state == 'subs-approved'):
                // update story content from WP (including assets)
                if($story->wp_id) {
                    QueueStory::dispatch($id, 'sync', (!empty(Auth::id()) ? Auth::id() : 0));
                }
                $message = 'Just updated content from WP';
                break;
        }

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => $message,
                'state' => $state,
                'remove' => $remove,
                'story_id' => $story->id,
                'story_alpha_id' => $id,
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
     * @param $state
     * @return string
     */
    public static function checkDropdownValue($state)
    {
        $found='';
        foreach(config('stories.decisions') as $decision1 => $decision1_values) {
            foreach(config('stories.decisions.'.$decision1) as $current_state => $state_values) {
                if($state==$current_state) {
                    $found=$state_values['dropdown'];
                }
            }
        }
        return $found;
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $story = Story::where('alpha_id', $id)->first();

        if (!$story) {
            abort(404);
        }

        $story->destroy($story->id);

        return Redirect::to('admin/stories')->with([
            'note' => 'Successfully Deleted Story',
            'note_type' => 'success'
        ]);
    }
}
