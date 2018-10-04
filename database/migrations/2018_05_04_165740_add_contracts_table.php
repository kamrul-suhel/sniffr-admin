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
            $table->string('video_id');
            $table->string('reference_id');
            $table->integer('revenue_share')->nullable();
            $table->integer('upfront_payment')->nullable();
            $table->integer('upfront_payment_currency_id')->unsigned();
            $table->integer('success_system')->nullable();
            $table->integer('contract_model_id');
            $table->string('ip')->nullable();
            $table->string('token')->nullable();
            $table->integer('user_id')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('signed_at')->nullable();
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
