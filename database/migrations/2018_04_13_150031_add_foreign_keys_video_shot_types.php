<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysVideoShotTypes extends Migration
{
    public function up()
    {
        Schema::table('video_shot_types', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('video_shot_types');
        });
    }

    public function down()
    {
        Schema::table('video_shot_types', function (Blueprint $table) {
            $table->dropForeign('parent_id');
        });
    }
}
