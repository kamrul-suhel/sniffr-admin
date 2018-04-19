<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysLegalTerms extends Migration
{
    public function up()
    {
        Schema::table('legal_terms', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('legal_terms', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });
    }
}
