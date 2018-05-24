<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClientMailerStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_mailer_story', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_mailer_id')->unsigned()->index();
            $table->integer('story_id')->unsigned()->index();
        });
    }

    public function down()
    {
        Schema::drop('client_mailer_story');
    }
}
