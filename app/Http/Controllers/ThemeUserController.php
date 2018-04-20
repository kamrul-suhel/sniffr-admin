<?php

namespace App\Http\Controllers;

use Hash;
use Auth;
use Redirect;
use App\User;
use App\Favorite;
use App\Page;
use App\Menu;
use App\Video;
use App\VideoCategory;
use App\Libraries\Imagehandler;
use Illuminate\Support\Facades\Input;

class ThemeUserController extends Controller
{
    public static $rules = [
        'username' => 'required|unique:users',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed'
    ];

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($username)
    {
        $user = User::where('username', '=', $username)->first();

        $authUser = Auth::user();
        if (isset($authUser->id)) {
            return redirect()->home()->with([
                'note' => 'Sorry but you need to be logged in to access this page!',
                'note_type' => 'error'
            ]);
        }

        if ($authUser->id != $user->id && $authUser->role != 'admin') {
            return redirect()->home()->with([
                'note' => 'Sorry but you do not have permission to access this page!',
                'note_type' => 'error'
            ]);
        }

        $favorites = Favorite::where('user_id', '=', $user->id)->orderBy('created_at', 'desc')->get();

        $favorite_array = [];
        foreach ($favorites as $key => $fave) {
            array_push($favorite_array, $fave->video_id);
        }

        $videos = Video::where('active', '=', '1')->whereIn('id', $favorite_array)->take(9)->get();

        $data = [
            'user' => $user,
            'type' => 'profile',
            'videos' => $videos,
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
        ];

        return view('Theme::user', $data);
    }

    public function edit($username)
    {
        if (!Auth::guest() && Auth::user()->username == $username) {
            $user = User::where('username', '=', $username)->first();
            $data = [
                'user' => $user,
                'post_route' => url('user') . '/' . $user->username . '/update',
                'type' => 'edit',
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];
            return view('Theme::user', $data);
        }
        return Redirect::to('/');
    }

    public function update($username)
    {
    	$input = array_except(Input::all(), '_method');
		$input['username'] = str_replace('.', '-', $input['username']);

		$user = User::where('username', '=', $username)->first();

		if (Auth::user()->id == $user->id)
		{
            $input['avatar'] = $user->avatar;
            if (Input::hasFile('avatar')) {
                $input['avatar'] = ImageHandler::uploadImage(Input::file('avatar'), 'avatars');
            }

            $input['password'] = Hash::make($input['password']);
            if ($input['password'] == '') {
                $input['password'] = $user->password;
            }

            if ($user->username != $input['username']) {
                $username_exist = User::where('username', '=', $input['username'])->first();
                if ($username_exist) {
                    return Redirect::to('user/' . $user->username . '/edit')->with(array('note' => 'Sorry That Username is already in Use', 'note_type' => 'error'));
                }
            }

			$user->update($input);

			return Redirect::to('user/' .$user->username . '/edit')->with([
			    'note' => 'Successfully Updated User Info',
                'note_type' => 'success'
            ]);
		}

		return Redirect::to('user/' . Auth::user()->username . '/edit ')->with([
		    'note' => 'Sorry, there seems to have been an error when updating the user info',
            'note_type' => 'error'
        ]);
    }

    public function billing($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        if (Auth::user()->username == $username) {
            if (Auth::user()->role == 'admin') {
                return Redirect::to('/user/' . $username . '/edit')->with(array('note' => 'This user type does not have billing info associated with their account.', 'note_type' => 'warning'));
            }

            $user = User::where('username', '=', $username)->first();

            $data = [
                    'user' => $user,
                    'post_route' => url('user') . '/' . $user->username . '/update',
                    'type' => 'billing',
                    'menu' => Menu::orderBy('order', 'ASC')->get(),
                    'video_categories' => VideoCategory::all(),
                    'theme_settings' => config('settings.theme'),
                    'pages' => Page::where('active', '=', 1)->get(),
            ];
            return view('Theme::user', $data);

        }
        return Redirect::to('/');
    }

    public function cancel_account($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        if (Auth::user()->username == $username) {

            $payment_settings = config('settings.payments');

            if ($payment_settings->live_mode) {
                User::setStripeKey($payment_settings->live_secret_key);
            } else {
                User::setStripeKey($payment_settings->test_secret_key);
            }

            $user = Auth::user();
            $user->subscription()->cancel();

            return Redirect::to('user/' . $username . '/billing')->with([
                'note' => 'Your account has been cancelled.',
                'note_type' => 'success'
            ]);
        }
    }

