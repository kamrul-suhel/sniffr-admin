<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dateTime('sourced_at')->nullable()->after('destination');
            $table->string('source_type')->nullable()->after('source');
            $table->integer('story_collection_id')->unsigned()->nullable()->after('destination');
            $table->integer('story_category_id')->unsigned()->nullable()->after('destination');
            $table->string('rights_type')->nullable()->after('rights');
            $table->text('notes')->nullable()->after('destination');
            $table->string('type')->nullable()->after('destination');
            $table->boolean('contact_is_owner')->nullable()->after('destination');
            $table->boolean('allow_publish')->nullable()->after('destination');
            $table->boolean('permission')->nullable()->after('destination');
            $table->string('location')->nullable()->after('destination');
            $table->string('removed_from_social')->nullable()->after('destination');
            $table->string('problem_status')->nullable()->after('destination');
            $table->string('submitted_to')->nullable()->after('destination');
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
            $table->dropColumn('sourced_at');
            $table->dropColumn('source_type');
            $table->dropColumn('story_collection_id');
            $table->dropColumn('story_category_id');
            $table->dropColumn('rights_type');
            $table->dropColumn('notes');
            $table->dropColumn('type');
            $table->dropColumn('contact_is_owner');
            $table->dropColumn('allow_publish');
            $table->dropColumn('permission');
            $table->dropColumn('location');
            $table->dropColumn('removed_from_social');
            $table->dropColumn('problem_status');
            $table->dropColumn('submitted_to');
        });
    }
}
