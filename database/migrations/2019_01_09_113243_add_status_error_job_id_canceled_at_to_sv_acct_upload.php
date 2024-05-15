<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusErrorJobIdCanceledAtToSvAcctUpload extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_acct_upload', function (Blueprint $table) {
            $table->text('error')->nullable()->after('sent_at');
            $table->integer('job_id')->nullable()->after('sent_at');
            $table->integer('status')->unsigned()->nullable()->after('sent_at');
            $table->enum('invoice_type',['purchase','sale','norma43'])->after('sent_at');
            $table->dateTime('cancelled_at')->nullable()->after('sent_at');
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
             $table->dropColumn(['error','status','job_id','cancelled_at','invoice_type']);
        });
    }
}
