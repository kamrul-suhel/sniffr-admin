<?php
namespace Auth;

use App\User;

class LoginTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester, $user, $helper;

    protected function _before()
    {
    	$this->user = new User();
    }

    protected function _after()
    {

    }

    // tests

    public function testCanExistingUserLogin()
    {
		$user = $this->make('App\User', ['email' => 'ian@unilad.co.uk', 'password' => \Hash::make(env('CLIENT_PASSWORD'))]);

		$login = auth()->attempt(['email' => $user->email, 'password' => env('CLIENT_PASSWORD')]);
    	$this->assertEquals(true, $login);
    }

    public function testNonUserCannotLogin()
	{
		$user = $this->make('App\User', ['email' => 'titsMgee@unilad.co.uk', 'password' => \Hash::make(env('CLIENT_PASSWORD'))]);

		$login = auth()->attempt(['email' => $user->email, 'password' => env('CLIENT_PASSWORD')]);
		$this->assertEquals(false, $login);
	}

	public function testUserCannotLoginWithWrongPassword()
	{
		$user = $this->make('App\User', ['email' => 'ian@unilad.co.uk', 'password' => \Hash::make('THE_PATH_OF_THE_RIGHTIOUS_MAN')]);

		$login = auth()->attempt(['email' => $user->email, 'password' => 'THE_PATH_OF_THE_RIGHTIOUS_MAN']);
		$this->assertEquals(false, $login);
	}
}