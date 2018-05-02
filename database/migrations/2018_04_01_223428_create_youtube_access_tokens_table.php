<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateYoutubeAccessTokensTable extends Migration
{
    public function up()
    {
        Schema::create('youtube_access_tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->text('access_token');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down()
    {
        Schema::drop('youtube_access_tokens');
    }
}
