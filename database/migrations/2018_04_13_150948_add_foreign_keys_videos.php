<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysVideos extends Migration
{
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->foreign('video_category_id')->references('id')->on('video_categories');
            $table->foreign('video_collection_id')->references('id')->on('video_collections');
            $table->foreign('video_shottype_id')->references('id')->on('video_shot_types');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('contact_id')->references('id')->on('contacts');
        });
    }

    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropForeign('video_category_id');
            $table->dropForeign('video_collection_id');
            $table->dropForeign('video_shottype_id');
            $table->dropForeign('user_id');
            $table->dropForeign('contact_id');
        });
    }
}
