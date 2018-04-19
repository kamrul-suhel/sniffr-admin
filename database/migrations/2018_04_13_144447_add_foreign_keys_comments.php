<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysComments extends Migration
{
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('comments_video_id_foreign');
            $table->dropForeign('comments_contact_id_foreign');
            $table->dropForeign('comments_user_id_foreign');
        });
    }
}
