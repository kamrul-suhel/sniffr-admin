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
    public function __construct(Request $request)
    {
        $this->middleware(['auth', 'admin']);
    }
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

        $data = array(
            'headline' => '<i class="fa fa-edit"></i> Edit Client',
            'client' => $client,
            'post_route' => url('admin/clients/update'),
            'button_text' => 'Update Client',
            'admin_user' => Auth::user()
            );

        return view('admin.clients.create_edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */

    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $client = Client::findOrFail($id);

        $validator = Validator::make($data, Client::$rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        // if(!isset($data['active']) || $data['active'] == ''){
        //     $data['active'] = 0;
        // }

        $client->update($data);

        return Redirect::to('admin/clients/edit' . '/' . $id)->with(array('note' => 'Successfully Updated Client!', 'note_type' => 'success') );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $client = Client::find($id);

        Client::destroy($id);

        return Redirect::to('admin/clients')->with(array('note' => 'Successfully Deleted Client', 'note_type' => 'success') );
    }
}
