<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('alpha_id', 10)->nullable()->index('alpha_id');
            $table->integer('wp_id')->unsigned()->nullable();
            $table->enum('state', ['sourced','approved','contacted','conversation','bumping','bump1','bump2','licensed','writing','subbing','ready','pushed'])->nullable()->default('licensed');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('contact_id')->unsigned()->nullable();
            $table->text('title')->nullable();
            $table->text('author')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->string('thumb')->nullable();
            $table->string('categories')->nullable();
            $table->string('date_ingested')->nullable();
            $table->string('url')->nullable();
            $table->string('rights')->nullable();
            $table->string('status')->nullable();
            $table->boolean('active')->default(1);
            $table->softDeletes();
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
        Schema::dropIfExists('stories');
    }
}
