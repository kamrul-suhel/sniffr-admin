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
            $table->enum('state', ['sourced','approved','contacted','conversation','bumping','bump1','bump2','licensed','writing','subbing','ready','pushed'])->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('contact_id')->unsigned()->nullable();
            $table->text('title')->nullable();
            $table->text('details')->nullable();
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->string('source')->nullable();
            $table->string('rights')->nullable();
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
