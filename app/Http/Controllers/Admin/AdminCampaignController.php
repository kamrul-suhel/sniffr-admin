<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use App\Video;
use App\Client;
use App\Campaign;

use App\Traits\Slug;
use App\Libraries\ThemeHelper;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class AdminCampaignController extends Controller
{
    use Slug;

    protected $rules = [
        'name' => 'required',
        'client_id' => 'required'
    ];

    /**
     * AdminController constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $campaigns = Campaign::orderBy('created_at', 'DESC')->paginate(10);
        $user = Auth::user();

        $data = array(
            'campaigns' => $campaigns,
            'user' => $user,
            'admin_user' => Auth::user()
        );

        return view('admin.campaigns.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = array(
            'post_route' => url('admin/campaigns/store'),
            'button_text' => 'Add New Campaign',
            'admin_user' => Auth::user(),
            'clients' => Client::get()
        );

        return view('admin.campaigns.create_edit', $data);
    }

     public function store()
     {
         $validator = Validator::make($data = Input::all(), $this->rules);

         if ($validator->fails())
         {
             return Redirect::back()->withErrors($validator)->withInput();
         }

         $data['slug'] = $this->slugify($data['name']);

         $campaign = Campaign::create($data);

         return Redirect::to('admin/campaigns')->with(array('note' => 'New Campaign Successfully Added!', 'note_type' => 'success') );
     }

     /**
      * Display the specified resource.
      *
      * @param  \App\Campaign  $campaign
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
        $campaign = Campaign::find($id);

        // Need to get downloaded videos where user_id = campaign client id?

        $videos = Video::whereHas('campaigns', function($q) use ($id){
            $q->where('id', $id);
        })->get();


        $data['campaign'] = $campaign;
        $data['videos'] = $videos;

        return view('admin.campaigns.show', $data);
     }

     /**
      * Show the form for editing the specified resource.
      *
      * @param  \App\Campaign  $campaign
      * @return \Illuminate\Http\Response
      */

     public function edit($id)
     {
         $campaign = Campaign::find($id);

         $data = array(
             'headline' => '<i class="fa fa-edit"></i> Edit Campaign',
             'campaign' => $campaign,
             'post_route' => url('admin/campaigns/update'),
             'button_text' => 'Update Campaign',
             'admin_user' => Auth::user(),
             'clients' => Client::get()
        );

         return view('admin.campaigns.create_edit', $data);
     }

     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  \App\Campaign  $campaign
      * @return \Illuminate\Http\Response
      */

     public function update()
     {
         $data = Input::all();
         $id = $data['id'];
         $campaign = Campaign::findOrFail($id);

         $validator = Validator::make($data, $this->rules);

         if ($validator->fails())
         {
             return Redirect::back()->withErrors($validator)->withInput();
         }

         // if(!isset($data['active']) || $data['active'] == ''){
         //     $data['active'] = 0;
         // }

         $data['slug'] = $this->slugify($data['name']);

         $campaign->update($data);

         return Redirect::to('admin/campaigns/edit' . '/' . $id)->with(array('note' => 'Successfully Updated Campaign!', 'note_type' => 'success') );
     }

     /**
      * Remove the specified resource from storage.
      *
      * @param  \App\Campaign  $campaign
      * @return \Illuminate\Http\Response
      */

     public function destroy($id)
     {
         $campaign = Campaign::find($id);

         Campaign::destroy($id);

         return Redirect::to('admin/campaigns')->with(array('note' => 'Successfully Deleted Campaign', 'note_type' => 'success') );
     }
}
