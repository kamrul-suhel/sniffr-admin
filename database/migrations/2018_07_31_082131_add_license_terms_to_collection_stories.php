<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLicenseTermsToCollectionStories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collection_stories', function (Blueprint $table) {
            $table->string('platform')->nullable()->after('type');
            $table->string('length')->nullable()->after('type');
            $table->string('class')->nullable()->after('type')->comment('class at the time of request or purchase');
            $table->string('company_location')->nullable()->after('type')->comment('location of company where they will use the story');
            $table->string('company_tier')->nullable()->after('type')->comment('status and type of company');
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
            //
        });
    }
}
