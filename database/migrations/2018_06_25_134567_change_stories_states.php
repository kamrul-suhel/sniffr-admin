<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeStoriesStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->string('username')->nullable()->change();
            $table->enum('state', ['unapproved', 'approved', 'rejected', 'unlicensed', 'licensing', 'licensed', 'hacks-unassigned', 'writing-inprogress', 'writing-completed', 'subs-unassigned', 'subs-inprogress', 'subs-approved', 'subs-rejected', 'edits-unassigned', 'edits-inprogress', 'edits-approved', 'edits-rejected', 'published'])->nullable()->default('licensed');
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
            $table->enum('state', ['sourced','approved','contacted','conversation','bumping','bump1','bump2','licensed','writing','subbing','ready','pushed'])->nullable()->default('licensed');
        });
    }
}
