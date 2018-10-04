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
            $table->string('class')->nullable()->comment('class at the time of request or purchase');
            $table->string('company_location')->nullable()->comment('location of company where they will use the video');
            $table->string('company_tier')->nullable()->comment('status and type of company');
			$table->text('notes')->nullable();
            $table->integer('final_price')->nullable();
            $table->enum('status', ['requested', 'received', 'offered', 'accepted', 'purchased', 'closed']);
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
