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
            $table->dropForeign('videos_video_category_id_foreign');
            $table->dropForeign('videos_video_collection_id_foreign');
            $table->dropForeign('videos_video_shottype_id_foreign');
            $table->dropForeign('videos_user_id_foreign');
            $table->dropForeign('videos_contact_id_foreign');
        });
    }
}
