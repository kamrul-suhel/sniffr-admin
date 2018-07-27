<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserQuoteRequest;
use App\Jobs\Quotes\QueueEmailRetractQuote;
use App\Traits\FrontendResponse;
use Auth;
use App\Client;
use App\Collection;
use App\Libraries\VideoHelper;
use App\Traits\Slug;
use App\User;
use App\Video;
use App\Story;
use App\CollectionVideo;
use App\CollectionStory;
use App\CollectionQuote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Redirect;
use App\Notifications\RequestQuote;

class CollectionController extends Controller
{

    use Slug, VideoHelper, FrontendResponse;

    protected $collection, $collectionVideo, $collectionStory, $collectionQuote,  $video, $story, $client, $user;

    /**
     * CollectionController constructor.
     * @param Collection $collection
     * @param CollectionVideo $collectionVideo
     * @param CollectionStory $collectionStory
     * @param CollectionQuote $collectionQuote
     * @param Video $video
     * @param Story $story
     * @param Client $client
     * @param User $user
     */
    public function __construct(
        Collection $collection, CollectionVideo $collectionVideo, CollectionStory $collectionStory,
        CollectionQuote $collectionQuote, Video $video, Story $story, Client $client, User $user)
    {
        $this->collection = $collection;
        $this->collectionVideo = $collectionVideo;
		$this->collectionStory = $collectionStory;
		$this->collectionQuote = $collectionQuote;
        $this->video = $video;
        $this->story = $story;
        $this->client = $client;
        $this->user = $user;
    }

    /**
     * TODO - Check if video already exists for client (not just user)
     * TODO - Create CollectionVideo/CollectionStory instance. (assoc to this collection)
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $data = [
            'name' => "order_".strtolower(str_random(10)),
            'user_id' => $user->id ?? null,
            'client_id' => $user->client_id ?? null,
            'status' => 'open',
        ];

        $collection = $this->collection->create($data);

        if($request->get('type') == 'video') {
            $video = $this->video->where('alpha_id', $request->get('asset_alpha_id'))->first();
            $collectionVideo = $collection->addVideoToCollection($video, $user);
        }else{
			$story = $this->story->where('alpha_id', $request->get('asset_alpha_id'))->first();
			$collectionStory = $collection->addStoryToCollection($story, $user);
		}

        return response([
            'collection' => $collection,
            'collection_id' => $collection->id,
            'collection_video_id' => $collectionVideo->id ?? null,
			'collection_story_id' => $collectionStory->id ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * Interactive method to retrieve the price and update the db on demand
     * @param Request $request
     * @param $collectionVideoId
     * @return mixed
     */
    public function getVideoPrice(Request $request, $collectionVideoId)
	{
	    $user = auth()->user();

        $video = $this->video->where('alpha_id', $request->get('video_alpha_id'))->first();

		if ($video && $video->class != 'exceptional'){
			$client = $user->client;
			$collectionVideo = $this->collectionVideo->find($collectionVideoId);

			$pricingMetrics = $this->gatherMetricsForPricing($video, $client, $collectionVideo);

			$finalPrice = $collectionVideo->calculatePrice($pricingMetrics);

			$collectionVideo->update([
                'type'=> $pricingMetrics['license_type'],
                'platform'=> $pricingMetrics['license_platform'],
                'length'=> $pricingMetrics['license_length'],
                'company_location'=> $client->region,
                'company_tier'=> $client->tier,
                'final_price'=> $finalPrice,
            ]);

			return response(['price' => $collectionVideo->final_price], 200);
		}

		return response(['price' => ''], 200);
    }

    /**
     * Gather metrics so we can calculate the final price for a CollectionVideo
     * @param Video $video
     * @param Client $client
     * @param CollectionVideo $collectionVideo
     * @return array
     */
    private function gatherMetricsForPricing(Video $video, Client $client, CollectionVideo $collectionVideo)
    {
        return $pricingMetrics = [
            'class' => $video->class,
            'location' => $client->location,
            'tier' => $client->tier,
            'license_type' => request()->input('license_type') ??   $collectionVideo->type,
            'license_platform' => request()->input('license_platform') ?? $collectionVideo->platform,
            'license_length' => request()->input('license_length') ?? $collectionVideo->length,
        ];
    }

