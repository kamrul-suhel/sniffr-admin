<?php

namespace App\Http\Controllers;

use App\Traits\FrontendResponser;
use App\User;
use Auth;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;
use App\PaymentSetting;

use Illuminate\Support\Facades\Input;

use App\Libraries\ThemeHelper;

class ThemeAuthController extends Controller {

    use FrontendResponser;

	public function __construct()
	{
		//$this->middleware('secure');
	}

	/*
	|--------------------------------------------------------------------------
	| Auth Controller
	|--------------------------------------------------------------------------
	*/

	/**
	 * Get a validator for an incoming registration request.
	 *
	 * @param  array  $data
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
	 * Create a new user instance after a valid registration.
	 *
	 * @param  array  $data
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

	public function login_form(){
		if(!Auth::guest()){
			return Redirect::to('/');
		}
		$settings = Setting::first();
		$data = array(
			'type' => 'login',
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
            'settings'=> $settings
			);
		return view('frontend.pages.login.login', $data);
	}

	public function signup_form(){

		if(!Auth::guest()){
			return Redirect::to('/');
		}
		$data = array(
			'type' => 'signup',
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => PaymentSetting::first(),
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
			);
		return view('Theme::auth', $data);
	}

	public function login(Request $request){
	    $response_data = array(
	        'redirect_url' => '',
            'is_dailymail' => false,
            'error'         => true,
            'error_message'    => ''
        );
	    // get login POST data
        $email_login = array(
	        'email' => Input::get('email'),
	        'password' => Input::get('password')
	    );

	    $username_login = array(
	        'username' => Input::get('email'),
	        'password' => Input::get('password')
	    );

	    if ( Auth::attempt($email_login) || Auth::attempt($username_login) ){
    		if(Auth::user()->role == 'admin' || Auth::user()->role == 'manager'){
    			$redirect = (Input::get('redirect')) ? Input::get('redirect') : '/admin';
                if($request->ajax()){
                    $response_data['redirect_url'] = $redirect;
                    $response_data['error'] = false;
                    return $response_data;
                }else{
    			    return Redirect::to($redirect);
                }

    		} elseif(Auth::user()->role == 'client'){
    			$redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/client/videos';
    			if(Auth::user()->username == 'dailymail'){
    				$redirect = '/client/dashboard';
    			}
    			// check if ajax request
                if($request->ajax()){
    			     $response_data['redirect_url'] = $redirect;
    			     $response_data['error'] = false;
    			     return $response_data;
                }else{
                    return Redirect::to($redirect);
                }
    		} else {
    			$redirect = (Input::get('redirect', 'false')) ? Input::get('redirect') : '/';
    			if($request->ajax()){
                    $response_data['redirect_url'] = $redirect;
                    $response_data['error'] = false;
                    return $response_data;
                }else{
                    return Redirect::to($redirect)->with(array('note' => 'You have been successfully logged in.', 'note_type' => 'success'));
                }
    		}
	    } else {
	    	$redirect = (Input::get('redirect', false)) ? '?redirect=' . Input::get('redirect') : '';
	        // auth failure! redirect to login with errors
            $error = array(
                'note' => 'Invalid login, please try again.', 'note_type' => 'error');

            if($request->ajax()){
                $response_data['redirect_url'] = $redirect;
                $response_data['error'] = true;
                $response_data['error_message'] = 'Invalid login, please try again.';
                return $response_data;
            }else{
                return Redirect::to('login' . $redirect)->with($error);
            }
        }

	}

	public function signup(){

		$input = Input::all();
		$user_data = array('username' => Input::get('username'), 'email' => Input::get('email'), 'password' => Hash::make(Input::get('password')) );

		$settings = \Setting::first();
		if(!$settings->free_registration){

			$payment_settings = PaymentSetting::first();

			if($payment_settings->live_mode){
				User::setStripeKey( $payment_settings->live_secret_key );
			} else {
				User::setStripeKey( $payment_settings->test_secret_key );
			}

			$token = Input::get('stripeToken');

			unset($input['stripeToken']);
		} else {
			if($settings->activation_email):
				$user_data['activation_code'] = str_random(60);
				$user_data['active'] = 0;
			endif;

			$user_data['role'] = 'registered';
		}

		$validation = Validator::make( $input, User::$rules );

		if ($validation->fails()){
			return Redirect::to('/signup')->with(array('note' => 'Sorry, there was an error creating your account.', 'note_type' => 'error', 'messages'))->withErrors($validation)->withInput(\Request::only('username', 'email'));
		}

	    $user = new User($user_data);
	    $user->save();

	    try{
	    	if($settings->free_registration && $settings->activation_email){

	    		Mail::send('Theme::emails.verify', array('activation_code' => $user->activation_code, 'website_name' => $settings->website_name), function($message) {
            		$message->to(Input::get('email'), Input::get('username'))->subject('Verify your email address');
       			 });

	    		return Redirect::to('/login')->with(array('note' => 'Success! One last step, be sure to verify your account by clicking on the activation link sent to your email.', 'note_type' => 'success'));

	    	} else {
	    		if(!$settings->free_registration){
	    			$user->subscription('monthly')->create($token, ['email' => $user->email]);
	    		}
	    		Auth::loginUsingId($user->id);
	    		return Redirect::to('/')->with(array('note' => 'Welcome! Your Account has been Successfully Created!', 'note_type' => 'success'));
	    	}
	    } catch(Exception $e){
	    	Auth::logout();
	    	$user->delete();
	    	return Redirect::to('/signup')->with(array('note' => 'Sorry, there was an error with your card: ' . $e->getMessage(), 'note_type' => 'error'))->withInput(\Request::only('username', 'email'));
	    }

	}

	public function verify($activation_code){
		if( ! $activation_code)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user = User::where('activation_code', '=', $activation_code)->first();

        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user->active = 1;
        $user->activation_code = null;
        $user->save();

        return Redirect::to('/login')->with(array('note' => 'You have successfully verified your account. Please login below.', 'note_type' => 'success'));
	}

	public function logout(){
		Auth::logout();
		return Redirect::to('/')->with(array('note' => 'You have been successfully logged out', 'note_type' => 'success'));
	}


	// ********** RESET PASSWORD ********** //
	public function password_reset()
	{
	    $settings =Setting::first();
		$data = array(
			'type' => 'forgot_password',
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => PaymentSetting::first(),
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
            'settings'  => $settings
			);
//		return view('Theme::auth', $data);
		return view('frontend.pages.login.reset_password', $data);
	}

	// ********** RESET REQUEST ********** //
	public function password_request(Request $request)
	{

		$credentials = array('email' => Input::get('email'));

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

	// ********** RESET PASSWORD TOKEN ********** //
	public function password_reset_token($token)
	{
	    $settings = Setting::first();

	    $password_reset_link = '';
	    if($settings->enable_https){
	        $password_reset_link = url('password/reset',$token);
        }else{
            $password_reset_link = url('password/reset',$token);
        }
		$data = array(
			'type' => 'reset_password',
			'token' => $token,
			'menu' => Menu::orderBy('order', 'ASC')->get(),
			'payment_settings' => PaymentSetting::first(),
			'video_categories' => VideoCategory::all(),
			'post_categories' => PostCategory::all(),
			'theme_settings' => ThemeHelper::getThemeSettings(),
			'pages' => Page::where('active', '=', 1)->get(),
            'settings'  => $settings,
            'password_reset_link'   => $password_reset_link
			);

	  return view('frontend.master', $data);
	}

	// ********** RESET PASSWORD POST ********** //
	public function password_reset_post(Request $request)
	{
	    return $request->all();
		$credentials = $credentials = array(
		    'email' => Input::get('email'),
            'password' => Input::get('password'),
            'password_confirmation' => Input::get('password_confirmation'),
            'token' => Input::get('token')
        );


		$response = Password::reset($credentials, function($user, $password)
		{
			$user->password = \Hash::make($password);

			$user->save();

		});

		switch ($response)
		{
			case PasswordBroker::PASSWORD_RESET:
				return Redirect::to('login')->with(array('note' => 'Your password has been successfully reset. Please login below', 'note_type' => 'success'));

			default:
				return redirect()->back()->with(array('note' => trans($response), 'note_type' => 'error'));
		}


	}

}
