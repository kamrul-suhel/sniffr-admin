<?php

namespace App\Http\Controllers\Admin;

use App\Client;
use App\Jobs\QueueEmailCompany;
use App\Libraries\VideoHelper;
use App\Order;
use App\User;
use Auth;
use Validator;
use Redirect;
use App\Story;
use App\Download;
use App\Traits\Slug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminClientController extends Controller
{
    use Slug;

    protected $rules = [
        'company_name' => 'required'
    ];

    public function __construct(Request $request)
    {
        $this->middleware(['admin:admin,manager']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
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
            'client' => null,
            'user' => null,
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($data = Input::all(), $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

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

        $client = Client::find($company_id);
        $client->account_owner_id = $user_id;
        $client->save();

        if ($request->get('send_invitation')) {
            QueueEmailCompany::dispatch(
                $company_id,
                $request->get('user_email'),
                $request->get('user_first_name'),
                $company_slug,
                $password
            );
        }

        return Redirect::to('admin/clients')->with([
            'note' => 'New Company Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $company = Client::find($id);

        return view('admin.clients.create_edit', [
            'company' => $company,
            'post_route' => url('admin/clients/update'),
            'user' => Auth::user(),
            'company_users' => User::where('client_id', $company->id)->get()
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $company = Client::findOrFail($request->get('id'));

        $company->slug = $this->slugify($request->get('company_name'));
        $company->name = $request->get('company_name');
        $company->address_line1 = $request->get('address_line1');
        $company->address_line2 = $request->get('address_line2');
        $company->city = $request->get('city');
        $company->postcode = $request->get('postcode');
        $company->country = $request->get('country');
        $company->vat_number = $request->get('vat_number');
        $company->billing_tel = $request->get('billing_tel');
        $company->billing_email = $request->get('billing_email');
        $company->account_owner_id = $request->get('account_owner_id');
        $company->usable_domains = $request->get('usable_domains');

        $company->update();

        return redirect('admin/clients/edit' . '/' . $company->id)->with([
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

        return Redirect::to('admin/clients')->with([
            'note' => 'Successfully Deleted Client',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param Request $request
     * @param $client_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function orders(Request $request, $client_id)
    {
        $client = Client::find($client_id);
        $orders = Order::where('client_id', '=', $client_id)
            ->get();
        $downloads = Download::where('client_id', '=', $client_id)
            ->get();

        return view('admin.clients.orders', [
            'orders' => $orders,
            'client' => $client,
            'stories' => Story::all(),
            'downloads' => $downloads
        ]);
    }

    public function orders_csv(Request $request, $client_id)
    {
        $client = Client::find($client_id);
        $orders = Order::where('client_id', '=', $client_id)
            ->get();
        $downloads = Download::where('client_id', '=', $client_id)
            ->get();
        $stories = Story::all();

        $csv = \League\Csv\Writer::createFromFileObject(new \SplTempFileObject());

        $csv->insertOne(['Order No.', 'Order Date', 'Story', 'Author', 'Wordpress Url', 'Downloaded']);

        $count = 1;
        $insert = [];
        foreach ($orders as $order) {
            $insert['order_no'] = str_pad($count, 4, '0', STR_PAD_LEFT);
            $insert['order_date'] = date('jS M Y H:i:s',strtotime($order->created_at));
            $insert['story'] = $stories->where('id', $order->story_id)->pluck('title')->first();
            $insert['author'] = $stories->where('id', $order->story_id)->pluck('author')->first();
            if($stories->where('id', $order->story_id)->pluck('status')->first()=='draft') {
                $insert['wordpress_url'] = 'Not yet published';
            } else {
                $insert['wordpress_url'] = $stories->where('id', $order->story_id)->pluck('url')->first();
            }
            $insert['downloaded'] = $downloads->where('story_id', $order->story_id)->count();
            $csv->insertOne($insert);
        }

        $csv->output('orders.csv');
    }
}
