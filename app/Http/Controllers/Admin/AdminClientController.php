<?php

namespace App\Http\Controllers\Admin;

use App\Client;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\EditCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Jobs\QueueEmailCompany;
use App\Libraries\VideoHelper;
use App\Order;
use App\User;
use Auth;
use Redirect;
use App\Video;
use App\Story;
use App\Download;
use App\Traits\Slug;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminClientController extends Controller
{
    use Slug;

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
        $videos = Video::where([['state', 'licensed'], ['file', '!=', NULL]])
            ->orderBy('licensed_at', 'DESC')
            ->limit(50);

        $stories = Story::where([['state', 'licensed']])
            ->orderBy('updated_at', 'DESC')
            ->limit(50);

        return view('admin.clients.create_edit', [
            'company' => null,
            'user' => null,
            'videos' => $videos,
            'stories' => $stories,
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
            'full_name' => $request->get('user_full_name'),
            'role' => 'client_owner',
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
                $request->get('user_full_name'),
                $request->get('user_full_name'),
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

        return view('admin.clients.create_edit', [
            'company' => $company,
            'user' => Auth::user(),
            'update_path' => 'client.update',
            'company_users' => User::where('client_id', $company->id)->get()
        ]);
    }

    /**
     * @param EditCompanyRequest $request
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(EditCompanyRequest $request, int $id)
    {
        $company = Client::find($id);

        return view('admin.clients.create_edit', [
            'company' => $company,
            'post_route' => url('admin/clients/update'),
            'user' => Auth::user(),
            'update_path' => 'clients.update',
            'company_users' => User::where('client_id', $company->id)->get()
        ]);
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
        if ($company->account_owner_id != $request->input('account_owner_id')) {
            $redirect_path = 'client/stories';
            $company->account_owner_id = $request->input('account_owner_id');
        }

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
        $videos = Video::all();

        $csv = \League\Csv\Writer::createFromFileObject(new \SplTempFileObject());

        $csv->insertOne(['Order No.', 'Order Date', 'Story / Video', 'Author', 'Url', 'Downloaded']);

        $count = 1;
        $insert = [];
        foreach ($orders as $order) {
            $insert['order_no'] = str_pad($count, 4, '0', STR_PAD_LEFT);
            $insert['order_date'] = date('jS M Y H:i:s',strtotime($order->created_at));
            if($order->story_id!=0) {
                $insert['story'] = $stories->where('id', $order->story_id)->pluck('title')->first();
                $insert['author'] = $stories->where('id', $order->story_id)->pluck('author')->first();
                if($stories->where('id', $order->story_id)->pluck('status')->first()=='draft') {
                    $insert['url'] = 'Not yet published';
                } else {
                    $insert['url'] = $stories->where('id', $order->story_id)->pluck('url')->first();
                }
                $insert['downloaded'] = $downloads->where('story_id', $order->story_id)->where('client_id', $order->client_id)->count();
            } else {
                $insert['story'] = $videos->where('id', $order->video_id)->pluck('title')->first();
                $insert['author'] = $videos->where('id', $order->video_id)->pluck('contact.full_name')->first();
                if($videos->where('id', $order->video_id)->pluck('state')->first()!='licensed') {
                    $insert['url'] = 'Not yet licensed';
                } else {
                    $insert['url'] = $videos->where('id', $order->video_id)->pluck('file_watermark')->first();
                }
                $insert['downloaded'] = $downloads->where('video_id', $order->video_id)->where('client_id', $order->client_id)->count();
            }

            $csv->insertOne($insert);
            $count++;
        }

        $csv->output('orders.csv');
    }
}