    public function resume_account($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        if (Auth::user()->username == $username) {

            $payment_settings = config('settings.payments');

            if ($payment_settings->live_mode) {
                User::setStripeKey($payment_settings->live_secret_key);
            } else {
                User::setStripeKey( $payment_settings->test_secret_key );
            }

            $user = Auth::user();
            $user->subscription('monthly')->resume();

            return Redirect::to('user/' . $username . '/billing')->with([
                'note' => 'Welcome back, your account has been successfully re-activated.',
                'note_type' => 'success'
            ]);
        }
    }

    public function update_cc_store($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        $payment_settings = config('settings.payments');

        if($payment_settings->live_mode) {
            User::setStripeKey( $payment_settings->live_secret_key );
        } else {
            User::setStripeKey( $payment_settings->test_secret_key );
        }

        $user = Auth::user();

        if(Auth::user()->username == $username) {
            $token = Input::get('stripeToken');

            try {
                $user->subscription('monthly')->resume($token);
                return Redirect::to('user/' . $username . '/billing')->with([
                    'note' => 'Your Credit Card Info has been successfully updated.',
                    'note_type' => 'success'
                ]);
            } catch (\Exception $e) {
                return Redirect::to('/user/' . $username . '/update_cc')->with([
                    'note' => 'Sorry, there was an error with your card: ' . $e->getMessage(),
                    'note_type' => 'error'
                ]);
            }
        }
        return Redirect::to('user/' . $username);
    }

    public function update_cc($username)
    {
        if (Auth::guest()){
            return Redirect::to('/');
        }

        $payment_settings = config('settings.payments');

        if ($payment_settings->live_mode) {
            User::setStripeKey($payment_settings->live_secret_key);
        } else {
            User::setStripeKey($payment_settings->test_secret_key);
        }

        $user = Auth::user();

        if (Auth::user()->username == $username) {
            $data = [
                'user' => $user,
                'post_route' => url('user') . '/' . $user->username . '/update',
                'type' => 'update_credit_card',
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'payment_settings' => $payment_settings,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];

            return view('Theme::user', $data);
        }
        return Redirect::to('user/' . $username);
    }

    public function renew($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        $user = User::where('username', '=', $username)->first();

        $payment_settings = config('settings.payments');

        if (Auth::user()->username == $username) {
            $data = [
                'user' => $user,
                'post_route' => url('user') . '/' . $user->username . '/update',
                'type' => 'renew_subscription',
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'payment_settings' => $payment_settings,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];

            return view('Theme::user', $data);
        }
        return Redirect::to('/');
    }

    public function upgrade($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        $user = User::where('username', '=', $username)->first();

        $payment_settings = config('settings.payments');

        if ($payment_settings->live_mode) {
            User::setStripeKey($payment_settings->live_secret_key);
        } else {
            User::setStripeKey($payment_settings->test_secret_key);
        }

        if (Auth::user()->username == $username) {
            $data = [
                'user' => $user,
                'post_route' => url('user') . '/' . $user->username . '/update',
                'type' => 'upgrade_subscription',
                'menu' => Menu::orderBy('order', 'ASC')->get(),
                'payment_settings' => $payment_settings,
                'video_categories' => VideoCategory::all(),
                'theme_settings' => config('settings.theme'),
                'pages' => Page::where('active', '=', 1)->get(),
            ];

            return view('Theme::user', $data);
        }
        return Redirect::to('/');
    }

    public function upgrade_cc_store($username)
    {
        if (Auth::guest()) {
            return Redirect::to('/');
        }

        $payment_settings = config('settings.payments');

        if($payment_settings->live_mode){
            User::setStripeKey( $payment_settings->live_secret_key );
        } else {
            User::setStripeKey( $payment_settings->test_secret_key );
        }

        $user = User::find(Auth::user()->id);

        if (Auth::user()->username == $username) {
            $token = Input::get('stripeToken');
            try {
                $user->subscription('monthly')->create($token, ['email' => $user->email]);
                $user->role = 'subscriber';
                $user->save();
                return Redirect::to('user/' . $username . '/billing')->with([
                    'note' => 'You have been successfully signed up for a subscriber membership!',
                    'note_type' => 'success'
                ]);
            } catch(\Exception $e){
                return Redirect::to('/user/' . $username . '/upgrade_subscription')->with([
                    'note' => 'Sorry, there was an error with your card: ' . $e->getMessage(),
                    'note_type' => 'error'
                ]);
            }
        }
        return Redirect::to('user/' . $username);
    }
}
