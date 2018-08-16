<?php


class SigninCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    // tests
    public function tryToTestLoginWithRealData(AcceptanceTester $I)
    {
    	$I->wantTo('Test Login');
    	$I->am('guest');
    	$I->amOnPage('/');
    	$I->amGoingTo('/login');
    	$I->click('Login');
    	$I->amOnPage('/login');
    	$I->canSee('Login');

    	$I->fillField('name', 'ian@unilad.co.uk');
    	$I->fillField('password', env('CLIENT_PASSWORD'));
    	$I->click('Login');
    	$I->see('Videos');
    }
}
