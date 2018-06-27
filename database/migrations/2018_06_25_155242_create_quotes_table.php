<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_quotes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('must be admin user');
            $table->integer('video_id')->unsigned()->nullable();
            $table->integer('story_id')->unsigned()->nullable();
            $table->integer('price')->nullable();
            $table->integer('discount')->nullable();
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
        Schema::dropIfExists('quotes');
    }
}