    /**
     * Register new user, and email then set password email. Also create a new collection and link to that user
     * @param Request $request
     * @param $collection_id
     * @return mixed
     */
    public function registerUser(CreateUserQuoteRequest $request, $collection_id)
    {
        $data = $request->all();

        $company_slug = $this->slugify($data['company_name']);
        $password = $this->quickRandom();

        $client = $this->client->create([
            'name' => $data['company_name'],
            'slug' => $company_slug,
            'active' => 0,
            'account_owner_id' => null, //set to null as we don't know this person will be the top dog.
        ]);

        $user = $this->user->create([
            'username' => $company_slug,
            'email' => $data['user_email'],
            'full_name' => $data['user_full_name'],
            'role' => 'client_owner',
            'tel' => $data['tel'],
            'active' => 0,
            'password' => \Hash::make($password),
            'client_id' => $client->id
        ]);

        $params = [
            'company_id' => $client->id,
            'user_email' => $user->email,
            'user_full_name' => $user->full_name,
            'token' => app('App\Http\Controllers\Admin\AdminUsersController')->getToken($user->email, $user)
        ];

        $client->emailNewCompanyUser($params);

        $collection = $this->collection->find($collection_id);

        $collection->update(['user_id' => $user->id, 'client_id' => $client->id]);


        //TODO fucking disgusting
        $data['type'] = 'video';
        if(isset($data['story_alpha_id'])) {
            $data['type'] = 'story';
        }

        $this->requestAfterRegister($data, $user, $data['type']);

        return $this->successResponse([
            'user' => $user,
            'message' => "You have also successfully registered.
             Check your emails to set your password, and activate your account."
        ]);

    }

    /**
     * @param $data
     * @param $user
     * @param string $type
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function requestAfterRegister($data, $user, $type = 'video')
    {
        $client = $user->client;
        $collection_asset_id = $data['collection_asset_id'];

        if ($type == 'video'){
            $collectionVideo = $this->collectionVideo->find($collection_asset_id);
            $collectionVideo->update([
                'type' => $data['license_type'] ?? $collectionVideo->type,
                'platform' => $data['license_platform'] ?? $collectionVideo->platform,
                'length' => $data['license_length'] ?? $collectionVideo->length,
                'company_location' => $client->region,
                'company_tier' => $client->tier,
                'notes' => $data['notes'] ?? '',
                'status' => 'requested',
                'final_price' => null,
            ]);

            $collection = $collectionVideo->collection;
            $asset = $collectionVideo->video;
        }else{
            $collectionStory = $this->collectionStory->find($collection_asset_id);
            $collectionStory->update([
                'notes' => $data['notes'] ?? '',
                'status' => 'requested',
                'final_price' => null,
            ]);

            $collection = $collectionStory->collection;
            $asset = $collectionStory->story;
        }

        $params = [
            'username' => is_null($user->full_name) ? $user->username : $user->full_name,
            'user' => $user->email,
            'collection' => $collection
        ];

        $collectionQuote = new CollectionQuote;
        $collectionQuote->emailPendingQuote($params);

        if(env('APP_ENV') === 'prod') {
            $user->slackChannel('quotes')->notify(new RequestQuote($user, $client, $asset));
        }

        return response([
            'message' => 'Email has been sent to new user'
        ], 200);
    }

    /**
     * Send a newly registered user an email telling them we are looking into their request.
     * @param Request $request
     * @param $type
     * @param $collection_asset_id
     * @return mixed
     */
    public function requestQuote(Request $request, $type, $collection_asset_id)
	{
		$data = $request->except('_token');
		$user = Auth::user();
		$client = $user->client;

		if ($type == 'video'){
			$collectionVideo = $this->collectionVideo->find($collection_asset_id);
			$collectionVideo->update([
				'type' => $data['license_type'] ?? $collectionVideo->type,
				'platform' => $data['license_platform'] ?? $collectionVideo->platform,
				'length' => $data['license_length'] ?? $collectionVideo->length,
				'company_location' => $client->region,
				'company_tier' => $client->tier,
				'notes' => $data['notes'] ?? '',
				'status' => 'requested',
				'final_price' => null,
			]);

			$collection = $collectionVideo->collection;
			$asset = $collectionVideo->video;
		}else{
			$collectionStory = $this->collectionStory->find($collection_asset_id);
			$collectionStory->update([
				'notes' => $data['notes'] ?? '',
				'status' => 'requested',
				'final_price' => null,
			]);

			$collection = $collectionStory->collection;
			$asset = $collectionStory->story;
		}
		$client = $collection->client;

		$params = [
			'username' => is_null($user->full_name) ? $user->username : $user->full_name,
			'user' => $user->email,
            'collection' => $collection
        ];

		$collectionQuote = new CollectionQuote;
		$collectionQuote->emailPendingQuote($params);

		if(env('APP_ENV') === 'prod') {
            $user->slackChannel('quotes')->notify(new RequestQuote($user, $client, $asset));
        }

        return response([
            'message' => 'Email has been sent to new user'
        ], 200);
    }

