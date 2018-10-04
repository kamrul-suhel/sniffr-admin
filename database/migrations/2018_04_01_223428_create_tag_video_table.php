<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTagVideoTable extends Migration
{
    public function up()
    {
        Schema::create('tag_video', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('video_id')->unsigned()->index();
            $table->integer('tag_id')->unsigned()->index();
        });
    }

    public function down()
    {
        Schema::drop('tag_video');
    }
}
