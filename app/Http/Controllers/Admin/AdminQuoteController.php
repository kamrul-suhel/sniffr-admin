<?php

namespace App\Http\Controllers\Admin;

use App\Collection;
use App\CollectionQuote;
use App\CollectionVideo;
use App\CollectionStory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Quote\CreateQuote;
use App\Jobs\QueueEmailOfferedQuote;
use App\Jobs\QueueEmailRetractQuote;
use Illuminate\Http\Request;

class AdminQuoteController extends Controller {

    protected $collection, $collectionStory, $collectionVideo;

    public function __construct(Collection $collection, CollectionVideo $collectionVideo, CollectionStory $collectionStory)
    {
        $this->collection = $collection;
        $this->collectionVideo = $collectionVideo;
        $this->collectionStory = $collectionStory;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $pendingVideoCollections = $this->collection->whereHas('collectionVideos', function($query) {
           $query->where('status', 'requested');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'pending_video');

        $offeredVideoCollections = $this->collection->whereHas('collectionVideos', function($query) {
            $query->where('status', 'offered');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'offered_video');

		$pendingStoryCollections = $this->collection->whereHas('collectionStories', function($query) {
			$query->where('status', 'requested');
		})->with('collectionStories')->with('client')->with('user')->paginate(10, ['*'], 'pending_story');

		$offeredStoryCollections = $this->collection->whereHas('collectionStories', function($query) {
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
        $collection = $this->collection->find($id);

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
			$collectionVideo = $this->collectionVideo->find($id);
			$collectionVideo->final_price = $request->input('final_price');
			$collectionVideo->status = 'offered';
			$collectionVideo->save();

			$collection_video_id = $collectionVideo->id;
			$type = 'Video';
		}else if($asset_type == 'story'){
			//update collection video status, final_price
			$collectionStory = $this->collectionStory->find($id);
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
            'note' => 'Successfully Offered Quote',
            'note_type' => 'success'
        ]);
    }

    public function destroy(Request $request, $id)
    {
		$asset_type = $request->get('asset_type');
		$collectionAsset = $this->{'collection'.ucwords($asset_type)}->find($id);
		$retractedPrice = $collectionAsset->final_price;
        $collectionAsset->final_price = null;
        $collectionAsset->status = 'requested';
        $collectionAsset->reason = auth()->user()->username . ' rectracted offer of £'. $retractedPrice;
        $collectionAsset->save();

        QueueEmailRetractQuote::dispatch(
            $collectionAsset,
            $asset_type
        );

        //Soft delete quote made
        $quotes = $collectionAsset->quotes->last();
        $quotes->delete();

        return redirect('admin/quotes')->with([
            'note' => 'Retracted Quote',
            'note_type' => 'success'
        ]);
    }

}