<?php

namespace App\Http\Controllers\Admin;

use App\ClientMailer;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Jobs\Auth\QueueEmailClient;
use App\Libraries\VideoHelper;
use Auth;
use Password;
use Carbon\Carbon;
use Hash;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Redirect;
use App\Client;
use App\User;
use App\Libraries\ImageHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminUsersController extends Controller
{
    use ResetsPasswords;

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function index()
	{
        $search_value = Input::get('s');

        if ((!empty($search_value))&&(Auth::user()->role != 'client')) {
            $users = User::where('username', 'LIKE', '%' . $search_value . '%')
                ->orWhere('email', 'LIKE', '%' . $search_value . '%')
                ->orderBy('created_at', 'desc')->get();
        } elseif((Auth::user()->role == 'client')&&(Auth::user()->client()->account_owner_id == Auth::user()->id)) {
            $users = User::where('client_id', Auth::user()->client_id)->get();
        } else {
            $users = User::all();
        }

        return view('admin.users.index', [
            'users' => $users
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $clients = Client::get();

        $data = [
            'post_route' => url('admin/user/store'),
            'admin_user' => Auth::user(),
            'button_text' => 'Create User',
            'clients' => $clients,
            'user' => null
        ];

        return view('admin.users.create_edit', $data);
    }

    /**
     * @param CreateUserRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateUserRequest $request)
    {
        $user = new User();
        $user->username = preg_replace('/([^@]*).*/', '$1', $request->input('email')).'_'.VideoHelper::quickRandom();
        $user->email = $request->input('email');

        if (!$request->input('password')) {
            $user->password = Hash::make(VideoHelper::quickRandom());
        } else {
            $user->password = Hash::make($request->input('password'));
        }

        $role = (Auth::user()->role == 'client') ? 'client' : $request->input('role');

        $user->role = $role;
        $user->active = $request->input('active', 0);

        $client_id = (Auth::user()->role == 'client') ? Auth::user()->client_id : $request->input('client_id', null);

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
                ($client_id ? $client_id : 0),
                $request->get('email'),
                $request->get('full_name') ?? 'New User',
                $token
            );
        } else {
            if (!$request->input('password', null)) {
                Password::sendResetLink(['email' => $request->input('email')]);
            }
        }

        $redirect_path = (Auth::user()->role == 'client') ? 'client/users' : 'admin/users';

        return Redirect::to($redirect_path)->with([
            'note' => 'Successfully Created New User',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param User $user
     * @return int
     */
    protected function deleteExisting(User $user)
    {
        return \DB::table('password_resets')
            ->where('email', $user->getEmailForPasswordReset())
            ->delete();
    }

    /**
     * @param $email
     * @param $token
     * @return array
     */
    protected function getPayload($email, $token)
    {
        return ['email' => $email, 'token' => $token, 'created_at' => new Carbon];
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $user = User::find($id);

        $data = [
            'clients' => Client::get(),
            'post_route' => url('admin/user/update'),
            'user' => $user,
            'button_text' => 'Update User',
        ];

        return view('admin.users.create_edit', $data);
    }

    /**
     * @param UpdateUserRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateUserRequest $request)
    {

        $user = User::find($request->get('id'));
        if(!$user) {
            abort(404);
        }

        $user->username = (!$user->username ? preg_replace('/([^@]*).*/', '$1', $request->input('email')).'_'.VideoHelper::quickRandom() : $user->username);
        $user->email = $request->input('email', $user->email);
        $user->full_name = $request->input('full_name', $user->full_name);
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

        return redirect()->route('users.edit', ['id' => $user->id])->with([
            'note' => 'Successfully Updated User Settings',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param Request $request
     * @param int $user_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function storiesSent(Request $request, $user_id)
    {
        $user = User::find($user_id);
        $client_mailers = ClientMailer::with('stories')->whereHas('users', function ($query) use ($user_id) {
            $query->where('users.id', '=', $user_id);
        })->orderBy('sent_at', 'DESC')->get();

        return view('admin.users.stories_sent', [
            'client_mailers' => $client_mailers,
            'user' => $user,
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        User::destroy($id);
        return Redirect::to('admin/users')->with([
            'note' => 'Successfully Deleted User',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $email
     * @param $user
     * @return mixed
     */
    public function getToken($email, $user)
    {
        $token = app('auth.password.broker')->createToken($user);

        \DB::table('password_resets')->insert($this->getPayload($email, $token));

        return $token;
    }
}
