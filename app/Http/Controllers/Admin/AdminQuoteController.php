<?php

namespace App\Http\Controllers\Admin;

use App\Collection;
use App\CollectionQuote;
use App\CollectionVideo;
use App\CollectionStory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Quote\CreateQuote;
use App\Jobs\Quotes\QueueEmailOfferedQuote;
use App\Jobs\Quotes\QueueEmailRetractQuote;
use Illuminate\Http\Request;

class AdminQuoteController extends Controller
{

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
        $pendingVideoCollections = $this->collection->whereHas('collectionVideos', function ($query) {
            $query->where('status', 'requested');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'pending_video');

        $offeredVideoCollections = $this->collection->whereHas('collectionVideos', function ($query) {
            $query->where('status', 'offered');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'offered_video');

        $pendingStoryCollections = $this->collection->whereHas('collectionStories', function ($query) {
            $query->where('status', 'requested');
        })->with('collectionStories')->with('client')->with('user')->paginate(10, ['*'], 'pending_story');

        $offeredStoryCollections = $this->collection->whereHas('collectionStories', function ($query) {
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
     * @param CreateQuote $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CreateQuote $request, $id)
    {
        $asset_type = $request->get('asset_type');
        $data = request()->all();

        $collection_video_id = null;
        $collection_story_id = null;

        $asset = $this->{'collection'.ucwords($asset_type)}->find($id);
        $asset->final_price = request()->has('delete') ? null : $request->input('final_price');
        $asset->status = request()->has('delete') ? 'closed' : request()->has('update-quote') ? 'requested' : 'offered';
        $asset->reason = request()->has('delete') ? 'Ignored By Admin (id: ' . auth()->user()->id . ')' : null;
        $asset->type = isset($data['license_type']) ? $data['license_type'] : $asset->type;
        $asset->platform = isset($data['license_platform']) ? implode(',', $data['license_platform']) : $asset->platform;
        $asset->length = isset($data['license_type']) ? $data['license_length'] : $asset->length;
        $asset->save();

        if (!request()->has('delete') && !request()->has('update-quote')) {
            //create log of quoted amount for video
            $collectionQuote = new CollectionQuote();
            $collectionQuote->collection_video_id = $asset_type == "video" ? $asset->id : null;
            $collectionQuote->collection_story_id = $asset_type == "story" ? $asset->id : null;
            $collectionQuote->user_id = auth()->user()->id; //offered by the admin signed in
            $collectionQuote->price = $request->input('final_price') ?? $collectionQuote->price;
            $collectionQuote->save();

            QueueEmailOfferedQuote::dispatch(
                $collectionQuote,
                $asset_type
            );
        }

        return redirect('admin/quotes')->with([
            'note' => request()->has('delete') ? 'Quote successfully Ignored' : request()->has('update-quote') ? "License Terms Updated" : "Quote successfully Sent",
            'note_type' => 'success',
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $asset_type = $request->get('asset_type');
        $collectionAsset = $this->{'collection' . ucwords($asset_type)}->find($id);
        $retractedPrice = $collectionAsset->final_price;
        $collectionAsset->final_price = null;
        $collectionAsset->status = 'requested';
        $collectionAsset->reason = auth()->user()->username . ' revoked offer of £' . $retractedPrice;
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