<?php

namespace App\Http\Controllers\Admin;

use App\Client;
use App\Collection;
use App\CollectionStory;
use App\CollectionVideo;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\EditCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Jobs\Auth\QueueEmailCompany;
use App\Jobs\Auth\QueueEmailModerateCompany;
use App\Libraries\VideoHelper;
use App\User;
use App\Download;
use App\Video;
use App\Story;
use App\Traits\Slug;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminClientController extends Controller
{
    use Slug;

    protected $user, $client, $video, $story, $collection, $collectionVideo, $collectionStory;

    public function __construct(User $user, Client $client, Video $video, Story $story, Collection $collection, CollectionStory $collectionStory, CollectionVideo $collectionVideo)
    {
        $this->middleware('admin');
        $this->user = $user;
        $this->client = $client;
        $this->video = $video;
        $this->story = $story;
        $this->collection = $collection;
        $this->collectionStory = $collectionStory;
        $this->collectionVideo = $collectionVideo;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $clients = $this->client->orderBy('created_at', 'DESC')->where('active', 1);
        $unmoderatedClients = $this->client->orderBy('created_at', 'DESC')->where('active', 0);

        $data = [
            'clients' => $clients->paginate(25),
            'unmoderatedClients' => $unmoderatedClients->paginate(25),
            'user' => auth()->user()
        ];

         return view('admin.clients.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $videos = $this->video->where('state', 'licensed')
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

        $company_id = $this->client->insertGetId([
            'name' => $request->get('company_name'),
            'slug' => $company_slug,
        ]);

        $password = VideoHelper::quickRandom();

        $user_id = $this->user->insertGetId([
            'username' => $company_slug,
            'email' => $request->get('user_email'),
            'full_name' => $request->get('user_full_name'),
            'role' => 'client_owner',
            'password' => \Hash::make($password),
            'client_id' => $company_id
        ]);

        $user = $this->user->find($user_id);

        $client = $this->client->find($company_id);
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

        return redirect()->to('admin/clients')->with([
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
        $company = $this->client->find(auth()->user()->client_id);

        return view('admin.clients.create_edit', [
            'company' => $company,
            'user' => auth()->user(),
            'update_path' => 'client.update',
            'company_users' => $this->user->where('client_id', $company->id)->get()
        ]);
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $company = $this->client->find($id);

        return view('admin.clients.create_edit', [
            'company' => $company,
            'post_route' => url('admin/clients/update'),
            'user' => auth()->user(),
            'update_path' => 'clients.update',
            'company_users' => $this->user->where('client_id', $company->id)->get()
        ]);
    }

    /**
     * @param UpdateCompanyRequest $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateCompanyRequest $request, int $id)
    {
        $data = request()->all();

        $company = $this->client->find($id);

        $company = $company->updateClient($data);

        if($company->active == 1) {
            QueueEmailModerateCompany::dispatch($company);
        }

        //Update all new users linked with this company so they become active
        $users = $company->users()->get();
        foreach($users as $user) {
            $user->active = $company->active;
            $user->save();
        }

        return redirect()->route('clients.edit', ['id' => $company->id])->with([
            'note' => 'Successfully Updated Client Settings',
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
		$client = $this->client->find($client_id);

		$collectionPurchasesVideos = $this->collection->whereHas('collectionVideos', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionVideos')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_videos');

		$collectionPurchasesStories = $this->collection->whereHas('collectionStories', function($query) {
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
		$collectionPurchasesVideos = $this->collection->whereHas('collectionVideos', function($query) {
			$query->where('status', 'purchased');
		})
			->where('client_id', $client_id)
			->with('collectionVideos')
			->with('client')
			->with('user')
			->paginate(20, ['*'], 'purchased_videos');

		$collectionPurchasesStories = $this->collection->whereHas('collectionStories', function($query) {
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
        $client = $this->client->find($id);

        if($client->activeLicences->count() > 0) {
            return redirect()->back()->with([
                'note' => 'Cannot delete client that is currently licensing assets',
                'note_type' => 'error'
            ]);
        }

        $users = $client->users()->update(['active' => '0']);
        foreach($client->users as $user) {
            $user->deleteUsersCollections();
        }
        $client->users()->delete();

        $client->destroy($id);

        return redirect()->to('admin/clients')->with([
            'note' => 'Successfully Deleted Client',
            'note_type' => 'success'
        ]);
    }
}
