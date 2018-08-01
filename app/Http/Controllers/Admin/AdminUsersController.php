<?php

namespace App\Http\Controllers\Admin;

use App\ClientMailer;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Jobs\Auth\QueueEmailClient;
use Password;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Client;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminUsersController extends Controller
{
    use ResetsPasswords;

    protected $user, $client, $clientMailer;

    /**
     * AdminUsersController constructor.
     * @param User $user
     * @param Client $client
     * @param ClientMailer $clientMailer
     */
    public function __construct(User $user, Client $client, ClientMailer $clientMailer)
    {
        $this->middleware('admin');

        $this->user = $user;

        $this->clientMailer = $clientMailer;

        $this->client = $client;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $search_value = request()->get('s');

        if ((!empty($search_value)) && (auth()->user()->role != 'client')) {
            $users = $this->user->where('username', 'LIKE', '%' . $search_value . '%')
                ->orWhere('email', 'LIKE', '%' . $search_value . '%')
                ->orderBy('created_at', 'desc')->get();
        } elseif ((auth()->user()->role == 'client') && (auth()->user()->client()->account_owner_id == auth()->user()->id)) {
            $users = $this->user->where('client_id', auth()->user()->client_id)->get();
        } else {
            $users = $this->user->all();
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
        $clients = $this->client->get();

        $data = [
            'post_route' => url('admin/user/store'),
            'admin_user' => auth()->user(),
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
        $data = request()->all();

        $user = $this->user->createUser($data);

        if (in_array($user->role, ['client_owner', 'client_admin', 'client'])) {
            $token = $this->getToken($user->email, $user);

            QueueEmailClient::dispatch(
                $user->client_id,
                $user->email,
                $user->full_name,
                $token
            );
        } else {
            if ($data['password']) {
                Password::sendResetLink(['email' => $user->email]);
            }
        }

        return redirect()->to('admin/users')->with([
            'note' => 'Successfully Created New User',
            'note_type' => 'success'
        ]);
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
        $user = $this->user->find($id);

        $data = [
            'clients' => $this->client->get(),
            'post_route' => url('admin/user/update'),
            'user' => $user,
            'button_text' => 'Update User',
        ];

        return view('admin.users.create_edit', $data);
    }

    /**
     * @param UpdateUserRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $data = request()->all();

        $user = $this->user->find($id);

        $user->updateUser($data);

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
        $user = $this->user->find($user_id);
        $client_mailers = $this->clientMailer->with('stories')->whereHas('users', function ($query) use ($user_id) {
            $query->where('users.id', '=', $user_id);
        })->orderBy('sent_at', 'DESC')->get();

        return view('admin.users.stories_sent', [
            'client_mailers' => $client_mailers,
            'user' => $user,
        ]);
    }

    /**
     * @param $id
     * @return mixed
     * @throws \Exception
     */
    public function destroy($id)
    {
        $user = $this->user->find($id);

        if($user->activeLicences() > 0) {
            return redirect()->back()->with([
                'note' => 'Cannot delete user that is currently licensing assets',
                'note_type' => 'error'
            ]);
        }

        $user->deleteUsersCollections();

        $user->delete();

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
