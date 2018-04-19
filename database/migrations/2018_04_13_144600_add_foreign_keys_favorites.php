<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysFavorites extends Migration
{
    public function up()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->dropForeign('favorites_video_id_foreign');
            $table->dropForeign('favorites_user_id_foreign');
        });
    }
}
