<?php

namespace App\Http\Controllers\Client;

use App\Client;
use App\Http\Requests\Company\UpdateUserRequest;
use App\Jobs\QueueEmailClient;
use App\Jobs\QueueEmailCompany;
use App\Libraries\ImageHandler;
use App\Libraries\VideoHelper;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientUserController extends Controller
{

    /**
     * ClientUserController constructor.
     */
    public function __construct()
    {
        $this->middleware('client');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($slug)
    {

        return view('client.users.create_edit')
            ->with('user', null)
            ->with('slug', $slug);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->username = $request->input('username');
        $user->email = $request->input('email');

        if (!$request->input('password')) {
            $password = $request->input('password');
        } else {
            $password = VideoHelper::quickRandom(10);
        }

        $user->password = Hash::make($password);

        $role = (Auth::user()->role == 'client') ? 'client' : $request->input('role');

        $user->role = $role;
        $user->active = $request->input('active', 0);

        $client_id = in_array(Auth::user()->role, ['client_owner', 'client_admin'])
            ? Auth::user()->client_id
            : $request->input('client_id', null);

        $user->client_id = $client_id;
        $user->full_name = $request->input('full_name');
        $user->tel = $request->input('tel');
        $user->job_title = $request->input('job_title');
        $user->avatar = 'default.jpg';

        if ($request->hasFile('avatar')) {
            $user->avatar = ImageHandler::uploadImage($request->file('avatar'), 'avatars');
        }

        $user->save();

        if (in_array($user->role, ['client_owner', 'client_admin', 'client'])) {
            $email = $user->getEmailForPasswordReset();
            $this->deleteExisting($user);

            $token = $this->getToken($email, $user);

            QueueEmailClient::dispatch(
                $client_id,
                $request->get('email'),
                $user->full_name,
                $token
            );
        }

        return redirect('client/profile');
    }

    public function getToken($email, $user)
    {
        $token = app('auth.password.broker')->createToken($user);

        \DB::table('password_resets')->insert($this->getPayload($email, $token));

        return $token;
    }

    protected function getPayload($email, $token)
    {
        return ['email' => $email, 'token' => $token, 'created_at' => new Carbon];
    }

    protected function deleteExisting(User $user)
    {
        return \DB::table('password_resets')
            ->where('email', $user->getEmailForPasswordReset())
            ->delete();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($slug, $user_id)
    {
        $user = User::find($user_id);

        if(!$user && !$user->client->slug == $slug) {
            return redirect('videos');
        }

        return view('client.users.create_edit')
            ->with('user', $user)
            ->with('slug', $slug);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $user = User::find($request->get('id'));
        if(!$user) {
            abort(404);
        }

        $user->username = $request->input('username', $user->username);
        $user->email = $request->input('email', $user->email);
        $user->full_name = $request->input('full_name', $user->first_name);
        $user->tel = $request->input('tel', $user->tel);
        $user->job_title = $request->input('job_title', $user->job_title);

        if ($request->input('password', null)) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->role = $request->input('role', $user->role);
        $user->active = $request->input('active', $user->active);
        if($user->client_id) {
            $user->client_id = $request->input('client_id', $user->client_id);
        }

        if ($request->hasFile('avatar')) {
            $user->avatar = ImageHandler::uploadImage($request->file('avatar'), 'avatars');
        }
        $user->update();
        $user->save();

        return redirect()->back()->with([
            'note' => 'Successfully Updated User Settings',
            'note_type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug, $id)
    {
        $user = User::find($id);

        $user->delete();

        return redirect('client/profile')->with([
            'note' => 'User Deleted',
            'note_type' => 'success',
        ]);
    }
}
