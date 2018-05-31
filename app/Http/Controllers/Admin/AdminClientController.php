<?php

namespace App\Http\Controllers\Admin;

use App\Order;
use Auth;
use Validator;
use Redirect;
use App\Client;
use App\Users;
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
            'user' => Auth::user()
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
}
