<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTagVideoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tag_video', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('video_id')->unsigned()->index();
			$table->integer('tag_id')->unsigned()->index();
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('tag_id')->references('id')->on('tags');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tag_video');
	}

}
