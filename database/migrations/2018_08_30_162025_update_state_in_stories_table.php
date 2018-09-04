<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateStateInStoriesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::statement("ALTER TABLE stories MODIFY COLUMN state ENUM('unapproved', 'awaiting-contact', 'approved', 'rejected', 'unlicensed', 'licensing', 'licensed', 'hacks-unassigned', 'writing-inprogress', 'writing-completed', 'subs-unassigned', 'subs-inprogress', 'subs-approved', 'subs-rejected', 'edits-unassigned', 'edits-inprogress', 'edits-approved', 'edits-rejected', 'ready-to-publish', 'published', 'archive', 'purgatory') DEFAULT 'licensed';");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::statement("ALTER TABLE stories MODIFY COLUMN state ENUM('unapproved', 'awaiting-contact', 'approved', 'rejected', 'unlicensed', 'licensing', 'licensed', 'hacks-unassigned', 'writing-inprogress', 'writing-completed', 'subs-unassigned', 'subs-inprogress', 'subs-approved', 'subs-rejected', 'edits-unassigned', 'edits-inprogress', 'edits-approved', 'edits-rejected', 'ready-to-publish', 'published', 'archive') DEFAULT 'licensed';");

	}
}

