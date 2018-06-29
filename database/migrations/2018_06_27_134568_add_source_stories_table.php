<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSourceStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->enum('destination', ['for-sale','for-page'])->nullable()->after('flagged');
            $table->enum('pick_label', ['subbed','speaking-to','contract-sent','licensed','interviewing','video'])->nullable()->after('flagged');
            $table->enum('priority', ['high','medium','low'])->nullable()->after('flagged');
            $table->string('source')->nullable()->after('flagged');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropColumn('source');
            $table->dropColumn('priority');
            $table->dropColumn('pick_label');
            $table->dropColumn('destination');
        });
    }
}
