<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVideosTable extends Migration
{
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $video_states = config('videos.states');
            $table->increments('id');
            $table->string('alpha_id', 10)->nullable()->index('alpha_id');
            $table->enum('state', $video_states)->nullable();
            $table->boolean('maybe')->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('contact_id')->unsigned()->nullable();
            $table->integer('video_category_id')->unsigned()->nullable();
            $table->integer('video_collection_id')->unsigned()->nullable();
            $table->integer('video_shottype_id')->unsigned()->nullable();
            $table->text('title')->nullable();
            $table->string('rights')->nullable();
            $table->string('access', 20)->default('guest');
            $table->text('details')->nullable();
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('nsfw')->nullable();
            $table->string('referrer')->nullable();
            $table->text('credit')->nullable();
            $table->boolean('active')->default(1);
            $table->boolean('featured')->default(0);
            $table->integer('views')->unsigned()->default(0);
            $table->string('image')->nullable()->default('placeholder.gif');
            $table->string('thumb')->nullable();
            $table->string('mime')->nullable();
            $table->string('ext')->nullable();
            $table->text('url')->nullable();
            $table->string('file')->nullable();
            $table->string('file_watermark')->nullable();
            $table->string('file_watermark_dirty')->nullable();
            $table->string('link')->nullable();
            $table->boolean('vertical')->nullable();
            $table->string('youtube_id')->nullable();
            $table->text('embed_code')->nullable();
            $table->integer('duration')->nullable();
            $table->date('date_filmed')->nullable();
            $table->string('location')->nullable();
            $table->string('source')->nullable();
            $table->boolean('more_details')->nullable();
            $table->dateTime('more_details_sent')->nullable();
            $table->string('more_details_code')->nullable();
            $table->integer('reminders')->unsigned()->nullable();
            $table->boolean('contact_is_owner')->nullable();
            $table->boolean('submitted_elsewhere')->nullable();
            $table->text('submitted_where')->nullable();
            $table->integer('allow_publish')->nullable();
            $table->boolean('filmed_by_me')->nullable();
            $table->boolean('permission')->nullable();
            $table->boolean('is_exclusive')->nullable();
            $table->boolean('terms')->nullable();
            $table->string('ip')->nullable();
            $table->text('user_agent')->nullable();
            $table->dateTime('licensed_at')->nullable();
            $table->integer('dimension_width')->unsigned()->nullable();
            $table->integer('dimension_height')->unsigned()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('videos');
    }
}
