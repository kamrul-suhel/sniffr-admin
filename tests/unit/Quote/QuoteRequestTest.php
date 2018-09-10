<?php
namespace Quote;

class QuoteRequestTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;
    
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

	/**
	 * testAcceptWholeCollectionWithPurchasableAssets
	 */
	public function testAcceptWholeCollectionWithPurchasableAssets()
	{

	}

	/**
	 * testAcceptWholeCollectionWithNNonPurchasableAssets
	 */
	public function testAcceptWholeCollectionWithNNonPurchasableAssets()
	{

	}

	/**
	 * testAcceptWholeCollectionWithMixedAssets
	 */
	public function testAcceptWholeCollectionWithMixedAssets()
	{

	}

	/**
	 * testAcceptCollectionThatDoesNotBelongToMe
	 */
	public function testAcceptCollectionThatDoesNotBelongToMe()
	{

	}

	/**
	 * testDeclineWholeCollectionWithPurchasableAssets
	 */
	public function testDeclineWholeCollectionWithPurchasableAssets()
	{

	}

	/**
	 * testDeclineWholeCollectionWithNNonPurchasableAssets
	 */
	public function testDeclineWholeCollectionWithNNonPurchasableAssets()
	{

	}

	/**
	 * testDeclineWholeCollectionWithMixedAssets
	 */
	public function testDeclineWholeCollectionWithMixedAssets()
	{

	}

	/**
	 * testDeclineCollectionThatDoesNotBelongToMe
	 */
	public function testDeclineCollectionThatDoesNotBelongToMe()
	{

	}
}