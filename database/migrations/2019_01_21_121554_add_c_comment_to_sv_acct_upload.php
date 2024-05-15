<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCCommentToSvAcctUpload extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_acct_upload', function (Blueprint $table) {
            $table->dateTime('c_comment_at')->nullable()->after('client_id');
            $table->text('c_comment')->nullable()->after('client_id');

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
            $table->dropColumn(['c_comment','c_comment_at']);
        });
    }
}
