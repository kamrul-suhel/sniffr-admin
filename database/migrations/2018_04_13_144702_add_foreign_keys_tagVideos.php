<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysTagVideos extends Migration
{
    public function up()
    {
        Schema::table('tag_video', function (Blueprint $table) {
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('tag_id')->references('id')->on('tags');
        });
    }

    public function down()
    {
        Schema::table('tag_video', function (Blueprint $table) {
            $table->dropForeign('video_id');
            $table->dropForeign('tag_id');
        });
    }
}
