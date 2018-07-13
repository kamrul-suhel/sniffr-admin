<?php

namespace App\Http\Controllers\Client;

use App\Client;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\EditCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Jobs\QueueEmailCompany;
use App\Libraries\VideoHelper;
use App\User;
use Auth;
use Redirect;
use App\Story;
use App\Download;
use App\Traits\Slug;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClientAccountController extends Controller
{
    use Slug;

    /**
     * ClientUserController constructor.
     */
    public function __construct()
    {
        $this->middleware('client_admin');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        $clients = Client::orderBy('created_at', 'DESC')->paginate(10);

        $data = [
            'clients' => $clients,
            'user' => Auth::user()
        ];

        return view('admin.clients.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('admin.clients.create_edit', [
            'company' => null,
            'user' => null,
        ]);

    }

    /**
     * @param CreateCompanyRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateCompanyRequest $request)
    {
        $company_slug = $this->slugify($request->get('company_name'));

        $company_id = Client::insertGetId([
            'name' => $request->get('company_name'),
            'slug' => $company_slug,
        ]);

        $password = VideoHelper::quickRandom();

        $user_id = User::insertGetId([
            'username' => $company_slug,
            'email' => $request->get('user_email'),
            'first_name' => $request->get('user_first_name'),
            'last_name' => $request->get('user_last_name'),
            'role' => 'client',
            'password' => \Hash::make($password),
            'client_id' => $company_id
        ]);

        $user = User::find($user_id);

        $client = Client::find($company_id);
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

        return Redirect::to('admin/clients')->with([
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

        $company = Client::find(Auth::user()->client_id);



        if($request->ajax()){
            return view('client.account.create_edit', [
                'company' => $company,
                'user' => Auth::user(),
                'update_path' => 'client.update',
                'company_users' => User::where('client_id', $company->id)->get()
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

        $company = Client::findOrFail($id);

        $company->slug = $this->slugify($request->input('company_name'));
        $company->name = $request->input('company_name');
        $company->address_line1 = $request->input('address_line1');
        $company->address_line2 = $request->input('address_line2');
        $company->city = $request->input('city');
        $company->postcode = $request->input('postcode');
        $company->country = $request->input('country');
        $company->vat_number = $request->input('vat_number');
        $company->billing_tel = $request->input('billing_tel');
        $company->billing_email = $request->input('billing_email');
        $company->billing_name = $request->input('billing_name');

        $redirect_path = '';

        $company->usable_domains = $request->input('usable_domains');

        $company->update();

        if (!$redirect_path) {
            $redirect_path = (Auth::user()->role == 'admin') ? 'admin/clients/edit/' . $company->id : '/client/profile';
        }

        return redirect($redirect_path)->with([
            'note' => 'Successfully Updated Client!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if(!$client){
            abort(404);
        }

        $client->destroy($id);

        return Redirect::to('client/profile')->with([
            'note' => 'Successfully Deleted Client',
            'note_type' => 'success'
        ]);
    }
}
