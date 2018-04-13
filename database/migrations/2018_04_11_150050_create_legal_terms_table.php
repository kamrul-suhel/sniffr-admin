<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLegalTermsTable extends Migration
{
    /**
     * Run the migrations.
     * TODO: Is the user_id column used to log who created the legal_term?
     * TODO: Maybe a log system can give us better results
     * TODO: this should be an immutable object
     * @return void
     */
    public function up()
    {
        Schema::create('legal_terms', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('body');
            $table->boolean('active')->default(1);
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legal_terms');
    }
}
