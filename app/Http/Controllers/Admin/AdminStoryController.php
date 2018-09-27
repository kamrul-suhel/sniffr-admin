<?php

namespace App\Http\Controllers\Admin;

use App\Audit;
use App\CollectionStory;
use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use App\Jobs\Quotes\QueueEmailRetractQuote;
use RedditAPI;
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

    protected $audit;

    public function __construct(Request $request, Audit $audit)
    {
        $this->middleware(['admin:admin,manager,editorial']);

        $this->audit = $audit;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
			'user' => Auth::user(),
			'users' => User::where('client_id', '=', null)->get(),
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

        return redirect('/admin/licenses/stories?state=content-sourced--unapproved')->with([
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

		$logs = $this->audit->where('auditable_id', $asset->id)
			->where('auditable_type', 'App\Story')
			->orderBy('created_at', 'desc')
			->paginate(10);

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Story',
            'asset' => $asset,
			'asset_type' => 'story',
            'post_route' => url('admin/stories/update'),
            'button_text' => 'Save Draft',
            'decision' => $decision,
	        'logs' => $logs,
            'user' => Auth::user(),
			'users' => User::where('client_id', '=', null)->get(),
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

		if(Input::get('wp_id')){
			$story->wp_id = Input::get('wp_id');
		}


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
			'users' => User::where('client_id', '=', null)->get(),
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

        // sync to WP + custom message +s whether to remove from view (depending on state)
        switch (true) {
            case ($state == 'unapproved'):
				$remove = 'yes';
                break;
            case ($state == 'rejected'):
				$remove = 'yes';
                break;
            case ($state == 'approved'):
				$remove = 'yes';
                // make initial contact (will need to add fb/insta in future)
                if($story_id && $story->contact->canAutoBump()){
                    QueueBump::dispatch($story_id);
                }
                break;
			case ($state == 'licensing'):
				$remove = 'yes';
				// Made contact
				$story->contact_made = 1;
				$story->contacted_at = now();
				break;
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
            return redirect()->back()
                ->with([
                    'note' => 'Story Updated',
                    'note_type' => 'success',
                ]);
        }
    }

    public function wpSync(Request $request, $alpha_id){
		$story = Story::where('alpha_id', $alpha_id)->first();
		$message = 'Cannot find that story';

		if($story->wp_id) {
			QueueStory::dispatch($alpha_id, 'sync', (!empty(Auth::id()) ? Auth::id() : 0));
			$message = 'Updating content from WP';
		}

		return redirect()->back()
			->with([
				'note' => $message,
				'note_type' => 'success',
			]);
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

        return redirect()->back()->with([
            'note' => $message,
            'note_type' => $status
        ]);
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

        $offeredAndPendingStories = CollectionStory::where('story_id', $story->id)
            ->orWhere('status', 'purchased')
            ->where('status', 'offered');

        if($offeredAndPendingStories->count() > 0) {
            foreach($offeredAndPendingStories->get() as $emailForDeletion) {
                QueueEmailRetractQuote::dispatch(
                    $emailForDeletion,
                    'story'
                );
            }
        }

        CollectionStory::where('story_id', $story->id)->delete();
        $story->destroy($story->id);

        return redirect('admin/licenses/stories')->with([
            'note' => 'Successfully Deleted Story',
            'note_type' => 'success'
        ]);
    }
}
