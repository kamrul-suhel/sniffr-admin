<?php

namespace App\Http\Controllers\Admin;

use Hash;
use Auth;
use Redirect;

use App\Client;
use App\User;

use App\Libraries\ImageHandler;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class AdminUsersController extends Controller {

    /**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */

	public function index()
	{
        $search_value = Input::get('s');

        if(!empty($search_value)):
            $users = User::where('username', 'LIKE', '%'.$search_value.'%')->orWhere('email', 'LIKE', '%'.$search_value.'%')->orderBy('created_at', 'desc')->get();
        else:
            $users = User::all();
        endif;

		$data = array(
			'users' => $users
			);
		return view('admin.users.index', $data);
	}

    public function create(){
        $data = array(
            'post_route' => url('admin/user/store'),
            'admin_user' => Auth::user(),
            'button_text' => 'Create User',
            );
        return view('admin.users.create_edit', $data);
    }

    public function store(){
        $input = Input::all();

        if(Input::hasFile('avatar')){
            $input['avatar'] = ImageHandler::uploadImage(Input::file('avatar'), 'avatars');
        } else{ $input['avatar'] = 'default.jpg'; }

        $input['password'] = Hash::make('password');

        $user = User::create($input);
        return Redirect::to('admin/users')->with(array('note' => 'Successfully Created New User', 'note_type' => 'success') );
    }

	public function edit($id){
    	$user = User::find($id);

    	$data = array(
    		'user' => $user,
            'clients' => Client::get(),
    		'post_route' => url('admin/user/update'),
    		'admin_user' => Auth::user(),
    		'button_text' => 'Update User',
		);

    	return view('admin.users.create_edit', $data);
    }

    public function update(Request $request){
    	$input = Input::all();
        $id = $input['id'];
        $user = User::find($id);

    	if(Input::hasFile('avatar')){
        	$input['avatar'] = ImageHandler::uploadImage(Input::file('avatar'), 'avatars');
        } else {
            $input['avatar'] = $user->avatar;
        }

        if(empty($input['active'])){
            $input['active'] = 0;
        }

        if($input['password'] == ''){
        	$input['password'] = $user->password;
        } else{ $input['password'] = Hash::make($input['password']); }

    	$user->update($input);

    	return Redirect::to('admin/user/edit/' . $id)->with(array('note' => 'Successfully Updated User Settings', 'note_type' => 'success') );
    }

    public function destroy($id)
    {

        User::destroy($id);
        return Redirect::to('admin/users')->with(array('note' => 'Successfully Deleted User', 'note_type' => 'success') );
    }

}
