<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('client_id')->unsigned()->nullable();
			$table->string('username')->unique('unique');
			$table->string('email')->index('uniuqe_email');
			$table->string('avatar')->default('default.jpg');
			$table->string('password');
			$table->string('role')->default('subscriber');
			$table->boolean('active')->default(1);
			$table->timestamps();
			$table->string('activation_code')->nullable();
			$table->string('remember_token')->default('');
			$table->boolean('stripe_active')->default(0);
			$table->string('stripe_id')->nullable();
			$table->string('stripe_subscription')->nullable();
			$table->string('stripe_plan', 25)->nullable();
			$table->string('last_four', 4)->nullable();
			$table->dateTime('trial_ends_at')->nullable();
			$table->dateTime('subscription_ends_at')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
