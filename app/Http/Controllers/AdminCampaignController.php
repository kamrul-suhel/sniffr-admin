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

class AdminCampaignController extends Controller
{
    protected $rules = [
        'name' => 'required'
    ];

    /**
     * AdminController constructor.
     */
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
             'admin_user' => Auth::user()
             );
         return view('admin.campaigns.create_edit', $data);
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
    //         $campaign = new Campaign();
    //         $campaign->name = Input::get('name');
    //         $campaign->slug = slugify($campaign->name);
    //         $campaign->client_id = Input::get('client_id');
    //         $campaign->save();
    //
    //         session()->flash('message', 'success|Campaign was successfully created');
    //
    //         return Redirect::to('admin/campaigns');
    //     }
    // }

    public function store()
    {
        $validator = Validator::make($data = Input::all(), Campaign::$rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $campaign= Campaign::create($data);

        return Redirect::to('admin/campaigns')->with(array('note' => 'New Campaign Successfully Added!', 'note_type' => 'success') );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Campaign $campaign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function edit(Campaign $campaign)
    {
        return view('admin.campaign.edit', ['campaign' => $campaign]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Campaign $campaign)
    {
        $validator = Validator::make(Input::all(), $this->rules);

        $this->validate($request, $this->rules);

        if ($validator->fails()) {
            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        } else {
            $campaign->name = Input::get('name');
            $campaign->slug = slugify($campaign->name);
            $campaign->client_id = Input::get('client_id');
            $campaign->save();

            session()->flash('message', 'success|Campaign was successfully created');

            return Redirect::to('admin/campaigns');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        session()->flash('message', 'success|Campaign was successfully deleted');

        return Redirect::to('admin/campaigns');
    }
}
