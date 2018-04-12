<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Session;
use Illuminate\Http\Request;
use Validator;
use Redirect;
use App\Page;
use App\Menu;
use App\VideoCategory;
use Illuminate\Support\Facades\Input;

/**
 * Class ThemeAuthController
 * @package App\Http\Controllers
 */
class ThemeAuthController extends Controller
{
    /**
     * @param  $data []
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * @param  $data []
     * @return User
     */
    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function login_form()
    {
        if (!Auth::guest()) {
            return Redirect::to('/');
        }

        $data = [
            'type' => 'login',
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::auth', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login()
    {
        $email_login = [
            'email' => Input::get('email'),
            'password' => Input::get('password')
        ];

        $username_login = [
            'username' => Input::get('email'),
            'password' => Input::get('password')
        ];

        if (Auth::attempt($email_login) || Auth::attempt($username_login)) {
            if (Auth::user()->role == 'admin' || Auth::user()->role == 'manager' || Auth::user()->role == 'editorial') {
                $redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/admin';
                return Redirect::to($redirect);
            } elseif (Auth::user()->role == 'client') {
                $redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/client/videos';
                if (Auth::user()->username == 'dailymail') {
                    $redirect = '/client/dashboard';
                }
                return Redirect::to($redirect);
            }

            $redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/';
            return Redirect::to($redirect)->with([
                'note' => 'You have been successfully logged in.', 'note_type' => 'success'
            ]);
        }

        $redirect = (Input::get('redirect', false)) ? '?redirect=' . Input::get('redirect') : '';
        // auth failure! redirect to login with errors
        return Redirect::to('login' . $redirect)->with([
            'note' => 'Invalid login, please try again.', 'note_type' => 'error'
        ]);
	}

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
	public function logout(){
		Auth::logout();
        Session::flush();
		return Redirect::to('/')->with(array('note' => 'You have been successfully logged out', 'note_type' => 'success'));
	}

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function password_reset()
	{
		$data = [
		    'type' => 'forgot_password',
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => config('settings.payments'),
			'video_categories' => VideoCategory::all(),
			'theme_settings' => config('settings.theme'),
			'pages' => Page::where('active', '=', 1)->get(),
        ];
		return view('Theme::auth', $data);
	}

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
	public function password_request()
	{
		$credentials = ['email' => Input::get('email')];
		$response = Password::sendResetLink($credentials, function($message){
			$message->subject('Password Reset Info');
		});

		switch ($response)
		{
			case PasswordBroker::RESET_LINK_SENT:
				return Redirect::to('login')->with(array('note' => trans($response), 'note_type' => 'success'));

			case PasswordBroker::INVALID_USER:
				return redirect()->back()->with(array('note' => trans($response), 'note_type' => 'error'));
		}
	}

    /**
     * @param $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function password_reset_token($token)
	{
		$data = [
			'type' => 'reset_password',
			'token' => $token,
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => config('settings.payments'),
			'video_categories' => VideoCategory::all(),
			'theme_settings' => config('settings.theme'),
			'pages' => Page::where('active', '=', 1)->get(),
        ];
	  return view('Theme::auth', $data);
	}

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function password_reset_post(Request $request)
    {
        $credentials = $credentials = array('email' => Input::get('email'), 'password' => Input::get('password'), 'password_confirmation' => Input::get('password_confirmation'), 'token' => Input::get('token'));

        $response = Password::reset($credentials, function ($user, $password) {
            $user->password = \Hash::make($password);
            $user->save();
        });

        switch ($response) {
            case PasswordBroker::PASSWORD_RESET:
                return Redirect::to('login')->with(array('note' => 'Your password has been successfully reset. Please login below', 'note_type' => 'success'));

            default:
                return redirect()->back()->with(array('note' => trans($response), 'note_type' => 'error'));
        }
    }
}
