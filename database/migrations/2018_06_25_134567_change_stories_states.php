<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeStoriesStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE stories MODIFY COLUMN state ENUM('unapproved', 'approved', 'rejected', 'unlicensed', 'licensing', 'licensed', 'hacks-unassigned', 'writing-inprogress', 'writing-completed', 'subs-unassigned', 'subs-inprogress', 'subs-approved', 'subs-rejected', 'edits-unassigned', 'edits-inprogress', 'edits-approved', 'edits-rejected', 'published') DEFAULT 'licensed';");

        // below schema doesn't work in current laravel version
        // Schema::table('stories', function (Blueprint $table) {
        //     $table->enum('state', ['unapproved', 'approved', 'rejected', 'unlicensed', 'licensing', 'licensed', 'hacks-unassigned', 'writing-inprogress', 'writing-completed', 'subs-unassigned', 'subs-inprogress', 'subs-approved', 'subs-rejected', 'edits-unassigned', 'edits-inprogress', 'edits-approved', 'edits-rejected', 'published'])->nullable()->default('licensed')->change();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->enum('state', ['sourced','approved','contacted','conversation','bumping','bump1','bump2','licensed','writing','subbing','ready','pushed'])->nullable()->default('licensed')->change();
        });
    }
}
