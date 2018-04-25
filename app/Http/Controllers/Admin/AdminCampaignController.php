<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use App\Video;
use App\Client;
use App\Campaign;
use App\Traits\Slug;
use Illuminate\Http\Request;
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
     * AdminCampaignController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware(['admin:admin,manager']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $campaigns = Campaign::orderBy('created_at', 'DESC')->paginate(10);

        $data = [
            'campaigns' => $campaigns,
            'user' => Auth::user()
        ];

        return view('admin.campaigns.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
            'post_route' => url('admin/campaigns/store'),
            'button_text' => 'Add New Campaign',
            'user' => Auth::user(),
            'clients' => Client::get()
        ];

        return view('admin.campaigns.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
     public function store()
     {
         $validator = Validator::make($data = Input::all(), $this->rules);

         if ($validator->fails())
         {
             return Redirect::back()->withErrors($validator)->withInput();
         }

         $data['slug'] = $this->slugify($data['name']);

         Campaign::create($data);

         return redirect()->route('admin_campaigns')->with([
             'note' => 'New Campaign Successfully Added!',
             'note_type' => 'success'
         ]);
     }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
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
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
     public function edit($id)
     {
         $campaign = Campaign::find($id);

         $data = [
             'headline' => '<i class="fa fa-edit"></i> Edit Campaign',
             'campaign' => $campaign,
             'post_route' => url('admin/campaigns/update'),
             'button_text' => 'Update Campaign',
             'user' => Auth::user(),
             'clients' => Client::get()
         ];

         return view('admin.campaigns.create_edit', $data);
     }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
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

         $data['slug'] = $this->slugify($data['name']);

         $campaign->update($data);

         return Redirect::to('admin/campaigns/edit' . '/' . $id)->with([
             'note' => 'Successfully Updated Campaign!',
             'note_type' => 'success'
         ]);
     }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
     public function destroy($id)
     {
         $campaign = Campaign::find($id);
         if (!$campaign) {
             abort(404);
         }
         $campaign->destroy($id);

         return Redirect::to('admin/campaigns')->with([
             'note' => 'Successfully Deleted Campaign',
             'note_type' => 'success'
         ]);
     }
}
