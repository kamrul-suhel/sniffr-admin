<?php

namespace App\Http\Controllers\Admin;

use App\CollectionStory;
use RedditAPI;
use App\Traits\FrontendResponse;
use App\Traits\WordpressAPI;
use Goutte;
use Auth;
use Validator;
use Redirect;
use App\User;
use App\Story;
use App\VideoCategory;
use App\VideoCollection;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;
use App\Jobs\QueueBump;
use App\Jobs\QueueStory;
use Illuminate\Support\Facades\Cookie;

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
        $state = $request->input('state') ? $request->input('state') : Cookie::get('sniffr_admin_state');
        $decision = $request->input('decision', (Cookie::get('sniffr_admin_decision') ?? 'content-sourced'));
        $assigned_to = $request->input('assigned_to', null);

        $stories = new Story;

        if ($search_value) {
            $stories = $stories->where(function ($query) use ($search_value) {
                $query->where('title', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('author', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('excerpt', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('description', 'LIKE', '%' . $search_value . '%')
                    ->orWhere('alpha_id', $search_value)
                    ->orWhereHas('contact', function ($q) use ($search_value) {
                        $q->where('full_name', 'LIKE', '%' . $search_value . '%');
                    });
            });
        }

        if ($assigned_to) {
            $stories = $stories->where('user_id', $assigned_to);
        }

        // Need to check if state exists in current decision tree
		$stateExists = false;
		foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
			if($state == $state_values['value']) {
				$stateExists = true;
			}
		}

		if (!$stateExists) { // Get the first (default) state in the array
			$state = key(config('stories.decisions.'.$decision));
		}

		var_dump('Decision: '.$decision);
		var_dump('State: '.$state);

		$stories = $stories->where('state', $state);

//		// only display states within selected decision point
//        if($decision) {
//            $found=0;
//            foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
//                if($state==$state_values['value']) {
//                    $found=1;
//                }
//            }
//
//            // ^ ABOVE: need a better way to search state values to see if state exists within a decision array
//            if($found==1) {
//                $stories = $stories->where('state', $state);
//            } else {
//                $state = ''; //$current_state[0]; //set current state to first state within decision
//                foreach(config('stories.decisions.'.$decision) as $current_state => $state_values) {
//                    $stories = $stories->orWhere('state', $state_values['value']);
//                }
//            }
//        }

        $stories = $stories->orderBy('updated_at', 'DESC')->paginate(12);

        $data = [
            'stories' => $stories,
            'state' => $state,
            'decision' => $decision,
            'assigned_to' => $assigned_to,
            'users' => User::where([['client_id', NULL]])->get(),
            'user' => Auth::user(),
        ];

		Cookie::queue('sniffr_admin_decision', $decision);
		Cookie::queue('sniffr_admin_state', $state);

        return view('admin.stories.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
			'user' => Auth::user(),
			'users' => User::all(),
			'contact' => null,
			'asset' => null,
            'decision' => 'content-sourced',
			'asset_type' => 'story',
            'post_route' => url('admin/stories/store'),
            'button_text' => 'Add New Story',
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all()
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
		$story->contact_id = (Input::get('contact_id') ? Input::get('contact_id') : NULL);

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

        // Sync attached videos
		$attachedVideos = Input::get('videos') ? array_filter(Input::get('videos')) : [];
		$story->videos()->sync($attachedVideos);

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
        $asset = Story::with('currentContract')->where('alpha_id', $id)
            ->first();

        $decision = Input::get('decision');
        //array_key_exists($story->state,config('stories.decisions.'.$decision)) looks for state within specific decision step

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
            'asset' => $asset,
			'asset_type' => 'story',
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Save Draft',
            'decision' => $decision,
            'user' => Auth::user(),
            'users' => User::all(),
			'contact' => $asset->contact,
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all()
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
        $story->author = (Input::get('user_id') ? User::where('id', Input::get('user_id'))->pluck('full_name')->first() : NULL);
		$story->contact_id = (Input::get('contact_id') ? Input::get('contact_id') : $story->contact_id);

		$story->save();

		// Sync attached videos
		$attachedVideos = Input::get('videos') ? array_filter(Input::get('videos')) : [];
		$story->videos()->sync($attachedVideos);

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
			'asset' => $story,
			'asset_type' => 'story',
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Save Draft',
            'decision' => $decision,
            'user' => Auth::user(),
            'users' => User::all(),
			'contact' => $story->contact,
            'video_categories' => VideoCategory::all(),
            'video_collections' => VideoCollection::all(),
            'note' => 'Successfully Saved Story!',
            'note_type' => 'success'
        ];

        return view('admin.stories.create_edit', $data);
    }

    /**
     * @param Request $request
     * @param $state
     * @param $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function status(Request $request, $state, $alpha_id)
    {
        $isJson = $request->ajax();
        $decision = $request->input('decision');
        $remove = 'no';

        $story = Story::where('alpha_id', $alpha_id)->first();
        $story->state = ($story->state!=$state ? $state : $story->state);
        $story_id = $story->id;

        // create message for frontend
        $message = 'Successfully ' . ucfirst($state) . ' Story';

        // sync to WP + custom message + whether to remove from view (depending on state)
        switch (true) {
            case ($state == 'unapproved'):
                break;
            case ($state == 'rejected'):
                break;
            case ($state == 'approved'):
                // make initial contact (will need to add twitter/fb/reddit in future)
                if($story_id && $story->contact->canAutoBump()){
                    QueueBump::dispatch($story_id);
                }
                break;
//            case ($state == 'unlicensed'):
//                // contact has been made (set in db)
//                if($story_id) {
//                    $story->contact_made = 1;
//                }
//                $message = 'Set to contact made';
//                break;
            case ($state == 'licensed'):
                // add new post to WP
                if($story_id) {
                    QueueStory::dispatch($alpha_id, 'push', (!empty(Auth::id()) ? Auth::id() : 0));
                }
                $message = 'Pushed to WP + Ready to license';
                break;
            case ($state == 'writing-completed' || $state == 'subs-approved'):
                // update story content from WP (including assets)
                if($story->wp_id) {
                    QueueStory::dispatch($alpha_id, 'sync', (!empty(Auth::id()) ? Auth::id() : 0));
                }
                $message = 'Just updated content from WP';
                break;
        }

        $story->save();

        if ($isJson) {
            return response()->json([
                'status' => 'success',
                'message' => $message,
                'state' => $state,
                'remove' => $remove,
                'story_id' => $story_id,
                'story_alpha_id' => $alpha_id,
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendReminder(Request $request, $id)
    {
        $decision = $request->input('decision');

        $asset = Story::where('alpha_id', $id)->first();

        if(isset($asset->contact)) {
            if($asset->reminders >= 2) {
                $status = 'error';
                $message = 'Looks like you have already sent lots of reminders!';
            } else {
                if($asset->contact->canAutoBump()){
    				QueueBump::dispatch($asset->id);

    				$status = 'success';
    				$message = 'Reminder Sent';
    			}else{
    				$asset->contacted_at = now();
    				$asset->reminders = (isset($asset->reminders) ? $asset->reminders : 0) + 1;
    				$asset->save();

    				$status = 'success';
    				$message = 'Thanks for letting us know you\'ve reached out manually';
    			}
            }

        } else {
            $status = 'error';
            $message = 'A contact needs to be added to the story first';
        }

        return Redirect::to('admin/stories/?decision='.$decision)->with([
            'note' => $message,
            'note_type' => $status
        ]);
    }

	/**
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function contactMade(Request $request, $alpha_id){
		$isJson = $request->ajax();

		$story = Story::where('alpha_id', $alpha_id)->first();
		$story->contact_made = 1;
		$story->save();

		if ($isJson) {
			return response()->json([
				'status' => 'success',
				'message' => 'Contact updated',
				'story_alpha_id' => $alpha_id,
			]);
		} else {
			return Redirect::to('admin/stories/?decision=' .  Cookie::get('sniffr_admin_decision') . '&state=' .  Cookie::get('sniffr_admin_state'))
				->with([
					'note' => 'Story Updated',
					'note_type' => 'success',
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
        $story = Story::where('alpha_id', $id)->first();

        if (!$story) {
            abort(404);
        }

        if(CollectionStory::isStoryLicensed($story->id)) {
            return Redirect::back()->with([
                'note' => 'Cannot delete story that is currently being licensed',
                'note_type' => 'error'
            ]);
        }

        CollectionStory::where('story_id', $story->id)->delete();
        //TODO - EMAIL Existing quotes pending/offered that story has been removed from Sniffr.

        $story->destroy($story->id);

        return Redirect::to('admin/stories')->with([
            'note' => 'Successfully Deleted Story',
            'note_type' => 'success'
        ]);
    }
}
