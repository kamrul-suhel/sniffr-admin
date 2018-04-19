<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCampaignVideoTable extends Migration
{
    public function up()
    {
        Schema::create('campaign_video', function (Blueprint $table) {
            $table->integer('video_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->string('state');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('campaign_video');
    }
}
