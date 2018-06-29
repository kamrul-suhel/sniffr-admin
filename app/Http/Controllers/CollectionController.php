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
use Redirect;
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

        if($request->has('video_alpha_id')) {
            $video = Video::where('alpha_id', $request->get('video_alpha_id'))->first();
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
            'collection_video_id' => $collectionVideo->id ?? null,
            'collection_story_id' => $collectionStory ?? null,
            'message' => "New collection created."
        ], 200);
    }

    /**
     * @param Request $request
     * @param $collectionVideoId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function getVideoPrice(Request $request, $collectionVideoId)
	{
	    $user = auth()->user();

        $video = Video::where('alpha_id', $request->get('video_alpha_id'))->first();

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

			$collectionVideo->type = $request->input('license_type') ??         $collectionVideo->type;
			$collectionVideo->platform = $request->input('license_platform') ?? $collectionVideo->platform;
			$collectionVideo->length = $request->input('license_length') ??     $collectionVideo->length;

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
		$isJson = $request->ajax();

		$user = auth()->user();
		$client = $user->client;
        $collectionVideo = CollectionVideo::find($collection_video_id);
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

        $collectionVideo->type = $request->input('license_type') ??         $collectionVideo->type;
        $collectionVideo->platform = $request->input('license_platform') ?? $collectionVideo->platform;
        $collectionVideo->length = $request->input('license_length') ??     $collectionVideo->length;
        $collectionVideo->company_location = $client->region;
        $collectionVideo->company_tier = $client->tier;
        $collectionVideo->final_price = null;
        $collectionVideo->save();

        $collection = $collectionVideo->collection;

		$video = $collectionVideo->video;
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
