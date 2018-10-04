<?php

namespace Tests\Unit;

use App\Packages\AssetSearchEngine;
use App\Story;
use App\Video;
use Tests\CreatesApplication;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AssetSearchEngineTest extends TestCase
{
	use CreatesApplication;

	/**
	 *
	 */
	public function setUp()
	{
		parent::setUp();
		\Artisan::call('migrate:fresh');
		\Artisan::call('db:seed');
	}

	/**
	 *
	 */
	public function tearDown()
	{
		\Artisan::call('migrate:reset');
		parent::tearDown();
	}

	/**
	 *
	 */
	public function testSearchVideoEmptyStringSearch()
    {
    	//Setup
		$data = [
			'state' => '',
			'category' => '',
			'collection' => '',
			'shottype' => '',
			'rights' => '',
			'term' => ''
		];

    	$searchEngine = new AssetSearchEngine(new Video(), $data);

    	//Run
    	$results = $searchEngine->run($data);

    	dd($results);

		//Results
        $this->assertTrue(true);
    }


}
