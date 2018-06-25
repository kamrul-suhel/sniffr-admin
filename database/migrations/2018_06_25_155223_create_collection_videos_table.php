<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_videos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('collection_id')->unsigned();
            $table->integer('video_id')->unsigned();

            $table->string('type')->nullable();
            $table->string('platform')->nullable();
            $table->string('length')->nullable();

            $table->integer('final_price')->nullable();
            $table->enum('status', ['requested', 'received', 'accepted', 'purchased', 'closed']);
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
        Schema::dropIfExists('collection_videos');
    }
}
