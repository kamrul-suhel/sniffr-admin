<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRegionTierToClients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('clients', function (Blueprint $table) {
			$table->string('region')->nullable()->after('country')->default();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('clients', function (Blueprint $table) {
			$table->dropColumn('region');
			$table->dropColumn('tier');
		});
    }
}
