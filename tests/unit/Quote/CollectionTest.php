<?php

namespace Quote;

use App\Collection;
use App\CollectionQuote;
use App\CollectionStory;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CollectionTest extends \Codeception\Test\Unit
{

	use RefreshDatabase;
	/**
	 * @var \UnitTester
	 */
	protected $tester, $testUser, $testCollection, $collection, $collectionStory, $collectionVideo, $collectionQuote;

	protected function _before()
	{
		$this->collection = new Collection();
		$this->collectionQuote = new CollectionQuote();
		$this->collectionStory = new CollectionStory();

		$this->testUser = $this->make('App\User', [
			'id' => 1,
			'client_id' => 1,
			'role' => 'client_owner',
			'email' => 'ian@unilad.co.uk',
			'password' => \Hash::make(env('CLIENT_PASSWORD'))
		]);
	}

	protected function _after()
	{
	}

	public function testCreateCollection()
	{
		//prepare
		$data = [
			'name' => "order_".strtolower(str_random(10)),
			'user_id' => $this->testUser->id,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		//execute
		$collection = $this->collection->create($data);

		//compare
		$this->assertInstanceOf('App\Collection', $collection);
		$this->assertEquals($collection->user_id, $this->testUser->id);
		$this->assertEquals($collection->client_id, $this->testUser->client_id);
	}

	public function testCreateCollectionWithMissingData()
	{
		//prepare
		$data = [
			'name' => "order_".strtolower(str_random(10)),
			'user_id' => null,
			'client_id' => null,
			'status' => null,
		];

		//execute
		try {
			$collection = $this->collection->create($data);
		} catch (QueryException $e) {
			$error = $e;
		}

		//compare
		$this->assertEquals('23000', $error->getCode());
	}

	public function testUpdateValueInCollection()
	{
		//prepare
		$data = [
			'name' => "order_".strtolower(str_random(10)),
			'user_id' => $this->testUser->id,
			'client_id' => $this->testUser->client_id,
			'status' => 'open',
		];

		//execute
		$collection = $this->collection->createCollection($data);

		$collection->updateCollection(['user_id' => 1]);

		//result
		$this->assertEquals($collection->user_id, 1);

	}
}