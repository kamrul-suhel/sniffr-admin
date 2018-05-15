<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('story_id')->unsigned()->nullable();
            $table->integer('type')->default(1);
            $table->integer('video_id')->unsigned()->nullable();
            $table->integer('asset_other_id')->unsigned()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('assets');
    }
}
