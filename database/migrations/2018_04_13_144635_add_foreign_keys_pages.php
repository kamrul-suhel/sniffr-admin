<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysPages extends Migration
{
    public function up()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign('pages_user_id_foreign');
        });
    }
}
