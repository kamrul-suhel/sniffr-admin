<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('video_id');
            $table->integer('revenue_share')->nullable();
            $table->integer('upfront_payment')->nullable();
            $table->integer('success_system')->nullable();
            $table->text('credit')->nullable();
            $table->string('ip')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('signature')->nullable();
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
        Schema::dropIfExists('contracts');
    }
}
