<?php

namespace App\Http\Controllers\Api\v1\Client;

use App\Http\Controllers\Api\v1\BaseApiController;
use App\Http\Requests\User\CreateUserRequest;
use App\Jobs\Auth\QueueEmailClient;
use App\Traits\FrontendResponse;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClientUserController extends BaseApiController
{
    use FrontendResponse;

    protected $user;

    /**
     * ClientUserController constructor.
     * @param User $user
     */
    public function __construct(User $user, Request $request)
    {
        $this->middleware('client');
        $this->user = $request->user('api')? $request->user('api') : $user;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if ($request->ajax()) {
            return view('client.users.create_edit')
                ->with('user', null)
                ->with('slug', $request->slug);
        }
        return $this->getFrontendServerResponse($request);
    }

    /**
     * Store a newly created resource in storage.
     * @param CreateUserRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(CreateUserRequest $request)
    {
        $data = request()->all();

        $user = $this->user->createUser($data, $this->user);

        if (in_array($user->role, ['client_owner', 'client_admin', 'client'])) {
            $token = $this->getToken($user->email, $user);

            QueueEmailClient::dispatch(
                $user->client_id,
                $user->email,
                $user->full_name,
                $token
            );
        }

        return $this->successResponse([
            'success' => true,
            'message' => 'User has been created. They will receive an email to complete their registration.',
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
     * @param Request $request
     * @param $slug
     * @param $user_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|
     * \Illuminate\Http\RedirectResponse|
     * \Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function edit(Request $request, $slug, $user_id)
    {
        if ($request->ajax()) {
            $user = $this->user->find($user_id);

            if (!$user && !$user->client->slug == $slug) {
                return redirect('videos');
            }

            return $this->successResponse([
                'user' => $user,
                'slug' => $slug,
            ]);
        }
        return $this->getFrontendServerResponse($request);
    }

    /**
     * @param Request $request
     * @param $slug
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $slug, $userId)
    {

        if ($request->ajax()) {

            $data = request()->all();

            $user = $this->user->find($userId);

            $user->updateUser($data);

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
        $user = $this->user->find($id);

        $user->delete();

        return redirect('client/profile')->with([
            'note' => 'User Deleted',
            'note_type' => 'success',
        ]);
    }
}
