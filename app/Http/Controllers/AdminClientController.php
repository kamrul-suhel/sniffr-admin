<?php

namespace App\Http\Controllers;

use View;
use Auth;
use Validator;
use Redirect;

use App\Client;
use App\Campaign;

use App\Libraries\ThemeHelper;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class AdminClientController extends Controller
{
    protected $rules = [
        'name' => 'required'
    ];
    //
    // public function __construct(Request $request)
    // {
    //     $this->middleware('auth');
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $clients = Client::orderBy('created_at', 'DESC')->paginate(10);
         $user = Auth::user();

         $data = array(
             'clients' => $clients,
             'user' => $user,
             'admin_user' => Auth::user()
             );

         return view('admin.clients.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function create()
     {
         $data = array(
             'post_route' => url('admin/clients/store'),
             'button_text' => 'Add New Client',
             'admin_user' => Auth::user()
             );
         return view('admin.clients.create_edit', $data);
     }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make(Input::all(), $this->rules);
    //
    //     $this->validate($request, $this->rules);
    //
    //     if ($validator->fails()) {
    //         return Redirect::back()
    //             ->withErrors($validator)
    //             ->withInput();
    //     } else {
    //         $client = new Client();
    //         $client->name = Input::get('name');
    //         $client->slug = slugify($client->name);
    //         $client->save();
    //
    //         session()->flash('message', 'success|Client was successfully created');
    //
    //         return Redirect::to('admin/clients');
    //     }
    // }

    public function store()
    {
        $validator = Validator::make($data = Input::all(), Client::$rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $client = Client::create($data);

        return Redirect::to('admin/clients')->with(array('note' => 'New Client Successfully Added!', 'note_type' => 'success') );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $client = Client::find($id);

        return view('admin.clients.edit', ['client' => $client]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $validator = Validator::make(Input::all(), $this->rules);

        $this->validate($request, $this->rules);

        if ($validator->fails()) {
            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        } else {
            $client->name = Input::get('name');
            $client->slug = slugify($client->name);
            $client->save();

            session()->flash('message', 'success|Client was successfully created');

            return Redirect::to('admin/clients');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $client->delete();

        session()->flash('message', 'success|Client was successfully deleted');

        return Redirect::to('admin/clients');
    }
}
