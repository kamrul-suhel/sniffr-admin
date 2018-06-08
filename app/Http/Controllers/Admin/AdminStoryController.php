<?php

namespace App\Http\Controllers\Admin;

use App\Traits\FrontendResponse;
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

    private function getToken()
    {
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL') . $this->token_path . '?username=' . env('UNILAD_WP_USER') . '&password=' . env('UNILAD_WP_PASS'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        if (!$response) {
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
     * @param string $featured_media
     * @param string $description
     * @return array
     */
     public function createAssets($featured_media, $description) {
         $asset_ids = [];

         // get featured image
         if($featured_media != 0) {

             // check if wp asset already exists within db
             $checkAsset = Asset::where([['wp_asset_id', $featured_media]])->first();
             if(!$checkAsset) {
                 // get WP asset details
                 $thumb = $this->apiRequest('media/' . $featured_media, true);

                 // create new asset in db
                 $asset = new Asset();
                 $asset->alpha_id = VideoHelper::quickRandom();
                 $asset->wp_asset_id = $thumb->id;
                 $asset->mime_type = $thumb->mime_type;
                 $asset->url = preg_replace("/^http:/i", "https:", $thumb->source_url); //might be useful to check if URL has changed
                 $asset->save();

                 // save asset id for syncing story->assets relationships
                 $asset_ids[] = $asset->id;
             } else {
                 $asset_ids[] = $checkAsset->id;
             }
         }

         // get all other assets
         if($description){
             // get the JW Player unique code
             $jwPlayerCode = $this->getJwPlayerCode($description);

             if ($jwPlayerCode) {
                 // get the JW Player video URL
                 $jwVideoFileUrl = $this->getJwPlayerFile($jwPlayerCode);

                 // check if JW Player video already exists in db
                 $asset = Asset::where([['url', $jwVideoFileUrl]])->first();
                 if (!$asset){
                     $asset = new Asset();
                     $asset->alpha_id = VideoHelper::quickRandom();
                     $asset->url = $jwVideoFileUrl;
                     $asset->jw_player_code = $jwPlayerCode;
                     $asset->mime_type = 'video/mp4';
                     $asset->thumbnail = 'https://assets-jpcust.jwpsrv.com/thumbs/' . $jwPlayerCode . '.jpg';
                     $asset->save();
                 }

                 // save asset id for syncing story->assets relationships
                 $asset_ids[] = $asset->id;
             }

             preg_match_all('/wp-image-(\d+)/', $description, $imageMatches);

             // Fetch all the assets from wp
             if(isset($imageMatches[1])){
                 foreach($imageMatches[1] as $key => $imageId){

                     // check if wp asset already exists within db
                     $checkAsset = Asset::where([['wp_asset_id', $imageId]])->first();
                     if(!$checkAsset) {
                         // get WP asset details
                         $image = $this->apiRequest('media/' . $imageId, true);

                         if($image->source_url) {
                             // create new asset in db
                             $asset = new Asset();
                             $asset->alpha_id = VideoHelper::quickRandom();
                             $asset->wp_asset_id = $image->id;
                             $asset->mime_type = $image->mime_type;
                             $asset->url = preg_replace("/^http:/i", "https:", $image->source_url); //might be useful to check if URL has changed
                             $asset->save();

                             // save asset id for syncing story->assets relationships
                             $asset_ids[] = $asset->id;
                         }
                     } else {
                         $asset_ids[] = $checkAsset->id;
                     }
                 }
             }
         }

         return $asset_ids;
     }

    /**
     * @param array $story_data
     * @return array
     */
    public function updateStories($story_data, $type = 'new') {

        // determine if adding new story & updating
        if($type == 'new') {
            $story = new Story();
            $story->alpha_id = VideoHelper::quickRandom();
            $story->wp_id = $story_data['wp_id'];
            $story->active = 1;
        } else {
            $story = Story::where([['wp_id', $story_data['wp_id']]])->first();
        }

        // get assets from curl request (as a function)
        $asset_ids = $this->createAssets($story_data['featured_media'], $story_data['description']);
        if(count($asset_ids)) {
            $story->thumb = (Asset::find($asset_ids[0])->url ? Asset::find($asset_ids[0])->url : NULL);
        }

        // get author from curl request
        if($story_data['author']) {
            $author = $this->apiRequest('users/' . $story_data['author']);
            $story->author = isset($author->name) ? $author->name : NULL;
        }

        $story->excerpt = ($story_data['excerpt'] ? $story_data['excerpt'] : NULL);
        $story->date_ingested = $story_data['date'];
        $story->categories = implode("|",$story_data['categories']);
        $story->status = $story_data['status'];
        $story->state = 'licensed';
        $story->title = $story_data['title'];
        $story->url = $story_data['url'];
        $story->description = ($story_data['description'] ? $story_data['description'] : NULL);
        $story->user_id = (Auth::user() ? Auth::user()->id : 0);

        $story->save();
        $story->assets()->sync($asset_ids);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function refresh()
    {
        //increase execution time
        ini_set('max_execution_time', 1800);

        $posts_pending = $this->apiRequest('posts?status=pending&tags='.env('UNILAD_WP_TAG_ID'), true);
        $posts_publish = $this->apiRequest('posts?status=publish&tags='.env('UNILAD_WP_TAG_ID'), true);
        $posts = array_merge($posts_pending, $posts_publish);

        $stories_wp = [];
        $story_ids = [];

        foreach($posts as $post){
            // create array for curl stories objects
            $excerpt = preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', substr(trim(strip_tags($post->excerpt->rendered)),0,700));

            $curpost = [
                "wp_id" => $post->id,
                "status" => $post->status,
                "title" => trim(strip_tags($post->title->rendered)),
                "excerpt" => $excerpt,
                "description" => preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $post->content->rendered),
                "url" => $post->link,
                "date" => Carbon::parse($post->date)->format('Y-m-d H:i:s'),
                "author" => ''
            ];

            // find assets within post content (old way but could be useful in the future)
            //$curpost["assets"] = $this->getUrls(preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $post->content->rendered));

            //get the post categories
            $cat_list = [];
            foreach($post->categories as $tax_obj){
                $cat_list[] = $tax_obj;
            }
            $curpost["categories"] = $cat_list;

            $curpost["featured_media"] = $post->featured_media;
            $curpost["author"] = $post->author;
            $stories_wp[] = $curpost;
            $story_ids[] = $post->id;
        }

        // store stories from wordpress in database
        foreach($stories_wp as $story_wp){

            // checks if wp post already exists within sniffr stories
            $story_find = Story::where([['wp_id', $story_wp['wp_id']]])->first();

            if(!$story_find) {
                $this->updateStories($story_wp, 'new');
            } else {
                $storyTime = Carbon::parse($story_find->date_ingested);
                $postTime = Carbon::parse($story_wp['date']);
                $differenceTime = $postTime->diffInSeconds($storyTime);

                // if wp post is updated 5mins after our own story record
                if($differenceTime>300) {
                    $this->updateStories($story_wp, 'update');
                }
            }
        }

        return Redirect::to('admin/stories'); //return response()->json($formatted_posts);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        $stories = new Story;
        $stories = $stories->orderBy('date_ingested', 'DESC')->paginate(10);
        $videos = Video::where([['state', 'licensed'], ['file', '!=', NULL]])->orderBy('licensed_at', 'DESC')->paginate(10);

        $data = [
            'stories' => $stories,
            'videos' => $videos,
        ];

        /*'users' => User::all(),
            'user' => Auth::user()*/

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
     * @return \Illuminate\Http\RedirectResponse
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

    /**
     * @param string $postBody
     * @return null|string
     */
    private function getJwPlayerCode(string $postBody)
    {
        $reg = 'jwplayer_([^_]+)';

        if ($c = preg_match_all("/" . $reg . "/is", $postBody, $matches)) {
            $alphanum = $matches[1][0];
            return $alphanum;
        }
        return null;
    }

    /**
     * @param string $jwPlayerCode
     */
    private function getJwPlayerFile(string $jwPlayerCode)
    {
        $response = \GuzzleHttp\json_decode(file_get_contents('https://content.jwplatform.com/feeds/' . $jwPlayerCode . '.json'));

        $sources = $response->playlist[0]->sources;

        $videoUrl = array_filter($sources, function($k) {
            return $k->type == 'video/mp4';
        });

        return end($videoUrl)->file;
    }
}
