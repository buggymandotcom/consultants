<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DelBillingPeriodId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_acct_upload', function (Blueprint $table) {
            $table->dropColumn('billing_period_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sv_acct_upload', function (Blueprint $table) {
            $table->integer('billing_period_id')->index()->unSigned();
        });
    }
}
