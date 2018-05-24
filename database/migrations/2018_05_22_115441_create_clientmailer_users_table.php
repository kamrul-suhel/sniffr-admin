<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClientMailerUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_mailer_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_mailer_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->timestamp('sent_at')->nullable();
        });
    }

    public function down()
    {
        Schema::drop('client_mailer_user');
    }
}
