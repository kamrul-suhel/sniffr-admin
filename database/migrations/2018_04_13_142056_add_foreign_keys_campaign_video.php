<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysCampaignVideo extends Migration
{
    public function up()
    {
        Schema::table('campaign_video', function (Blueprint $table) {
            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });
    }

    public function down()
    {
        Schema::table('campaign_video', function (Blueprint $table) {
            $table->dropForeign('campaign_video_video_id_foreign');
            $table->dropForeign('campaign_video_campaign_id_foreign');
        });
    }
}
