<?php

namespace App\Http\Controllers\Admin;

use App\Order;
use Auth;
use Validator;
use Redirect;
use App\Client;
use App\User;
use App\Story;
use App\Download;
use App\Asset;
use App\Traits\Slug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminClientController extends Controller
{
    use Slug;

    protected $rules = [
        'name' => 'required'
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
        $data = [
            'post_route' => url('admin/clients/store'),
            'button_text' => 'Add New Client',
        ];

        return view('admin.clients.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $validator = Validator::make($data = Input::all(), $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $data['slug'] = $this->slugify($data['name']);

        Client::create($data);

        return Redirect::to('admin/clients')->with([
            'note' => 'New Client Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $client = Client::find($id);

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Client',
            'client' => $client,
            'post_route' => url('admin/clients/update'),
            'button_text' => 'Update Client',
            'user' => Auth::user(),
            'client_users' => User::where('client_id', $client->id)->get()
        ];

        return view('admin.clients.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $client = Client::findOrFail($id);

        $validator = Validator::make($data, $this->rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $data['slug'] = $this->slugify($data['name']);

        $client->update($data);

        return Redirect::to('admin/clients/edit' . '/' . $id)->with([
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
