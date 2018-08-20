<?php

namespace Quote;

use App\Collection;
use App\CollectionQuote;
use App\Video;

class CollectionAssetTest extends \Codeception\Test\Unit
{
	/**
	 * @var \UnitTester
	 */
	protected $tester, $testUser, $testAdmin;

	protected function _before()
	{
		$this->testUser = $this->make('App\User', [
			'id' => 1,
			'client_id' => 1,
			'role' => 'client_owner',
			'email' => 'ian@unilad.co.uk',
			'password' => \Hash::make(env('CLIENT_PASSWORD'))
		]);

		$this->testAdmin = $this->make('App\User', [
			'id' => 2,
			'client_id' => null,
			'role' => 'admin',
			'email' => 'admin@unilad.co.uk',
			'password' => \Hash::make(env('CLIENT_PASSWORD'))
		]);

	}

	protected function _after()
	{
	}

	// tests
	public function testAddAssetToExistingCollection()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_" . strtolower(str_random(10)),
			'user_id' => $this->testUser->id,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		$video = [
			'id' => 1,
			'alpha_id' => 'abcd123',
		];
		$video = Video::create($video);

		$collection = Collection::create($data);

		//execute
		$collectionVideo = $collection->addVideoToCollection($video);

		//results
		$this->assertEquals($collectionVideo->collection_id, $collection->id);

	}

	/**
	 * testAcceptQuoteOnCollectionIOwn
	 */
	public function testAcceptQuoteOnCollectionIOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_" . strtolower(str_random(10)),
			'user_id' => $this->testUser->id,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		$video = [
			'id' => 1,
			'alpha_id' => 'abcd123',
		];
		$video = Video::create($video);

		$collection = Collection::create($data);

		$collectionVideo = $collection->addVideoToCollection($video);

		//execute
		auth()->login($this->testUser);
		$collectionVideo->acceptAssetQuote();
		$collectionVideo->collection->updateCollection(['status' => 'closed']);

		//results
		$this->assertEquals('purchased', $collectionVideo->status);
		$this->assertEquals('closed', $collectionVideo->collection->status);

	}

	/**
	 * testAcceptQuoteOnCollectionIDonNotOwn
	 */
	public function testAcceptQuoteOnCollectionIDonNotOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_" . strtolower(str_random(10)),
			'user_id' => 5,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		$video = [
			'id' => 1,
			'alpha_id' => 'abcd123',
		];
		$video = Video::create($video);

		$collection = Collection::create($data);

		$assetData = [
			'collection_id' => 1,
			'video_id' => 1,
			'type' => 'exclusive',
			'platform' => 'tv-platform',
			'length' => 'week',
			'class' => 'exceptional',
			'company_location' => 'uk',
			'company_tier' => 'enterprise',
			'notes' => 'This is a note',
			'final_price' => null,
			'status' => 'open',
			'reason' => null,
		];

		$collectionVideo = $collection->addVideoToCollection($video);

		//execute
		auth()->login($this->testUser);
		$result = $collectionVideo->acceptAssetQuote();

		//results
		$this->assertFalse($result);
		$this->assertEquals('received', $collectionVideo->status);
		$this->assertEquals('open', $collectionVideo->collection->status);

	}

	/**
	 * testRejectQuoteOnCollectionIOwn
	 */
	public function testRejectQuoteOnCollectionIOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_" . strtolower(str_random(10)),
			'user_id' => 1,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		$video = [
			'id' => 1,
			'alpha_id' => 'abcd123',
		];
		$video = Video::create($video);

		$collection = Collection::create($data);

		$assetData = [
			'collection_id' => 1,
			'video_id' => 1,
			'type' => 'exclusive',
			'platform' => 'tv-platform',
			'length' => 'week',
			'class' => 'exceptional',
			'company_location' => 'uk',
			'company_tier' => 'enterprise',
			'notes' => 'This is a note',
			'final_price' => null,
			'status' => 'open',
			'reason' => null,
		];

		$collectionVideo = $collection->addVideoToCollection($video);

		$collectionQuote = new CollectionQuote();
		$collectionQuote->collection_video_id = $collectionVideo->id;
		$collectionQuote->user_id = $this->testAdmin->id; //offered by the admin signed in
		$collectionQuote->price = 10000;
		$collectionQuote->save();

		//execute
		auth()->login($this->testUser);
		$result = $collectionVideo->rejectAssetQuote(); //send back to requested. add a rejection note with the assets quote. collection is untouched.
		$collectionVideo->updateCollectionQuote(['rejection_notes' => 'rejected offer because...']);

		//results
		$updatedQuote = $collectionVideo->quotes->first();
		$this->assertEquals('rejected offer because...', $updatedQuote->rejection_notes);
	}

	/**
	 * testRejectQuoteOnCollectionIDoNotOwn
	 */
	public function testRejectQuoteOnCollectionIDoNotOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_" . strtolower(str_random(10)),
			'user_id' => 12,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		$video = [
			'id' => 1,
			'alpha_id' => 'abcd123',
		];
		$video = Video::create($video);

		$collection = Collection::create($data);

		$assetData = [
			'collection_id' => 1,
			'video_id' => 1,
			'type' => 'exclusive',
			'platform' => 'tv-platform',
			'length' => 'week',
			'class' => 'exceptional',
			'company_location' => 'uk',
			'company_tier' => 'enterprise',
			'notes' => 'This is a note',
			'final_price' => null,
			'status' => 'open',
			'reason' => null,
		];

		$collectionVideo = $collection->addVideoToCollection($video);

		$collectionQuote = new CollectionQuote();
		$collectionQuote->collection_video_id = $collectionVideo->id;
		$collectionQuote->user_id = $this->testAdmin->id; //offered by the admin signed in
		$collectionQuote->price = 10000;
		$collectionQuote->save();

		//execute
		auth()->login($this->testUser);
		$result = $collectionVideo->rejectAssetQuote(); //send back to requested. add a rejection note with the assets quote. collection is untouched.

		//results
		$this->assertFalse($result);
	}

}