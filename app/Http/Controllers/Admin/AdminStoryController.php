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
                QueueStory::dispatch($story_wp, 'new', (Auth::user() ? Auth::user()->id : 0))
                    ->delay(now()->addSeconds(5));
            } else {
                $storyTime = Carbon::parse($story_find->date_ingested);
                $postTime = Carbon::parse($story_wp['date']);
                $differenceTime = $postTime->diffInSeconds($storyTime);

                // if wp post is updated 5mins after our own story record
                if($differenceTime>150) {
                    QueueStory::dispatch($story_wp, 'update', (Auth::user() ? Auth::user()->id : 0))
                        ->delay(now()->addSeconds(5));
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
