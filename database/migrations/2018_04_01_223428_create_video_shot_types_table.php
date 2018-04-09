<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVideoShotTypesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('video_shot_types', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('parent_id')->nullable();
			$table->integer('order')->default(1);
			$table->string('name');
			$table->string('slug')->nullable();
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
		Schema::drop('video_shot_types');
	}

}
