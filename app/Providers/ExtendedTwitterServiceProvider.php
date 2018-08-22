<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ExtendedTwitterServiceProvider extends ServiceProvider
{
	public function boot(){

	}

	public function register(){

	}

    public function getService()
    {
            return $this->service;
    }
}
