<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use App\Jobs\Auth\QueueEmailClientPasswordUpdated;
use App\Jobs\QueueEmail;
use App\User;
use App\Traits\FrontendResponse;
use Auth;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\PasswordBroker;
use Password;
use Session;
use Illuminate\Http\Request;
use Validator;
use Redirect;
use App\Page;
use App\VideoCategory;

/**
 * Class ThemeAuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    use FrontendResponse;

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
        $settings = config('settings.site');

        $data = [
            'type' => 'login',
            'video_categories' => VideoCategory::all(),
            'theme_settings' => config('settings.theme'),
            'pages' => Page::where('active', '=', 1)->get(),
            'settings' => $settings
        ];

        return view('frontend.master', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
    {
        $email_login = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        $username_login = [
            'username' => $request->input('email'),
            'password' => $request->input('password')
        ];

        if ((!Auth::attempt($email_login)) && (!Auth::attempt($username_login))) {
            $redirect = ($request->input('redirect')) ? '?redirect=' . $request->input('redirect') : '';

            $error = [
                'note' => 'Invalid login, please try again.',
                'note_type' => 'error'
            ];

            if ($request->ajax() || $request->isJson()) {
                return $this->errorResponse('Invalid login, please try again.');
            }

            return Redirect::to('login' . $redirect)->with($error);
        }

        $redirect_route = $client = $user = $offers = '';

        if (key_exists(Auth::user()->role, config('roles.admins'))) {
            $redirect_route = '/admin';
        } elseif (key_exists(Auth::user()->role, config('roles.clients'))) {

            $user = Auth::user();
            $user['client'] = $user->client;
            $client = Auth::user()->client;
            $offers = $user->userOffers();
        }

        $redirect = ($request->input('redirect')) ?: $redirect_route;

        if ($request->ajax() || $request->isJson()) {
            $response_data['redirect_url'] = $redirect;
            $response_data['error'] = false;
            $response_data['client'] = $client;
            $response_data['user'] = $user;
            $response_data['user_offers'] = $offers;
            return $this->successResponse($response_data);
        }

        return Redirect::to($redirect);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();

        if ($request->ajax()) {
            $data = ['success' => 'You are successfully logout'];
            return $this->successResponse($data);
        }
        return Redirect::to('/')->with([
            'note' => 'You have been successfully logged out',
            'note_type' => 'success'
        ]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function password_reset()
    {
        return view('frontend.pages.login.reset_password');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function password_request(Request $request)
    {
        $credentials = ['email' => $request->input('email')];

        $response = Password::sendResetLink($credentials, function ($message) {
            $message->subject('Password Reset Info');
        });

        switch ($response) {
            case PasswordBroker::RESET_LINK_SENT:
                if ($request->ajax()) {
                    $data = ['success_message' => 'We\'ve just sent you a reset password link, please check your email'];
                    return $this->successResponse($data);
                }
                return Redirect::to('login')->with([
                    'note' => trans($response),
                    'note_type' => 'success'
                ]);

            case PasswordBroker::INVALID_USER:
                if ($request->ajax()) {
                    return $this->errorResponse('That email does not exist.');
                }
                return redirect()->back()->with([
                    'note' => trans($response),
                    'note_type' => 'error'
                ]);
        }
    }

    /**
     *
     */
    public function isLogin()
    {
        if (Auth::user()) {
            return $this->successResponse(Auth::user());
        }
        return $this->errorResponse('Your are not login');
    }

    /**
     * @param $token
     * @param $email
     * @return mixed
     */
    public function setPassword($token, $email)
    {
        Auth::logout();
        Session::flush();

        return view('frontend.master')
            ->with('token', $token)
            ->with('email', $email);
    }

    /**
     * @param Request $request
     * @param $token
     * @param $email
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function setPasswordPost(UpdateUserRequest $request, $token, $email)
    {

        $credentials = $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'password_confirmation' => $request->input('password_confirmation'),
            'token' => $request->input('token')
        ];

        $response = Password::reset($credentials, function ($user, $password) {
            $user->password = \Hash::make($password);
            $user->save();
        });

        switch ($response) {
            case PasswordBroker::PASSWORD_RESET:

                if ($request->ajax()) {

                    if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {

                        return $this->successResponse([
                            'user' => auth()->user(),
                            'success_message' => 'Your account is now active.'
                        ]);
                    } else {
                        return $this->errorResponse([
                            'error_message' => 'There was a problem logging you in. Please try again.'
                        ], 400);
                    }
                }

                // attempt login with new password
                if (auth()->attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {

                    return redirect()->intended('videos')->with([
                        'note' => 'Your password has been successfully set.',
                        'note_type' => 'success'
                    ]);
                }

                return Redirect::to('videos')->with([
                    'note' => 'Your account is now active.',
                    'note_type' => 'success'
                ]);

            default:
                if ($request->ajax()) {
                    return $this->errorResponse(trans($response), 400);
                }

                return redirect()->back()->with([
                    'note' => trans($response),
                    'note_type' => 'error'
                ]);
        }
    }


    /**
     * @param Request $request
     * @param $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function password_reset_token(Request $request, $token)
    {

        Auth::logout();
        Session::flush();

        $data = [
            'token' => $token,
            'theme_settings' => config('settings.theme'),
        ];

        return view('frontend.master', $data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function password_reset_post(UpdateUserRequest $request)
    {
        $credentials = $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'password_confirmation' => $request->input('password_confirmation'),
            'token' => $request->input('token')
        ];

        $response = Password::reset($credentials, function ($user, $password) {
            $user->password = \Hash::make($password);
            $user->save();
        });

        switch ($response) {
            case PasswordBroker::PASSWORD_RESET:

                if ($request->ajax()) {

                    if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {

                        QueueEmailClientPasswordUpdated::dispatch(auth()->user());

                        return $this->successResponse([
                            'user' => auth()->user(),
                            'success_message' => 'Your password has been reset.'
                        ]);
                    } else {
                        return $this->errorResponse([
                            'error_message' => 'There was a problem logging you in. Please try again.'
                        ], 400);
                    }
                }

                // attempt login with new password
                if (auth()->attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {

                    QueueEmailClientPasswordUpdated::dispatch(auth()->user());

                    return redirect()->intended('videos')->with([
                        'note' => 'Your password has been successfully reset.',
                        'note_type' => 'success'
                    ]);
                }

            default:
                if ($request->ajax()) {
                    return $this->errorResponse(trans($response), 400);
                }

                return redirect()->back()->with([
                    'note' => trans($response),
                    'note_type' => 'error'
                ]);
        }
    }
}
