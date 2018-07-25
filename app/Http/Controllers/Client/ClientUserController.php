<?php

namespace App\Http\Controllers\Client;

use App\Client;
use App\Http\Requests\Company\UpdateUserRequest;
use App\Http\Requests\User\CreateUserRequest;
use App\Jobs\Auth\QueueEmailClient;
use App\Jobs\Auth\QueueEmailCompany;
use App\Libraries\ImageHandler;
use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientUserController extends Controller
{

    use FrontendResponse;

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
    public function create(Request $request)
    {

        if($request->ajax()){
            return view('client.users.create_edit')
                ->with('user', null)
                ->with('slug', $request->slug);
        }

        return view('frontend.master');
    }

    /**
     * Store a newly created resource in storage.
     * @param CreateUserRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(CreateUserRequest $request)
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
        $user->active = 1;

        $currentClientId = auth()->user()->client->id;

        $client_id = in_array(Auth::user()->role, ['client_owner', 'client_admin'])
            ? Auth::user()->client_id
            : $request->input('client_id', $currentClientId);

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

        return $this->successResponse([
            'success' => true,
            'message' => 'User has been created. They will receive an email to complete their registration.',
        ]);
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
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function edit(Request $request, $slug, $user_id)
    {
        if($request->ajax()){
            $user = User::find($user_id);

            if(!$user && !$user->client->slug == $slug) {
                return redirect('videos');
            }

            return $this->successResponse([
                'user' => $user,
                'slug' => $slug,
            ]);
        }

        return view('frontend.master');
    }

    /**
     * @param Request $request
     * @param $slug
     * @param $userId
     */
    public function update(Request $request, $slug, $userId)
    {

        if($request->ajax()) {
            $user = User::find($userId);
            if (!$user) {
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
            if ($user->client_id) {
                $user->client_id = $request->input('client_id', $user->client_id);
            }

            if ($request->hasFile('avatar')) {
                $user->avatar = ImageHandler::uploadImage($request->file('avatar'), 'avatars');
            }

            $user->update();
            $user->save();

            return $this->successResponse([
                'success' => true,
                'message' => 'User has been updated',
            ]);
        }
    }

    /**
     * @param $slug
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
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
