<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLicenseEndToCollectionStories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collection_stories', function (Blueprint $table) {
            $table->dateTime('licensed_at')->nullable()->after('reason');
            $table->dateTime('license_ends_at')->nullable()->after('licensed_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('collection_stories', function (Blueprint $table) {
            $table->dropColumn('licensed_at');
            $table->dropColumn('license_ends_at');
        });
    }
}
