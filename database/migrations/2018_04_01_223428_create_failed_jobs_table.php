<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFailedJobsTable extends Migration
{
    public function up()
    {
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->bigInteger('id', true)->unsigned();
            $table->text('connection');
            $table->text('queue');
            $table->text('payload');
            $table->text('exception');
            $table->dateTime('failed_at')->useCurrent();
        });
    }

    public function down()
    {
        Schema::drop('failed_jobs');
    }
}
