<?php

namespace App\Http\Controllers\Admin;

use App\Download;
use App\Traits\FrontendResponse;
use Auth;
use Validator;
use Redirect;
use App\User;
use App\Story;
use App\Asset;
use App\Video;
use App\Contact;
use App\Client;
use App\ClientMailer;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;

class AdminStoryController extends Controller
{
    use FrontendResponse;

	public $api_path = 'wp-json/wp/v2/';
	public $token_path = 'wp-json/jwt-auth/v1/token';

    protected $rules = [
        'title' => 'required'
    ];

    public function __construct(Request $request)
    {
        $this->middleware(['admin:admin,manager,editorial']);
    }

    private function getToken() {
        $curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL').$this->token_path.'?username='.env('UNILAD_WP_USER').'&password='.env('UNILAD_WP_PASS'));
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POST, 1);

		$response = json_decode(curl_exec($curl));

		curl_close ($curl);

		if(!$response->token){
			exit('Unable to connect');
		}

        return $response->token;
    }

	/**
	 * @get Makes curl request
	 * @param string $request
	 * @param bool $req_token
	 * @return JSON Object
	 */
	private function apiRequest($request, $req_token = false){
		if($req_token){
			$token = $this->getToken();
		}

		$curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL').$this->api_path.$request);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		if($req_token){
			curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$token));
		}

		$response = json_decode(curl_exec($curl)); //or abort(502);
		$err = curl_error($curl);
		curl_close($curl);

		return $response;
	}

    /**
     * @get URLs from string (string maybe a url)
     * @param string $string
     * @return array
     */
    private function getUrls($string) {
        $regex = '/https?\:\/\/[^\" ]+/i';
        preg_match_all($regex, $string, $matches);
        //return (array_reverse($matches[0]));
        return ($matches[0]);
    }

	/**
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function refresh()
	{
		$posts = $this->apiRequest('posts?status=draft&tags=37777', true);

		$stories_wp = [];
		$story_ids = [];

		foreach($posts as $post){
			// create array for curl stories objects
			$curpost = [
				"wp_id" => $post->id,
				"status" => $post->status,
				"title" => trim(strip_tags($post->title->rendered)),
				"excerpt" => substr(preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', trim(strip_tags($post->content->rendered))),0,700).'...',
				"description" => preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $post->content->rendered),
				"url" => $post->link,
				"date" => Carbon::parse($post->date)->format('Y-m-d H:i:s'),
				"author" => ''
			];

			// find assets within post content
			//$curpost["assets"] = $this->getUrls(preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $post->content->rendered));
			if($post->id) {
				// get featured image
				if($post->featured_media != 0) {
					$curpost['assets'][] = $this->apiRequest('media/' . $post->featured_media, true);
				}

				// Get images in text (ignore urls for now)
				preg_match_all('/wp-image-(\d+)/', $curpost['description'], $imageMatches);
				if(isset($imageMatches[1])){
					foreach($imageMatches[1] as $imageId){
						// Fetch all the assets from wp
						$curpost['assets'][] = $this->apiRequest('media/' . $imageId, true);
					}
				}
			}

			// get curl for author
			if($post->author) {
				$author = $this->apiRequest('users/' . $post->author);
				$curpost["author"] = isset($author->name) ? $author->name : '';
			}

			//get the post categories
			$cat_list = [];
			foreach($post->categories as $tax_obj){
				$cat_list[] = $tax_obj;
			}
			$curpost["categories"] = $cat_list;

			$stories_wp[] = $curpost;
			$story_ids[] = $post->id;
		}

		// store stories from wordpress in database
		foreach($stories_wp as $story_wp){

			// checks if wp post already exists within sniffr stories (TO DO: or if wp post has been updated)
			$story_find = Story::where([['wp_id', $story_wp['wp_id']]])->first(); //, ['date', '>', Carbon::now()->subDays(30)->toDateTimeString()]

			if(!$story_find) {
				$story = new Story();

				$asset_ids = [];
				if(isset($story_wp['assets'])){
					foreach($story_wp['assets'] as $key => $asset_wp){
						$asset = new Asset();
						$asset->alpha_id = VideoHelper::quickRandom();
						$asset->url = preg_replace("/^http:/i", "https:", $asset_wp->source_url);
						$asset->save();
						$asset_ids[] = $asset->id;

						if($key === 0){
							$story->thumb = $asset->url; //$asset_ids[1];//$story_wp['url'];
						}
					}
				}

				$story->alpha_id = VideoHelper::quickRandom();
				$story->wp_id = $story_wp['wp_id'];
				$story->excerpt = ($story_wp['excerpt'] ? $story_wp['excerpt'] : NULL);
				$story->author = $story_wp['author'];
				$story->date_ingested = $story_wp['date'];
				$story->categories = implode("|",$story_wp['categories']);
				$story->status = $story_wp['status'];
				$story->state = 'licensed';
				$story->title = $story_wp['title'];
                $story->url = $story_wp['url'];
				$story->description = ($story_wp['description'] ? $story_wp['description'] : NULL);
				$story->user_id = (Auth::user() ? Auth::user()->id : 0);
				$story->active = 1;
				$story->save();
				$story->assets()->sync($asset_ids);
			}
		}

		return Redirect::to('admin/stories'); //return response()->json($formatted_posts);
	}

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        $data = [
            'stories' => Story::all(),
            'users' => User::all(),
            'user' => Auth::user()
        ];
//
//        foreach($data['stories'] as $story){
//			dd($story->assets()->first()-);
//		}


        return view('admin.stories.index', $data); //return response()->json($formatted_posts);
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
