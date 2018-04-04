<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentSettingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_settings', function(Blueprint $table)
		{
			$table->increments('id');
			$table->boolean('live_mode')->default(0);
			$table->string('test_secret_key', 100)->nullable();
			$table->string('test_publishable_key', 100)->nullable();
			$table->string('live_secret_key', 100)->nullable();
			$table->string('live_publishable_key', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('payment_settings');
	}

}
