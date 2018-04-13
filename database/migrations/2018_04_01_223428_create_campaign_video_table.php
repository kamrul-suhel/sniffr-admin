<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCampaignVideoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('campaign_video', function(Blueprint $table)
		{
			$table->integer('video_id')->unsigned();
			$table->integer('campaign_id')->unsigned();
			$table->string('state');
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
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
		Schema::drop('campaign_video');
	}

}
