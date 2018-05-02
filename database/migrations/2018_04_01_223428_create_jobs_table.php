<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobsTable extends Migration
{
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigInteger('id', true)->unsigned();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->tinyInteger('attempts');
            $table->integer('reserved_at')->unsigned()->nullable();
            $table->integer('available_at')->unsigned();
            $table->integer('created_at')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('jobs');
    }
}
