<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCampaignVideoTable extends Migration
{
    public function up()
    {
        Schema::create('campaign_video', function (Blueprint $table) {
            $table->integer('video_id')->unsigned()->nullable();
            $table->integer('campaign_id')->unsigned()->nullable();
            $table->string('state')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent();
        });
    }

    public function down()
    {
        Schema::drop('campaign_video');
    }
}
