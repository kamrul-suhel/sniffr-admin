<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBlacklistToContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->tinyInteger('blacklist')->after('other')->default(0);
            $table->timestamp('blacklist_created_at')->after('blacklist')->nullable();

			$table->tinyInteger('whitelist')->after('other')->default(0);
			$table->timestamp('whitelist_created_at')->after('whitelist')->nullable();

		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('blacklist');
            $table->dropColumn('blacklist_created_at');

			$table->dropColumn('whitelist');
			$table->dropColumn('whitelist_created_at');
        });
    }
}
