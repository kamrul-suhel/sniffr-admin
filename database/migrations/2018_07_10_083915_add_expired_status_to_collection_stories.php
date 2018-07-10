<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExpiredStatusToCollectionStories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collection_stories', function (Blueprint $table) {
            DB::statement("ALTER TABLE collection_stories MODIFY COLUMN status ENUM('requested', 'received', 'offered', 'accepted', 'purchased', 'expired', 'closed')");
            $table->string('reason')->nullable()->after('status');
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
            DB::statement("ALTER TABLE collection_stories MODIFY COLUMN status ENUM('requested', 'received', 'offered', 'accepted', 'purchased', 'closed')");
            $table->dropColumn('reason');
        });
    }
}
