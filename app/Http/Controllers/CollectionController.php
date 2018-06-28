<?php

namespace App\Http\Controllers;

use Auth;
use App\Client;
use App\Collection;
use App\CollectionStory;
use App\CollectionVideo;
use App\Jobs\QueueEmailCompany;
use App\Jobs\QueueEmailPendingQuote;
use App\Libraries\VideoHelper;
use App\Traits\Slug;
use App\User;
use App\Video;
use App\Notifications\RequestVideoQuote;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CollectionController extends Controller
{

    use Slug;

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * - Check if video already exists for client (not just user)
     * - Check if no one has bought video within the time of clicking 'Buy'
     * - Create CollectionVideo/CollectionStory instance. (assoc to this collection)
     **/
    public function store(Request $request)
    {
        $data = $request->except("_token");
        $user = auth()->user();

        $collection = new Collection();
        $collection->name = "order_".VideoHelper::quickRandom(10);
        $collection->user_id = $user->id;
        $collection->client_id = $user->client->id;
        $collection->status = "open";
        $collection->save();

        if($request->has('video_id')) {
            $video = Video::find($request->get('video_id'));
            $collectionVideo = new CollectionVideo();
            $collectionVideo->collection_id = $collection->id;
            $collectionVideo->video_id = $video->id;
            $collectionVideo->type = null;
            $collectionVideo->platform = null;
            $collectionVideo->length = null;
            $collectionVideo->class = $video->class;
            $collectionVideo->final_price = config('pricing.base');
            $collectionVideo->company_location = $user->client->region;
            $collectionVideo->company_tier = $user->client->tier;
            $collectionVideo->status = 'received';
            $collectionVideo->save();
        }

        if($request->has('story_id')) {
            $collectionStory = new CollectionStory();
            $collectionStory->collection_id = $collection->id;
            $collectionStory->story_id = $request->get('story_id');
            $collectionStory->status = 'received';
            $collectionStory->final_price = 0;
            $collectionStory->save();
        }

        return response([
            'collection_id' => $collection->id,
            'collection_video_id' => $collectionVideo->id,
            'collection_story_id' => $collectionStory ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * TODO - Get base price
     * TODO - Add company_tier to base price
     * TODO - Add company_location to base price
     * @param Request $request
     * @param $collectionId
     * @param $collectionVideoId
     * @param $videoId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function getVideoPrice(Request $request, $collectionVideoId)
	{
		$user = auth()->user();
		$video = Video::find($request->input('video_id'));

		if ($video && $video->class != 'exceptional'){
			$client = $user->client;
			$collectionVideo = CollectionVideo::find($collectionVideoId);

			$price = config('pricing.base');

			$price = $price * (config('pricing.class.' . $video->class . '.modifier') ?: 1);
			$price = $price * (config('pricing.locations.' . $client->location . '.modifier') ?: 1);
			$price = $price * (config('pricing.tier.' . $client->tier . '.modifier') ?: 1);
			$price = $price * (config('pricing.type.' . $request->input('license_type') . '.modifier') ?: 1);
			$price = $price * (config('pricing.platform.' . $request->input('license_platform') . '.modifier') ?: 1);
			$price = $price * (config('pricing.length.' . $request->input('license_length') . '.modifier') ?: 1);

			$price = round($price, 2);

			$collectionVideo->type = $request->input('license_type') ?? $collectionVideo->type;
			$collectionVideo->platform = $request->input('license_platform') ?? $collectionVideo->platform;
			$collectionVideo->length = $request->input('license_length') ?? $collectionVideo->length;
			$collectionVideo->company_location = $client->region;
			$collectionVideo->company_tier = $client->tier;
			$collectionVideo->final_price = $price;
			$collectionVideo->save();

			return response(['price' => $price], 200);
		}

		return response(['price' => ''], 200);
    }

    /**
     * @param Request $request
     * @param $collection_video_id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function acceptFinalPrice(Request $request, $collection_video_id)
    {
        $collectionVideo = CollectionVideo::find($collection_video_id);
        $collection = $collectionVideo->collection;

        $collectionVideo->status = "purchased";
        $collectionVideo->save();

        $collection->status = "closed";
        $collection->save();

        return response([
            'collection' => $collection,
            'message' => 'final price has been accepted'
        ], 200);
    }

    /**
     * Register new user, and email then set password email.
     * @param Request $request
     * @param $collection_id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function registerUser(Request $request, $collection_id)
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
        $client->account_owner_id = null; //set to null as we dont know this person will be the top dog.
        $client->save();

        $token = app('App\Http\Controllers\Admin\AdminUsersController')->getToken($request->get('user_email'), $user);

        QueueEmailCompany::dispatch(
            $company_id,
            $request->get('user_email'),
            $request->get('user_full_name'),
            $request->get('user_full_name'),
            $token
        );

        $collection = Collection::find($collection_id);
        $collection->user_id = $user->id;
        $collection->client_id = $client->id;
        $collection->save();

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
    	$user = Auth::user();
    	$client = $user->client;

        $collectionVideo = CollectionVideo::find($collection_video_id);
        $collectionVideo->status = 'requested';
        $collectionVideo->type = $request->input('license_type') ?? $collectionVideo->type;
        $collectionVideo->platform = $request->input('license_platform') ?? $collectionVideo->platform;
        $collectionVideo->length = $request->input('license_length') ?? $collectionVideo->length;
        $collectionVideo->company_location = $client->region;
        $collectionVideo->company_tier = $client->tier;

        $collectionVideo->save();
        $collection = $collectionVideo->collection;

		$video = Video::find($collectionVideo->video_id);
		$client = $collection->client;

        QueueEmailPendingQuote::dispatch(
			is_null($user->full_name) ? $user->username : $user->full_name,
			$user->email,
            $collection
        );

		$user->slackChannel('quotes')->notify(new RequestVideoQuote($user, $video, $client));

        return response([
            'message' => 'Email has been sent to new user'
        ], 200);
    }

}
