<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStoriesVideoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('story_video', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('story_id')->unsigned()->index();
            $table->integer('video_id')->unsigned()->index();
        });
    }

    public function down()
    {
        Schema::drop('story_video');
    }
}
