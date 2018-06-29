<?php

namespace App\Http\Controllers\Admin;

use App\Collection;
use App\CollectionQuote;
use App\CollectionVideo;
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
        $pendingCollections = Collection::whereHas('collectionVideos', function($query) {
           $query->where('status', 'requested');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'pending');

        $offeredCollections = Collection::whereHas('collectionVideos', function($query) {
            $query->where('status', 'offered');
        })->with('collectionVideos')->with('client')->with('user')->paginate(10, ['*'], 'offered');

        return view('admin.quotes.index')
            ->with('pendingCollections', $pendingCollections)
            ->with('offeredCollections', $offeredCollections);
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
        //update collection video status, final_price
        $collectionVideo = CollectionVideo::find($id);
        $collectionVideo->final_price = $request->get('final_price');
        $collectionVideo->status = 'offered';
        $collectionVideo->save();

        //create log of quoted amount for video
        $collectionQuote = new CollectionQuote();
        $collectionQuote->collection_video_id = $collectionVideo->id;
        $collectionQuote->user_id = auth()->user()->id; //offered by the admin signed in
        $collectionQuote->price = $request->get('final_price');
        $collectionQuote->save();

        QueueEmailOfferedQuote::dispatch(
            $collectionVideo->collection->user->full_name ??
            $collectionVideo->collection->user->first_name ??
            $collectionVideo->collection->user->username,
            $collectionVideo->collection->user->email,
            $collectionVideo
        );

        return redirect('admin/quotes');
    }

    public function destroy(Request $request, $id)
    {
        //update collection to remove anything set
        $collectionVideo = CollectionVideo::find($id);
        $collectionVideo->final_price = null;
        $collectionVideo->status = 'requested';
        $collectionVideo->save();

        //Soft delete quote made
        $quotes = $collectionVideo->quotes->last();
        $quotes->delete();

        //TODO email client that we've retracted our offer

        //TODO redirect back to quotes page
        return redirect('admin/quotes');
    }

}