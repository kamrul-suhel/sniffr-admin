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
use Illuminate\Support\Collection;
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

    private function getCurl(){

        $WP_USERNAME = "sniffr-api";
        $WP_PASSWORD = "5uc(z(QqtSvH#gusJqkQwgMU";

        // using http basic auth
        $auth_header = ["Authorization: Basic " . base64_encode($WP_PASSWORD . ":" . $WP_PASSWORD)];

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_HTTPHEADER => $auth_header
        ));

        return $curl;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){

        $curl = $this->getCurl();

        $WP_API_URL = 'https://testing.unilad.co.uk/wp-json/wp/v2';

        // get curl request
        // /posts?filter[tag]=wedding&filter[status]=draft&per_page=3&page=1  OR /users/me
        $hello = curl_setopt($curl, CURLOPT_URL, $WP_API_URL . '/posts?tags=37777');
        $raw_posts = curl_exec($curl) or abort(502);
        $raw_posts = json_decode($raw_posts);

        //dd($raw_posts);

        $stories = [];

        foreach($raw_posts as $post){

            // create array for curl stories objects
            $curpost = [
                "wp_id" => $post->id,
                "status" => $post->status,
                "title" => trim(strip_tags($post->title->rendered)),
                "description" => trim(strip_tags($post->content->rendered)),
                "url" => $post->link,
                "date" => Carbon::parse($post->date)->formatLocalized('%d %B %Y')
            ];

            // get curl for author
            if($post->author) {
                curl_setopt($curl, CURLOPT_URL, $WP_API_URL . '/users/' . $post->author);
                $raw_author = curl_exec($curl) or abort(502);
                $raw_author = json_decode($raw_author);
                $curpost["author"] = ($raw_author->name ? $raw_author->name : '');
            } else {
                $curpost["author"] = '';
            }

            // get curl for featured image
            if($post->featured_media) {
                curl_setopt($curl, CURLOPT_URL, $WP_API_URL . '/media/' . $post->featured_media);
                $raw_media = curl_exec($curl) or abort(502);
                $raw_media = json_decode($raw_media);
                $curpost["thumb"] = ($raw_media->source_url ? preg_replace("/^http:/i", "https:", $raw_media->source_url) : '');
            } else {
                $curpost["thumb"] = '';
            }

            // Excerpt the post content.
            $curpost["excerpt"] = substr($curpost["description"],0,700).'...';

            //get the featured image link if present
            // if (!is_null($post->better_featured_image)){
            //     $curpost["thumb"] = $post->better_featured_image->media_details->sizes->medium->source_url;
            // }

            //get the post categories
            $cat_list = [];
            foreach($post->categories as $tax_obj){
                $cat_list[] = $tax_obj;
            }
            $curpost["categories"] = $cat_list;

            $stories[] = $curpost;
        }

        //dd($stories);

        // Would be good to sync up stories table with
        //$stories = Story::orderBy('updated_at', 'DESC')->paginate(10);

        // Below is for future blade template
        // @foreach($users as $user2)
        //         @if(!empty($user2->id == $story->user_id))
        //             {{ $user2->username }}
        //         @endif
        //     @endforeach

        $data = [
            'stories' => $stories,
            'users' => User::all(),
            'user' => Auth::user()
        ];

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
