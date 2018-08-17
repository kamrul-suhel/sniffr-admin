<?php

namespace App\Http\Controllers\Client;

use App\Client;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\EditCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Jobs\Auth\QueueEmailCompany;
use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use App\User;
use App\Traits\Slug;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClientAccountController extends Controller
{

	use Slug, FrontendResponse;

	protected $client, $user;

	/**
	 * ClientAccountController constructor.
	 * @param Client $client
	 * @param User $user
	 */
	public function __construct(Client $client, User $user)
	{
		$this->middleware('client');
		$this->client = $client;
		$this->user = $user;
	}

	/**
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index()
	{
		$clients = $this->client->orderBy('created_at', 'DESC')->paginate(10);

		$data = [
			'clients' => $clients,
			'user' => auth()->user()
		];

		return view('admin.clients.index', $data);
	}

	/**
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function create()
	{
		return view('admin.clients.create_edit', ['company' => null, 'user' => null,]);
	}

	/**
	 * @param CreateCompanyRequest $request
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function store(CreateCompanyRequest $request)
	{
		$company_slug = $this->slugify($request->get('company_name'));

		$company_id = $this->client->insertGetId([
			'name' => $request->get('company_name'),
			'slug' => $company_slug,
		]);

		$password = VideoHelper::quickRandom();

		$user_id = $this->user->insertGetId([
			'username' => $company_slug,
			'email' => $request->get('user_email'),
			'first_name' => $request->get('user_first_name'),
			'last_name' => $request->get('user_last_name'),
			'role' => 'client',
			'password' => \Hash::make($password),
			'client_id' => $company_id
		]);

		$user = $this->user->find($user_id);

		$client = $this->client->find($company_id);
		$client->account_owner_id = $user_id;
		$client->save();

		$token = app('App\Http\Controllers\Admin\AdminUsersController')->getToken($request->get('user_email'), $user);

		if ($request->get('send_invitation')) {
			QueueEmailCompany::dispatch(
				$company_id,
				$request->get('user_email'),
				$request->get('user_first_name'),
				$request->get('user_email'),
				$token
			);
		}

		return redirect('admin/clients')->with([
			'note' => 'New Company Successfully Added!',
			'note_type' => 'success'
		]);
	}

	/**
	 * @param EditCompanyRequest|Request $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 * @internal param $id
	 */
	public function myAccount(EditCompanyRequest $request)
	{
		$company = $this->client->find(auth()->user()->client_id);

		$companyUsers = $this->user->where('client_id', $company->id);

		if ($request->ajax()) {
			return $this->successResponse([
				'company' => $company,
				'user' => auth()->user(),
				'update_path' => 'client.update',
				'company_users' => $companyUsers->get(),
				'account_owner_users' => $companyUsers->pluck('full_name', 'id'),
			]);
		}

		return view('frontend.master');
	}

	/**
	 * @param UpdateCompanyRequest $request
	 * @param int $id
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function update(UpdateCompanyRequest $request, int $id)
	{
		$data = request()->all();

		$company = $this->client->findOrFail($id);

		$company = $company->updateClient($data);

		return $this->successResponse([
			'success' => true,
			'message' => 'Your settings have been saved.',
		]);
	}

	/**
	 * @param $id
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function destroy($id)
	{
		$client = $this->client->find($id);

		if (!$client) {
			abort(404);
		}

		$client->destroy($id);

		return redirect('client/profile')->with([
			'note' => 'Successfully Deleted Client',
			'note_type' => 'success'
		]);
	}
}
