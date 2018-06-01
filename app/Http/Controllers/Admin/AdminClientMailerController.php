<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use App\Asset;
use App\User;
use App\Story;
use App\Video;
use App\Client;
use App\Comment;
use App\ClientMailer;
use App\Download;
use App\Libraries\TimeHelper;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Carbon\Carbon as Carbon;
use App\Jobs\QueueClientMailer;
use App\Notifications\ClientMailerAlert;

class AdminClientMailerController extends Controller
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
    public function index(){

        $mailers = ClientMailer::orderBy('updated_at', 'DESC')->paginate(10);

        $data = [
            'mailers' => $mailers,
            'users' => User::all(),
            'user' => Auth::user(),
            'downloads' => Download::all()
        ];

        return view('admin.mailers.index', $data); //return response()->json($formatted_posts);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create_old()
    {
        // Need to get details of stories from ajax call

        $data = [
            'post_route' => url('admin/mailers/store'),
            'button_text' => 'Add New Client Mailer',
            'user' => Auth::user(),
            'users' => User::all(),
            'stories' => Story::all()
        ];

        return view('admin.mailers.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function create(Request $request)
    {
        $stories = json_decode($request->stories,true);

        if($stories){
            $mailer = new ClientMailer();
            $mailer->alpha_id = VideoHelper::quickRandom();
            $mailer->user_id = (Auth::user() ? Auth::user()->id : NULL);
            $mailer->active = 1;
            $mailer->save();
            $mailer->stories()->sync(json_decode($request->stories,true));
        }

        if($stories){
            return response()->json(['status' => 'success', 'mailer_id' => $mailer->id, 'message' => 'all good']);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'dammit']);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function stats($id)
    {
        $mailer = ClientMailer::find($id);

        $users = User::where([['role', 'client']])
        ->orderBy('created_at', 'DESC')
        ->get();

        $downloads = Download::where([['mailer_id', $id]])
        ->orderBy('created_at', 'DESC')
        ->get();

        $data = [
            'headline' => '<i class="fa fa-bar-chart"></i> Stats for Mailer Id '.$mailer->alpha_id,
            'mailer' => $mailer,
            'post_route' => url('admin/mailers/stats'),
            'button_text' => 'Send Client Mailer',
            'user' => Auth::user(),
            'users' => $users,
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

        $clients = User::where([['role', 'client']])
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

        return view('admin.mailers.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $mailer = ClientMailer::findOrFail($id);

        if(Input::get('note')) {
            $mailer->note = Input::get('note');
        }

        if(Input::get('clients')) {
            $mailer->users()->sync(Input::get('clients'));
        }

        $mailer->user_id = (Auth::user() ? Auth::user()->id : $mailer->user_id);

        $mailer->save();

        $mailer_status = 'Saved';

        // If send mailer (rather than just saved) then queue mailer to send
        if(Input::get('send_mailer')==1) {
            $mailer_status = 'Sent';

            // Slack notification (WIP: currently doesn't work)
            // if (env('APP_ENV') == 'prod') {
            //     $mailer->notify(new ClientMailer($mailer));
            // }

            // set sent_at
            $mailer->sent_at = now();
            $mailer->save();

            // send mailer to selected clients (actually users which are linked to clients) via email
			foreach($mailer->users()->get() as $client) {
                $user = User::find($client->id);
                $mailer->users()->where('user_id', $client->id)->update(['sent_at' => now(), 'user_client_id' => $user->client_id]);
				QueueClientMailer::dispatch($client->id, $mailer->id);
			}
        }

        return Redirect::to('admin/mailers')->with([
            'note' => 'Successfully '.$mailer_status.' Client Mailer!',
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

        if(!$mailer){
            abort(404);
        }

        $mailer->destroy($id);

        return Redirect::to('admin/mailers')->with([
            'note' => 'Successfully Deleted Client Mailer',
            'note_type' => 'success'
        ]);
    }
}
