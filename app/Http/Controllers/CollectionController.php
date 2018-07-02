<?php

namespace App\Http\Controllers;

use App\Story;
use App\CollectionVideo;
use Auth;
use App\Client;
use App\Collection;
use App\Jobs\QueueEmailCompany;
use App\Jobs\QueueEmailPendingQuote;
use App\Libraries\VideoHelper;
use App\Traits\Slug;
use App\User;
use App\Video;
use Redirect;
use App\Notifications\RequestVideoQuote;
use Illuminate\Http\Request;

class CollectionController extends Controller
{

    use Slug, VideoHelper;

    protected $collection, $collectionVideo, $video, $story, $client, $user;

    /**
     * CollectionController constructor.
     * @param Collection $collection
     * @param CollectionVideo $collectionVideo
     * @param Video $video
     * @param Story $story
     * @param Client $client
     * @param User $user
     */
    public function __construct(Collection $collection, CollectionVideo $collectionVideo, Video $video, Story $story, Client $client, User $user)
    {
        $this->collection = $collection;
        $this->collectionVideo = $collectionVideo;
        $this->video = $video;
        $this->story = $story;
        $this->client = $client;
        $this->user = $user;
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * TODO - Check if video already exists for client (not just user)
     * TODO - Create CollectionVideo/CollectionStory instance. (assoc to this collection)
     **/
    public function store(Request $request)
    {
        $user = auth()->user();

        $data = [
            'name' => "order_".VideoHelper::quickRandom(10),
            'user_id' => $user->id,
            'client_id' => $user->client_id,
            'status' => 'open',
        ];

        $collection = $this->collection->create($data);

        if($request->has('video_alpha_id')) {
            $video = $this->video->where('alpha_id', $request->get('video_alpha_id'))->first();
            $collectionVideo = $collection->addVideoToCollection($video, $user);
        }

        return response([
            'collection_id' => $collection->id,
            'collection_video_id' => $collectionVideo->id ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * Interactive method to retrieve the price and update the db on demand
     * @param Request $request
     * @param $collectionVideoId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
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
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function registerUser(Request $request, $collection_id)
    {
        $data = $request->except('_token');

        $company_slug = $this->slugify($data['company_name']);
        $password = $this->quickRandom();

        $client = $this->client->create([
            'name' => $data['company_name'],
            'slug' => $company_slug,
            'account_owner' => null, //set to null as we don't know this person will be the top dog.
        ]);

        $user = $this->user->create([
            'username' => $company_slug,
            'email' => $data['user_email'],
            'full_name' => $data['user_full_name'],
            'role' => 'client_owner',
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

        return response([
            'user' => $user,
        ], 200);

    }

    /**
     * Send a newly registered user an email telling them we are looking into their request.
     * @param Request $request
     * @param $collection_video_id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function requestVideoQuote(Request $request, $collection_video_id)
    {
        $data = $request->except('_token');
    	$user = Auth::user();
    	$client = $user->client;

        $collectionVideo = $this->collectionVideo->find($collection_video_id);
        $collectionVideo->update([
            'status' =>  'requested',
            'type' =>  $data['license_type'] ??         $collectionVideo->type,
            'platform' =>  $data['license_platform'] ?? $collectionVideo->platform,
            'length' =>  $data['license_length'] ??     $collectionVideo->length,
            'company_location' =>  $client->region,
            'company_tier' =>  $client->tier,
            'final_price' =>  null,
        ]);

        $collection = $collectionVideo->collection;
		$video = $collectionVideo->video;
		$client = $collection->client;

		$params = [
			'username' => is_null($user->full_name) ? $user->username : $user->full_name,
			'user' => $user->email,
            'collection' => $collection
        ];

		$collectionVideo->emailPendingQuote($params);

		$user->slackChannel('quotes')->notify(new RequestVideoQuote($user, $video, $client));

        return response([
            'message' => 'Email has been sent to new user'
        ], 200);
    }

    /**
     * TODO - Check if no one has bought video within the time of clicking 'Buy'
     * @param Request $request
     * @param $collection_video_id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function acceptFinalPrice(Request $request, $collection_video_id)
    {
        $isJson = $request->ajax();

        $user = auth()->user();
        $client = $user->client;
        $collectionVideo = $this->collectionVideo->find($collection_video_id);
        $collection = $collectionVideo->collection;

        if($client->id !== $collection->client_id) {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'You do not have permission to accept this quote',
                    'error' => true,
                ], 200);
            }
            return redirect('/videos');
        }

        if($user->id !== $collection->user_id) {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'This quote does not belong to you',
                    'error' => true
                ], 200);
            }

            return redirect('/videos');
        }

        if($collection->status != 'open'
            || $collectionVideo->status == 'purchased'
            || $collectionVideo->status == 'downloaded') {
            if($isJson) {
                return response([
                    'collection' => null,
                    'message' => 'This collection has been closed',
                    'error' => true
                ], 200);
            }

            return redirect('/videos');
        }

        $collectionVideo->status = "purchased";
        $collectionVideo->save();

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
}
