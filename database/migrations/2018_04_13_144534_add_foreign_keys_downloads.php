<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysDownloads extends Migration
{
    public function up()
    {
        Schema::table('downloads', function (Blueprint $table) {
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('downloads', function (Blueprint $table) {
            $table->dropForeign('downloads_video_id_foreign');
            $table->dropForeign('downloads_client_id_foreign');
            $table->dropForeign('downloads_user_id_foreign');
        });
    }
}