    /**
     * Accept the price on an individual asset. but keep the collection open for other options to be available
     * @param Request $request
     * @param $collection_asset_id
     * @param $type
     * @return mixed
     */
	public function acceptAssetQuote(Request $request, $collection_asset_id, $type){
		// Accept asset price
		$isJson = $request->ajax();

		$collectionAsset = $this->{'collection'.ucfirst($type)}->find($collection_asset_id);
		$collection = $collectionAsset->collection;

        if($collectionAsset->status === 'expired') {
            if($isJson){
                return $this->errorResponse([
                    'collection' => $collection,
                    'message' => 'This offer has expired',
                    'reason' => $collectionAsset->reason
                ]);
            }
        }

		if($collection->status === "closed") {
            if($isJson){
                return $this->errorResponse([
                    'collection' => $collection,
                    'message' => 'This item is no longer available'
                ]);
            }
        }

		$collection->status = "closed";
		$collection->save();

		$collectionAsset->status = "purchased";
		$collectionAsset->license_ends_at = $collectionAsset->calculateLicenseEndTime();
		$collectionAsset->licensed_at = Carbon::now();
		$collectionAsset->save();

		// If exclusive type of asset is purchased,
        // Expire all other collections with same asset. Close collection too
		if($collectionAsset->type === 'exclusive') {
		    $itemInCollectionAsset = $this->{'collection'.ucfirst($type)}
                ->where('video_id', $collectionAsset->video_id)
                ->where('status', '!=', 'purchased')
                ->where('id', '!=', $collectionAsset->id);

            $itemInCollectionAsset
                ->update([
                    'status' => 'expired',
                    'reason' => 'Asset bought Exclusively by '. $collectionAsset->collection->user->client->name . '. (id:'.$collectionAsset->id.')'
                ]);

		    $itemsInCollectionAssetCollectionIds = $itemInCollectionAsset->pluck('collection_id');
		    $this->collection
                ->whereIn('id', $itemsInCollectionAssetCollectionIds)
                ->whereNotNull('user_id')
                ->update(['status' => 'closed']);

		    foreach($itemInCollectionAsset->get() as $collectionAsset) {
		        if(isset($collectionAsset->collection->user)){
                    QueueEmailRetractQuote::dispatch(
                        $collectionAsset,
                        $type
                    );
                }


            }

        }

		if($isJson){
			return $this->successResponse([
				'collection' => $collection,
				'message' => 'final price has been accepted'
			]);
		}

		return Redirect::to('client/purchased')
			->with([
				'note' => 'Thanks for purchasing the video',
				'note_type' => 'success',
			]);
	}

    /**
     * Reject an asset quote and close the collection_asset
     * @param Request $request
     * @param $collection_asset_id
     * @param $type
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function rejectAssetQuote(Request $request, $collection_asset_id, $type){
        // Accept asset price
        $isJson = $request->ajax();

        $collectionAsset = $this->{'collection'.ucfirst($type)}->find($collection_asset_id);
        $collection = $collectionAsset->collection;

        $collectionAsset->status = "closed";
        $collectionAsset->save();

        $collection->status = "closed";
        $collection->save();

        if($isJson){
            return $this->successResponse([
                'collection' => $collection,
                'message' => 'final price has been rejected'
            ]);
        }

        return Redirect::to('client/purchased')
            ->with([
                'note' => 'Thanks for purchasing the video',
                'note_type' => 'success',
            ]);
    }

    /**
     * Accept an asset and close the collection
     * @param Request $request
     * @param $collection_id
     * @param $quote_id
     * @return mixed
     */
    public function acceptCollectionQuote(Request $request, $collection_id, $quote_id)
    {
        $isJson = $request->ajax();

        $user = auth()->user();
        $client = $user->client;
        $collection = $this->collection->find($collection_id);
        $quote = $this->collectionQuote->find($quote_id);

        $type = $quote->collection_video_id ? 'Video' : 'Story';
		$collectionAsset = $this->${'collection'.ucfirst($type)};

        if($client->id !== $collection->client_id) {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'You do not have permission to accept this quote',
                    'error' => true,
                ], 200);
            }

            return redirect('/');
        }

        if($user->id !== $collection->user_id) {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'This quote does not belong to you',
                    'error' => true
                ], 200);
            }

            return redirect('/');
        }

        if($collection->status != 'open'
            || $collectionAsset->status == 'purchased'
            || $collectionAsset->status == 'downloaded') {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'This collection has been closed',
                    'error' => true
                ], 200);
            }

            return redirect('/');
        }

		$collectionAsset->status = "purchased";
		$collectionAsset->save();

        $collection->status = "closed";
        $collection->save();

        if($isJson){
            return response([
                'collection' => $collection,
                'message' => 'final price has been accepted'
            ], 200);
        }

        return Redirect::to('client/purchased')
            ->with([
                'note' => 'Thanks for purchasing the video',
                'note_type' => 'success',
            ]);
    }

    /**
     * Get alpha id of all assets that have ongoing exclusive license agreements
     * @param $type
     * @return \Illuminate\Support\Collection
     */
    public function getExclusivePurchasedAsset($type)
    {
        $collectionAsset = $this->{'collection'.ucfirst($type)};
        $exclusiveAsset = $collectionAsset->getAssetByTypeStatus('exclusive', 'purchased');

        return $this->successResponse([
            'data' => $this->{$type}->whereIn('id', $exclusiveAsset->pluck('video_id'))->pluck('alpha_id')
        ]);
    }
}
