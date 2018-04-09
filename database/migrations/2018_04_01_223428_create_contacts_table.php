<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateContactsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contacts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('full_name')->nullable();
			$table->string('email')->nullable();
			$table->string('tel')->nullable();
			$table->string('language')->nullable();
			$table->string('location')->nullable();
			$table->string('paypal')->nullable();
			$table->string('facebook')->nullable();
			$table->string('youtube')->nullable();
			$table->string('instagram')->nullable();
			$table->string('twitter')->nullable();
			$table->string('other')->nullable();
			$table->softDeletes()->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('contacts');
	}

}
