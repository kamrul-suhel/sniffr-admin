<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideoStatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_stats', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('video_social_link_id')->unsigned();
            $table->foreign('video_social_link_id')->references('id')->on('video_social_links')->onUpdate('cascade');
            $table->bigInteger('likes')->default(0);
            $table->bigInteger('comments')->default(0);
            $table->bigInteger('shares')->default(0);
            $table->bigInteger('reach')->default(0);
            $table->bigInteger('reactions')->default(0);
            $table->bigInteger('link_clicks')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('video_stats');
    }
}
