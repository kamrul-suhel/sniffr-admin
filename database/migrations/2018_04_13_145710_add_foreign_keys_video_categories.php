<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysVideoCategories extends Migration
{
    public function up()
    {
        Schema::table('video_categories', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('video_categories');
        });
    }

    public function down()
    {
        Schema::table('video_categories', function (Blueprint $table) {
            $table->dropForeign('parent_id');
        });
    }
}
