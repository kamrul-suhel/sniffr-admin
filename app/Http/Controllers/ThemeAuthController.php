<?php

namespace App\Http\Controllers;

use App\User;
use App\Traits\FrontendResponser;
use Auth;
use Session;
use Illuminate\Http\Request;
use Validator;
use Redirect;
use App\Page;
use App\Menu;
use App\VideoCategory;
use App\PaymentSetting;
use Illuminate\Support\Facades\Input;
use App\Libraries\ThemeHelper;

/**
 * Class ThemeAuthController
 * @package App\Http\Controllers
 */
class ThemeAuthController extends Controller
{
    use FrontendResponser;
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
        $settings = Setting::first();

        $data = [
            'type' => 'login',
            'menu' => Menu::orderBy('order', 'ASC')->get(),
            'video_categories' => VideoCategory::all(),
            'theme_settings' => ThemeHelper::getThemeSettings(),
            'pages' => Page::where('active', '=', 1)->get(),
            'settings'=> $settings
        ];

        return view('frontend.pages.login.login', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
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
                $redirect = (Input::get('redirect')) ? Input::get('redirect') : '/admin';

                if($request->ajax()){
                    $response_data['redirect_url'] = $redirect;
                    $response_data['error'] = false;
                    $response_data['data'] = 'This is admin';
                    return $this->successResponse($response_data);
                }else{
                    return Redirect::to($redirect);
                }
            } elseif (Auth::user()->role == 'client') {
                $redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/client/videos';
                if (Auth::user()->username == 'dailymail') {
                    $redirect = '/client/dashboard';
                }
                if($request->ajax()){
                    $response_data['redirect_url'] = $redirect;
                    $response_data['error'] = false;
                    return $this->successResponse($response_data);
                }else{
                    return Redirect::to($redirect);
                }
            }

            $redirect = (Input::get('redirect')) ? Input::get('redirect') : '/';
            if($request->ajax()){
                $response_data['redirect_url'] = $redirect;
                $response_data['error'] = false;
                return $this->successResponse($response_data);
            }else {
                return Redirect::to($redirect)->with(array('note' => 'You have been successfully logged in.', 'note_type' => 'success'));
            }
        }

        $redirect = (Input::get('redirect')) ? '?redirect=' . Input::get('redirect') : '';
        // auth failure! redirect to login with errors
        $error = array(
            'note' => 'Invalid login, please try again.',
            'note_type' => 'error'
        );

        if($request->ajax()){
            return $this->errorResponse('Invalid login, please try again.');
        }else{
            return Redirect::to('login' . $redirect)->with($error);
        }
	}

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
	public function logout(Request $request){
		Auth::logout();
        Session::flush();

        if($request->ajax()){
            $data = ['success' => 'You are successfully logout'];
            return $this->successResponse($data);
        }
		return Redirect::to('/')->with(array('note' => 'You have been successfully logged out', 'note_type' => 'success'));
	}

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function password_reset()
	{
        $settings =Setting::first();
		$data = [
		    'type' => 'forgot_password',
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => PaymentSetting::first(),
			'video_categories' => VideoCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
            'settings'  => $settings
        ];
        return view('frontend.pages.login.reset_password', $data);
	}

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function password_request(Request $request)
    {
        $credentials = ['email' => Input::get('email')];
        $response = Password::sendResetLink($credentials, function($message){
            $message->subject('Password Reset Info');
        });

		switch ($response)
		{
			case PasswordBroker::RESET_LINK_SENT:
			    if($request->ajax()){
                    $data = array('success' => 'Reset link was sent to your email please check');
                    return $this->successResponse($data);
                }
				return Redirect::to('login')->with(array('note' => trans($response), 'note_type' => 'success'));

			case PasswordBroker::INVALID_USER:
                if($request->ajax()){
                    return $this->errorResponse('User is not found in our database');
                }
				return redirect()->back()->with(array('note' => trans($response), 'note_type' => 'error'));
		}
	}

    /**
     *
     */
    public function isLogin(){
       if(Auth::user()){
           return Auth::user();
       }else{
           return $this->errorResponse('Your are not login');
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
			'payment_settings' => PaymentSetting::first(),
			'video_categories' => VideoCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
            'settings'  => $settings,
            'password_reset_link'   => $password_reset_link
        ];

	  return view('frontend.master', $data);
	}

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function password_reset_post(Request $request)
    {
        $credentials = $credentials = array(
            'email' => Input::get('email'),
            'password' => Input::get('password'),
            'password_confirmation' => Input::get('password_confirmation'),
            'token' => Input::get('token')
        );

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
