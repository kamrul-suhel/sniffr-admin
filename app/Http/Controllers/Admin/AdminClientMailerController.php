<?php

namespace App\Http\Controllers\Admin;

use App\Traits\FrontendResponse;
use App\Traits\WordpressAPI;
use Auth;
use Redirect;
use App\User;
use App\Story;
use App\Client;
use App\ClientMailer;
use App\ClientMailerOpen;
use App\Download;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;
use App\Jobs\QueueClientMailer;
use App\Notifications\ClientMailerAlert;

use App\Jobs\QueueStory;

class AdminClientMailerController extends Controller
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
    public function index()
    {

        $mailers = ClientMailer::orderBy('updated_at', 'DESC')->paginate(10);

        $data = [
            'mailers' => $mailers,
            'users' => User::all(),
            'user' => Auth::user(),
            'downloads' => Download::all(),
            'opens' => ClientMailerOpen::all()
        ];

        return view('admin.mailers.index', $data); //return response()->json($formatted_posts);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create_mailer(Request $request)
    {
        if ($request->ajax()) {
            if($request->search){
                $stories = Story::where('title', 'LIKE', '%'.$request->search. '%')
                    ->orWhere('alpha_id', 'LIKE', '%'. $request->search . '%')
                    ->orderBy('date_ingested', 'DESC')
                    ->paginate(12);
            }else{
                $stories = Story::orderBy('date_ingested', 'DESC')
                    ->paginate(12);
            }

            $data = [
                'stories' => $stories
            ];
            return $this->successResponse($data);
        }

        return view('admin.mailers.create');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function refresh()
    {
        //increase execution time
        ini_set('max_execution_time', 1800);

        $version = VideoHelper::quickRandom(); // set random version for cache busting
        $pages = mt_rand(100,200); // set random number over 100 for per page (if needed)

        $posts_publish = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts_draft = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&status=draft&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts_pending = $this->apiRequest('posts?version=' . $version . '&order=desc&per_page=100&status=pending&tags=' . env('UNILAD_WP_TAG_ID'), true);
        $posts = array_merge(array_merge($posts_pending, $posts_publish), $posts_draft);

        // set dispatched for sending response back to ajax
        $dispatched = false;

        // store stories from wordpress in database
        foreach($posts as $post){

            // checks if wp post already exists within sniffr stories
            $story = Story::where([['wp_id', $post->id]])->first();

            if(!$story) {
                QueueStory::dispatch($post, 'new', (Auth::user() ? Auth::user()->id : 0))
                    ->delay(now()->addSeconds(2));
                $dispatched = true;
            } else {
                $storyTime = Carbon::parse($story->date_ingested);
                $postTime = Carbon::parse($post->date);
                $differenceTime = $postTime->diffInSeconds($storyTime);

                // if wp post is updated 5mins after our own story record
                if($differenceTime>150) {
                    QueueStory::dispatch($post, 'update', (Auth::user() ? Auth::user()->id : 0))
                        ->delay(now()->addSeconds(2));
                    $dispatched = true;
                }
            }
        }

        //return Redirect::to('admin/stories'); //return response()->json($formatted_posts);
        return response()->json([
            'status' => 'success',
            'dispatched' => $dispatched,
            'message' => 'all good',
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function checkJobs() {
        $jobs = \DB::table('jobs')->where('payload', 'LIKE' , '%QueueStory%')->count();
        return response()->json([
            'status' => 'success',
            'jobs' => $jobs,
            'message' => 'all good',
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $stories = json_decode($request->stories, true);
        $videos = json_decode($request->videos, true);

        if ($stories || $videos) {
            $mailer = new ClientMailer();
            $mailer->alpha_id = VideoHelper::quickRandom();
            $mailer->user_id = (Auth::user() ? Auth::user()->id : NULL);
            $mailer->active = 1;
            $mailer->save();

            $mailer->stories()->sync($stories);
            $mailer->videos()->sync($videos);

            return response()->json([
                'status' => 'success',
                'mailer_id' => $mailer->id,
                'message' => 'all good',
            ]);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'dammit'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function stats($id)
    {
        $mailer = ClientMailer::find($id);

        $downloads = Download::where([['mailer_id', $id]])
			->orderBy('created_at', 'DESC')
			->get();

        $data = [
            'headline' => '<i class="fa fa-bar-chart"></i> Stats for Mailer Id ' . $mailer->alpha_id,
            'mailer' => $mailer,
            'post_route' => url('admin/mailers/stats'),
            'button_text' => 'Send Client Mailer',
            'user' => Auth::user(),
            'clients' => Client::all(),
            'downloads' => $downloads,
        ];

        return view('admin.mailers.stats', $data);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $mailer = ClientMailer::find($id);

        $clients = User::where('role', 'client')
			->orWhere('role','client_admin')
			->orderBy('created_at', 'DESC')
			->get();

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Review Client Mailer',
            'mailer' => $mailer,
            'post_route' => url('admin/mailers/update'),
            'button_text' => 'Send Client Mailer',
            'user' => Auth::user(),
            'users' => User::all(),
            'clients' => $clients,
        ];

        return view('admin.mailers.edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $mailer = ClientMailer::findOrFail($id);

        if (Input::get('note')) {
            $mailer->note = Input::get('note');
        }

        if (Input::get('clients')) {
            $mailer->users()->sync(Input::get('clients'));
        }

        $mailer->user_id = (Input::get('user_id') ? Input::get('user_id') : 0);

        $mailer->save();

        $mailer_status = 'Saved';

        // If send downloaded (rather than just saved) then queue downloaded to send
        if (Input::get('send_mailer') == 1) {
            $mailer_status = 'Sent';

            // Slack notification (WIP: currently doesn't work)
            // if (env('APP_ENV') == 'prod') {
            //     $downloaded->notify(new ClientMailer($downloaded));
            // }

            // set sent_at
            $mailer->sent_at = now();
            $mailer->save();

            // send downloaded to selected clients (actually users which are linked to clients) via email
            foreach ($mailer->users()->get() as $client) {
                $user = User::find($client->id);
                $mailer->users()->where('user_id', $client->id)->update(['sent_at' => now(), 'user_client_id' => $user->client_id]);
                QueueClientMailer::dispatch($client->id, $mailer->id);
            }
        }

        return Redirect::to('admin/mailers')->with([
            'note' => 'Successfully ' . $mailer_status . ' Client Mailer!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $mailer = ClientMailer::find($id);

        if (!$mailer) {
            abort(404);
        }

        $mailer->destroy($id);

        return Redirect::to('admin/mailers')->with([
            'note' => 'Successfully Deleted Client Mailer',
            'note_type' => 'success'
        ]);
    }
}
