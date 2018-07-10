<?php

namespace App\Http\Controllers\Admin;

use App\Collection;
use App\CollectionQuote;
use App\CollectionVideo;
use App\CollectionStory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Quote\CreateQuote;
use App\Jobs\QueueEmailOfferedQuote;
use Illuminate\Http\Request;

class AdminQuoteController extends Controller {

    public function __construct()
    {

    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $pendingVideoCollections = Collection::whereHas('collectionVideos', function($query) {
           $query->where('status', 'requested');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'pending_video');

        $offeredVideoCollections = Collection::whereHas('collectionVideos', function($query) {
            $query->where('status', 'offered');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'offered_video');

		$pendingStoryCollections = Collection::whereHas('collectionStories', function($query) {
			$query->where('status', 'requested');
		})->with('collectionStories')->with('client')->with('user')->paginate(10, ['*'], 'pending_story');

		$offeredStoryCollections = Collection::whereHas('collectionStories', function($query) {
			$query->where('status', 'offered');
		})->with('collectionStories')->with('client')->with('user')->paginate(10, ['*'], 'offered_story');

        return view('admin.quotes.index')
            ->with('pendingVideoCollections', $pendingVideoCollections)
            ->with('offeredVideoCollections', $offeredVideoCollections)
			->with('pendingStoryCollections', $pendingStoryCollections)
			->with('offeredStoryCollections', $offeredStoryCollections);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show($id)
    {
        $collection = Collection::find($id);

        return view('admin.quotes.show')
            ->with('collection', $collection);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(CreateQuote $request, $id)
    {
    	$asset_type = $request->get('asset_type');

    	$collection_video_id = null;
		$collection_story_id = null;
		$type = '';
    	if($asset_type == 'video'){
			//update collection video status, final_price
			$collectionVideo = CollectionVideo::find($id);
			$collectionVideo->final_price = $request->input('final_price');
			$collectionVideo->status = 'offered';
			$collectionVideo->save();

			$collection_video_id = $collectionVideo->id;
			$type = 'Video';
		}else if($asset_type == 'story'){
			//update collection video status, final_price
			$collectionStory = CollectionStory::find($id);
			$collectionStory->final_price = $request->input('final_price');
			$collectionStory->status = 'offered';
			$collectionStory->save();

			$collection_story_id = $collectionStory->id;
			$type = 'Story';
		}

		//create log of quoted amount for video
		$collectionQuote = new CollectionQuote();
		$collectionQuote->collection_video_id = $collection_video_id;
		$collectionQuote->collection_story_id = $collection_story_id;
		$collectionQuote->user_id = auth()->user()->id; //offered by the admin signed in
		$collectionQuote->price = $request->input('final_price');
		$collectionQuote->save();

        QueueEmailOfferedQuote::dispatch(
			$collectionQuote,
			$type
        );

        return redirect('admin/quotes')->with([
				'note' => 'Quote successfully sent',
				'note_type' => 'success'
			]);;
    }

    public function destroy(Request $request, $id)
    {
		$asset_type = $request->get('asset_type');

		if($asset_type == 'video') {
			$collectionVideo = CollectionVideo::find($id);
			$collectionVideo->final_price = null;
			$collectionVideo->status = 'requested';
			$collectionVideo->save();

			$quotes = $collectionVideo->quotes->last();
		}else if($asset_type == 'story'){
			$collectionStory = CollectionStory::find($id);
			$collectionStory->final_price = null;
			$collectionStory->status = 'requested';
			$collectionStory->save();

			$quotes = $collectionStory->quotes->last();
		}

        //Soft delete quote made
        $quotes->delete();

        //TODO email client that we've retracted our offer

        return redirect('admin/quotes');
    }

}