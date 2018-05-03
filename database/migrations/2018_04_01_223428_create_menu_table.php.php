<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMenuTable extends Migration
{
    public function up()
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->nullable();
            $table->integer('order')->default(1);
            $table->string('name');
            $table->string('url')->nullable();
            $table->string('type', 20);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('menu');
    }
}
