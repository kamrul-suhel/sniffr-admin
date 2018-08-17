<?php
namespace Quote;

use App\Collection;
use App\Video;

class CollectionAssetTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester, $testUser;
    
    protected function _before(){

		$this->testUser = $this->make('App\User', [
			'id' => 1,
			'client_id' => 1,
			'role' => 'client_owner',
			'email' => 'ian@unilad.co.uk',
			'password' => \Hash::make(env('CLIENT_PASSWORD'))
		]);
	}

    protected function _after(){}

    // tests
    public function testAddAssetToExistingCollection()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_".strtolower(str_random(10)),
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

		//execute
		$collectionVideo = $collection->addVideoToCollection($video);

		//results
		$this->assertEquals($collectionVideo->collection_id, $collection->id);

	}

	public function testAcceptQuoteOnCollectionIOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_".strtolower(str_random(10)),
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
		$collectionVideo->acceptAssetQuote();

		//results
		$this->assertEquals('purchased', $collectionVideo->status);
		$this->assertEquals('closed', $collectionVideo->collection->status);

	}

	public function testAcceptQuoteOnCollectionIDonNotOwn()
	{
		//prepare
		$data = [
			'id' => 1,
			'name' => "order_".strtolower(str_random(10)),
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
		$collectionVideo->acceptAssetQuote();

		//results
		$this->assertEquals('offered', $collectionVideo->status);
		$this->assertEquals('closed', $collectionVideo->collection->status);

	}

	public function testRejectQuoteOnCollectionIOwn()
	{

	}

	public function testRejectQuoteOnCollectionIDoNotOwn()
	{

	}

}