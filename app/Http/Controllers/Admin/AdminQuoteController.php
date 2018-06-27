<?php

namespace App\Http\Controllers\Admin;

use App\Collection;
use App\CollectionQuote;
use App\CollectionVideo;
use App\Http\Controllers\Controller;
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
        $collections = Collection::whereHas('collectionVideos', function($query) {
           $query->where('status', 'requested');
        })->with('collectionVideos')->get();

        return view('admin.quotes.index')
            ->with('collections', $collections);
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
     */
    public function update(Request $request, $id)
    {
        //update collection video status, final_price
        $collectionVideo = CollectionVideo::find($id);
        $collectionVideo->final_price = $request->get('final_price');
        $collectionVideo->save();

        //create log of quoted amount for video
        $collectionQuote = new CollectionQuote();
        $collectionQuote->video_id = $collectionVideo->video_id;
        $collectionQuote->user_id = auth()->user()->id;
        $collectionQuote->price = $request->get('final_price');
        $collectionQuote->discount = $request->get('discount');
        $collectionQuote->save();

        //TODO email client of offer

        //TODO redirect back to quotes page
        return redirect('admin/quotes');
    }

}