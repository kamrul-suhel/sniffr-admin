<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSettingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('settings', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('website_name')->default('Hello Video');
			$table->string('website_description')->default('Your Premium Video CMS');
			$table->string('logo')->default('logo.png');
			$table->string('favicon')->default('favicon.png');
			$table->string('system_email')->default('email@domain.com');
			$table->boolean('demo_mode')->default(0);
			$table->boolean('enable_https')->default(0);
			$table->string('theme')->default('default');
			$table->string('facebook_page_id')->nullable();
			$table->string('google_page_id')->nullable();
			$table->string('twitter_page_id')->nullable();
			$table->string('youtube_page_id')->nullable();
			$table->string('google_tracking_id', 50)->nullable();
			$table->string('google_oauth_key')->nullable();
			$table->timestamps();
			$table->integer('videos_per_page')->default(12);
			$table->integer('posts_per_page')->default(12);
			$table->boolean('free_registration')->default(0);
			$table->boolean('activation_email')->default(0);
			$table->boolean('premium_upgrade')->default(1);
			$table->text('terms_ex')->nullable();
			$table->text('terms_ex_contact_is_owner')->nullable();
			$table->text('terms_ex_allow_publish')->nullable();
			$table->text('terms_ex_is_exclusive')->nullable();
			$table->text('terms_non_ex')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('settings');
	}

}
