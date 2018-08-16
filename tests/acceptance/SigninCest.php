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
    	$I->amOnPage('/login');
    	$I->canSeeElement('.forgot-password');
    	$I->canSeeElement("#btn-forgot-password");
    	$I->canSeeElement('.v-btn__content');
		$I->waitForElement(['css' => '#btn-forgot-password'], 3);

		//$selector = "/html/body/section[@id='sniffr']/div[@id='app']/div[@class='application--wrap']/main[@class='v-content']/div[@class='v-content__wrap']/div[@class='container grid-list-lg fill-height']/div[@class='layout justify-center align-center']/div[@class='flex shrink']/div[@class='login']/div[@class='v-card v-card--raised']/div[@class='v-card__text login-section pa-0']/form[@class='v-form']/div[@class='container grid-list-lg']/div[@class='layout text-xs-center row wrap fluid']/div[@class='flex xs12'][2]/a[@id='btn-forgot-password']";

		$selector = "/html/body/section[@id='sniffr']/div[@id='app']/div[@class='application--wrap']/section[@id='nav']/div[@class='container grid-list-lg']/div[@class='layout row wrap']/div[@class='flex xs12 sm4 md4 lg4']/div[@class='logo']/a[@class='router-link-active']";
		$I->click($selector);
		$I->wait(3);
		$I->canSee('FORGOT PASSWORD');
		$I->wait(3);
		$I->fillField('email', 'kerrrai1990@googlemail.com');
		$I->wait(2);
    }
}
