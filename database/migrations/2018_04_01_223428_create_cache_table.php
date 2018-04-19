<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCacheTable extends Migration
{
    public function up()
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->unique();
            $table->text('value', 16777215);
            $table->integer('expiration');
        });
    }

    public function down()
    {
        Schema::drop('cache');
    }
}
