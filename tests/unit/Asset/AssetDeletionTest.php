<?php

namespace Asset;

use App\Collection;
use App\CollectionVideo;
use App\Story;
use App\User;
use App\Video;
use PHPUnit\Framework\MockObject\BadMethodCallException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AssetDeletionTest extends \Codeception\Test\Unit
{
	/**
	 * @var \UnitTester
	 */
	protected $tester, $user, $helper, $video, $story, $testVideoLicensed, $testVideoUnlicensed, $testStory, $testCollectionVideo, $testCollectionStory;

	protected function _before()
	{
		$this->user = new User();
		$this->video = new Video();
		$this->story = new Story();

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

		$this->testVideoLicensed = $this->make('App\Video', [
			'id' => 1,
			'access' => 'guest',
			'active' => 1,
			'featured' => 0,
			'views' => 100,
		]);

		$this->testVideoUnlicensed = $this->make('App\Video', [
			'id' => 1,
			'access' => 'guest',
			'active' => 1,
			'featured' => 0,
			'views' => 100,
		]);

		$this->testCollectionVideo = [
			'id' => 1,
			'collection_id' => 1,
			'video_id' => 1,
			'status' => 'purchased',
			'licensed_at' => now(),
			'license_ends_at' => now()->addMonth(),
			'final_price' => 100,
		];

		$this->testStory = $this->make('App\Story', [
			'id' => 1,
			'active' => 1,
		]);

		$this->testCollectionStory = [
			'id' => 1,
			'collection_id' => 1,
			'story_id' => 1,
			'status' => 'purchased',
			'licensed_at' => now(),
			'license_ends_at' => now()->addMonth(),
			'final_price' => 100,
		];
	}

	protected function _after()
	{

	}

	/**
	 *
	 */
	public function testDeleteAssetThatIsNotLicensed()
	{
		//prepare
		$video = $this->video->find(1);

		//execute
		$video->deleteVideo();

		//result
		$this->assertNotNull($video->deleted_at);
	}

	/**
	 *
	 */
	public function testDeleteAssetThatIsLicensedToOneClient()
	{
		$video = $this->video->find(1);
		$collectionVideo = new CollectionVideo();
		$collectionVideo->collection_id = 1;
		$collectionVideo->video_id = 1;
		$collectionVideo->status = 'purchased';
		$collectionVideo->licensed_at = now();
		$collectionVideo->license_ends_at = now()->addMonth();
		$collectionVideo->final_price = 100;
		$collectionVideo->save();
		$video->deleteVideo();

		$this->assertNotNull($video->deleted_at);

	}

	/**
	 *
	 */
	public function testDeleteAssetThatIsLicensedToMultipleClients()
	{
		$user = new User();
		$user->id = 9999;
		$user->client_id = 1;
		$user->role = 'client_owner';
		$user->email = 'ian@unilad.co.uk';
		$user->password = \Hash::make(env('CLIENT_PASSWORD'));
		$user->save();

		auth()->login($user);

		$collection = new Collection();
		$collection->id = 1;
		$collection->user_id = 9999;
		$collection->client_id = 1;
		$collection->status = 'open';
		$collection->save();

		$collection = new Collection();
		$collection->id = 2;
		$collection->user_id = 9999;
		$collection->client_id = 1;
		$collection->status = 'open';
		$collection->save();

		$collection = new Collection();
		$collection->id = 3;
		$collection->user_id = 9999;
		$collection->client_id = 1;
		$collection->status = 'open';
		$collection->save();

		$collectionVideo = new CollectionVideo();
		$collectionVideo->collection_id = 1;
		$collectionVideo->video_id = 1;
		$collectionVideo->status = 'requested';
		$collectionVideo->licensed_at = now();
		$collectionVideo->license_ends_at = now()->addMonth();
		$collectionVideo->final_price = 100;
		$collectionVideo->save();

		$collectionVideo2 = new CollectionVideo();
		$collectionVideo2->collection_id = 2;
		$collectionVideo2->video_id = 1;
		$collectionVideo2->status = 'offered';
		$collectionVideo2->licensed_at = now();
		$collectionVideo2->license_ends_at = now()->addMonth();
		$collectionVideo2->final_price = 100;
		$collectionVideo2->save();

		$collectionVideo3 = new CollectionVideo();
		$collectionVideo3->collection_id = 3;
		$collectionVideo3->video_id = 1;
		$collectionVideo3->status = 'requested';
		$collectionVideo3->licensed_at = now();
		$collectionVideo3->license_ends_at = now()->addMonth();
		$collectionVideo3->final_price = 100;
		$collectionVideo3->save();

		$video = $this->video->find(1)->deleteVideo();
		$video2 = $this->video->find(2)->deleteVideo();
		$video3 = $this->video->find(3)->deleteVideo();

		$this->assertNotNull($this->video->withTrashed()->find(1)->deleted_at);
		$this->assertNotNull($this->video->withTrashed()->find(2)->deleted_at);
		$this->assertNotNull($this->video->withTrashed()->find(3)->deleted_at);

	}

	/**
	 *
	 */
	public function testDeletedAssetIsStillDownloadableByBuyingClients()
	{
		$user = new User();
		$user->id = 9999;
		$user->client_id = 1;
		$user->role = 'client_owner';
		$user->email = 'ian@unilad.co.uk';
		$user->password = \Hash::make(env('CLIENT_PASSWORD'));
		$user->save();

		auth()->login($user);

		$collection = new Collection();
		$collection->id = 1;
		$collection->user_id = 9999;
		$collection->client_id = 1;
		$collection->status = 'open';
		$collection->save();

		$collectionVideo = new CollectionVideo();
		$collectionVideo->collection_id = 1;
		$collectionVideo->video_id = 13;
		$collectionVideo->status = 'purchased';
		$collectionVideo->licensed_at = now();
		$collectionVideo->license_ends_at = now()->addMonth();
		$collectionVideo->final_price = 100;
		$collectionVideo->save();

		$video = $this->video->find(13);
		$video->deleteVideo();

		$this->assertNotNull($this->video->withTrashed()->find(13)->deleted_at);

		//$file = \App('App\Http\Controllers\Frontend\Client\ClientVideosController')->downloadVideo(13);

	}

	/**
	 *
	 */
	public function testDeletedAssetCannotBeBoughtByClientWhoDoesNotOwnIt()
	{
		$user = new User();
		$user->id = 9999;
		$user->client_id = 1;
		$user->role = 'client_owner';
		$user->email = 'ian@unilad.co.uk';
		$user->password = \Hash::make(env('CLIENT_PASSWORD'));
		$user->save();

		auth()->login($user);

		$error = false;
		try {
			$file = \App('App\Http\Controllers\Frontend\Client\ClientVideosController')->downloadVideo(15);
		} catch (NotFoundHttpException $e) {
			$error = $e->getMessage();
		}
		$this->assertEquals($error, 'You do not have permission to download this asset');
	}

	/**
	 *
	 */
	public function testDeletedAssetIsNoLongerAvailableAfterLicenseHasFinished()
	{
		$user = new User();
		$user->id = 9999;
		$user->client_id = 1;
		$user->role = 'client_owner';
		$user->email = 'ian@unilad.co.uk';
		$user->password = \Hash::make(env('CLIENT_PASSWORD'));
		$user->save();

		auth()->login($user);

		$collection = new Collection();
		$collection->id = 1;
		$collection->user_id = 9999;
		$collection->client_id = 1;
		$collection->status = 'open';
		$collection->save();

		$video = $this->video->find(1);
		$video->deleteVideo();

		$collectionVideo = new CollectionVideo();
		$collectionVideo->collection_id = 1;
		$collectionVideo->video_id = 1;
		$collectionVideo->status = 'expired';
		$collectionVideo->licensed_at = now();
		$collectionVideo->license_ends_at = now()->addMonth();
		$collectionVideo->final_price = 100;
		$collectionVideo->save();

		$error = false;
		try {
			$file = \App('App\Http\Controllers\Frontend\Client\ClientVideosController')->downloadVideo(15);
		} catch (NotFoundHttpException $e) {
			$error = $e->getMessage();
		}

		$this->assertEquals($error, 'You do not have permission to download this asset');
	}

	/**
	 *
	 */
	public function testOnlyAdminCanDeleteVideos()
	{
		$user = new User();
		$user->id = 99999;
		$user->client_id = null;
		$user->role = 'admin';
		$user->email = 'ian@unilad.co.uk';
		$user->password = \Hash::make(env('CLIENT_PASSWORD'));
		$user->save();

		auth()->login($user);

		$video = $this->video->find(1);

		$error = false;
		try {
			$file = \App('App\Http\Controllers\Frontend\Client\ClientVideosController')->destroy(1);
		} catch (\Exception $e) {
			$error = $e->getMessage();
		}

		$this->assertEquals($error, 'Method App\Http\Controllers\Frontend\Client\ClientVideosController::destroy does not exist.');
	}

}