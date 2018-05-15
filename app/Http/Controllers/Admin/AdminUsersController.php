<?php

namespace App\Http\Controllers\Admin;

use Hash;
use Auth;
use Redirect;
use App\Client;
use App\User;
use App\Libraries\ImageHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminUsersController extends Controller
{
    /**
     * AdminUsersController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware(['admin:admin']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function index()
	{
        $search_value = Input::get('s');

        if (!empty($search_value)) {
            $users = User::where('username', 'LIKE', '%' . $search_value . '%')
                ->orWhere('email', 'LIKE', '%' . $search_value . '%')
                ->orderBy('created_at', 'desc')->get();
        } else {
            $users = User::all();
        }

        $data = [
            'users' => $users
        ];
        return view('admin.users.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $clients = Client::get();

        $data = [
            'post_route' => url('admin/user/store'),
            'user' => Auth::user(),
            'button_text' => 'Create User',
            'clients' => $clients
        ];

        return view('admin.users.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $input = Input::all();

        if (Input::hasFile('avatar')) {
            $input['avatar'] = ImageHandler::uploadImage(Input::file('avatar'), 'avatars');
        } else {
            $input['avatar'] = 'default.jpg';
        }

        $input['password'] = Hash::make('password');

        User::create($input);

        return Redirect::to('admin/users')->with([
            'note' => 'Successfully Created New User',
            'note_type' => 'success'
        ]);
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
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $input = Input::all();
        $id = $input['id'];
        $user = User::find($id);

        if (Input::hasFile('avatar')) {
            $input['avatar'] = ImageHandler::uploadImage(Input::file('avatar'), 'avatars');
        } else {
            $input['avatar'] = $user->avatar;
        }

        if (empty($input['active'])) {
            $input['active'] = 0;
        }

        if ($input['password'] == '') {
            $input['password'] = $user->password;
        } else {
            $input['password'] = Hash::make($input['password']);
        }

        $user->update($input);

        return Redirect::to('admin/user/edit/' . $id)->with([
            'note' => 'Successfully Updated User Settings',
            'note_type' => 'success'
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
}
