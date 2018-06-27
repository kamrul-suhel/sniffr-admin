<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn('industry_id');
            $table->enum('location', ['western-europe','north-america','eastern-europe','africa','middle-east-east','asia','south-america','latin-america','south-africa', 'middle-east-west', 'oceania', 'russia', 'japan', 'china', 'singapore'])->nullable()->after('slug');
            $table->enum('tier', ['social-media-agency','online','random','production','publisher','well-known'])->nullable()->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->integer('industry_id')->unsigned()->nullable()->default(0)->after('name');
            $table->dropColumn('tier');
            $table->dropColumn('location');
        });
    }
}
