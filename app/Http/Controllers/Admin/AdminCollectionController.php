<?php

namespace App\Http\Controllers\Admin;

use App\Client;
use App\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminCollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Client::with('collections')
            ->with('collections.collectionVideos')
            ->with('collections.collectionStories')
            ->orderBy('name', 'ASC')
            ->get();

        foreach($companies as $company) {
			$company['collectionVideosCount'] = $company->collections()
				->with('collectionVideos')
				->whereHas('collectionVideos', function ($query) use ($company) {
					$query->where('client_id', $company->id);
				})->count();
			$company['collectionStoriesCount'] = $company->collections()
				->whereHas('collectionStories', function ($query) use ($company) {
					$query->where('client_id', $company->id);
				})->count();
		}

        return view('admin.collections.index')
            ->with('companies', $companies);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //TODO - Get single collection, and show videos/stories
        $collection = Collection::with('collectionVideos')
            ->with('collectionStories')
            ->with('user')
            ->find($id);

        return view('admin.collections.create_edit')
            ->with('collection', $collection);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
