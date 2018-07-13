<?php

namespace App\Http\Controllers\Admin;

use App\Client;
use App\Collection;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\EditCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Jobs\QueueEmailCompany;
use App\Jobs\QueueEmailModerateCompany;
use App\Libraries\VideoHelper;
use App\User;
use App\Download;
use Auth;
use Redirect;
use App\Video;
use App\Story;
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
        $videos = Video::where('state', 'licensed')
            ->orderBy('licensed_at', 'DESC')
            ->limit(50)
            ->get();

        $stories = Story::where('state', 'licensed')
            ->orderBy('updated_at', 'DESC')
            ->limit(50)
            ->get();

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
        $redirect_path = '';

        $company = Client::findOrFail($id);
        $company->slug = $this->slugify($request->input('company_name'));
        $company->name = $request->input('company_name');
        $company->address_line1 = $request->input('address_line1');
        $company->address_line2 = $request->input('address_line2');
        $company->city = $request->input('city');
        $company->postcode = $request->input('postcode');
        $company->country = $request->input('country');
        $company->region = $request->input('region');
        $company->tier = $request->input('tier');
        $company->vat_number = $request->input('vat_number');
        $company->billing_tel = $request->input('billing_tel');
        $company->billing_email = $request->input('billing_email');
        $company->billing_name = $request->input('billing_name');
        $company->tier = $request->input('tier');
        $company->location = $request->input('location');
        $company->active = $request->input('active') == 'on' ? 1 : 0;
        $company->usable_domains = $request->input('usable_domains');

        if ($company->account_owner_id != $request->input('account_owner_id')) {
            $currentOwner = $company->account_owner_id;
            $company->account_owner_id = $request->input('account_owner_id');
            //TODO - send email to new owner that they are the account owner
            //TODO - send email to old owner saying they've been kicked off.
        }

        $company->update();

        if($company->active == 1) {
            QueueEmailModerateCompany::dispatch($company);
        }


        //Update all new users linked with this company so they become active
        $users = $company->users()->get();
        foreach($users as $user) {
            $user->active = $company->active;
            $user->save();
        }

        if (!$redirect_path) {
            $redirect_path = (Auth::user()->role == 'admin') ? 'admin/clients/edit/' . $company->id : '/client/profile';
        }

        return redirect($redirect_path)->with([
            'note' => 'Successfully Updated Client!',
            'note_type' => 'success'
        ]);
    }

	/**
	 * @param Request $request
	 * @param $client_id
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function purchases(Request $request, $client_id)
	{
		$client = Client::find($client_id);

		$collectionPurchasesVideos = Collection::whereHas('collectionVideos', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionVideos')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_videos');

		$collectionPurchasesStories = Collection::whereHas('collectionStories', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionStories')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_stories');

		$downloads = Download::where('client_id', $client_id)->get();

		return view('admin.clients.purchases', [
			'collectionPurchasesVideos' => $collectionPurchasesVideos,
			'collectionPurchasesStories' => $collectionPurchasesStories,
			'downloads' => $downloads,
			'client' => $client
		]);
	}

    /**
     * @param Request $request
     * @param $client_id
     * @throws \League\Csv\CannotInsertRecord
     */
	public function purchases_csv(Request $request, $client_id)
	{
		$collectionPurchasesVideos = Collection::whereHas('collectionVideos', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionVideos')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_videos');

		$collectionPurchasesStories = Collection::whereHas('collectionStories', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionStories')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_stories');

		$downloads = Download::where('client_id', $client_id)->get();

		$csv = \League\Csv\Writer::createFromFileObject(new \SplTempFileObject());

		$csv->insertOne(['Order No.', 'Alpha ID', 'Order Date', 'Story / Video', 'Downloaded', 'Price']);

		$count = 1;
		$insert = [];
		foreach($collectionPurchasesVideos as $collection){
			foreach($collection->collectionVideos as $purchasedVideo) {
				$insert['order_no'] = $collection->name;
				$insert['alpha_id'] = $purchasedVideo->video->alpha_id;
				$insert['order_date'] = date('jS M Y H:i:s', strtotime($collection->updated_at));
				$insert['title'] = $purchasedVideo->video->title;
				$insert['downloaded'] = $downloads->where('video_id', $purchasedVideo->video->id)->count();
				$insert['price'] = '£' . $purchasedVideo->final_price;

				$csv->insertOne($insert);
				$count++;
			}
		}

		foreach($collectionPurchasesStories as $collection){
			foreach($collection->collectionStories as $purchasedStory) {
				$insert['order_no'] = $collection->name;
				$insert['alpha_id'] = $purchasedStory->story->alpha_id;
				$insert['order_date'] = date('jS M Y H:i:s', strtotime($collection->updated_at));
				$insert['title'] = $purchasedStory->story->title;
				$insert['downloaded'] = $downloads->where('story_id', $purchasedStory->story->id)->count();
				$insert['price'] = '£' . $purchasedStory->final_price;

				$csv->insertOne($insert);
				$count++;
			}
		}

		$csv->output('orders.csv');
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
}
