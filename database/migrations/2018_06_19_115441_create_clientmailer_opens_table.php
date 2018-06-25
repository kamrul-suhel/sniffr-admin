<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClientMailerOpensTable extends Migration
{
    public function up()
    {
        Schema::create('client_mailer_open', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_mailer_id')->unsigned()->nullable()->default(0);
            $table->integer('user_id')->unsigned()->nullable()->default(0);
            $table->integer('user_client_id')->unsigned()->nullable()->default(0);
            $table->string('ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('client_mailer_open');
    }
}
