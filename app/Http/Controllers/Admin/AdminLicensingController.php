<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Packages\AssetSearchEngine;
use Illuminate\Http\Request;

class AdminLicensingController extends Controller
{
	/**
	 * @var \Illuminate\Foundation\Application|mixed
	 */
    protected $assetModel, $assetType, $search;

	/**
	 * LicensingController constructor.
	 */
    public function __construct()
    {
    	// Get the Model name from the URL we are currently on
        $this->assetType = request()->segment(3);

        // Instantiate the asset model type
        $class = 'App\\'.str_singular(ucwords($this->assetType));

        if(!class_exists($class)){
            return;
        }
        $this->assetModel = app($class);

        // Instantiate the search engine
        $this->search = new AssetSearchEngine($this->assetModel, request()->all());
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
    	// Run the search engine to query the db for the assets,
		// and return an array of data.
        $data = $this->search->run();

        return view('admin.assets.index', $data);
    }
}
