<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClientOnboardingFieldsToClients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->integer('industry_id')->unsigned()->nullable()->default(0)->after('name');
            $table->string('usable_domains')->nullable()->after('name');
            $table->string('vat_number')->nullable()->after('name');
            $table->integer('billing_user_id')->unsigned()->nullable()->default(0)->after('name');
            $table->string('billing_email')->nullable()->after('name');
            $table->string('billing_tel')->nullable()->after('name');
            $table->string('country')->nullable()->after('name');
            $table->string('postcode')->nullable()->after('name');
            $table->string('city')->nullable()->after('name');
            $table->string('address_line2')->nullable()->after('name');
            $table->string('address_line1')->nullable()->after('name');
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
            $table->dropColumn('industry_id');
            $table->dropColumn('usable_domains');
            $table->dropColumn('vat_number');
            $table->dropColumn('billing_user_id');
            $table->dropColumn('billing_email');
            $table->dropColumn('billing_tel');
            $table->dropColumn('country');
            $table->dropColumn('postcode');
            $table->dropColumn('city');
            $table->dropColumn('address_line2');
            $table->dropColumn('address_line1');
        });
    }
}
