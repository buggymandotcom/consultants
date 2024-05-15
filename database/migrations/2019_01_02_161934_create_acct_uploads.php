<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAcctUploads extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_acct_upload', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('upload_id')->unsigned()->index();
            $table->foreign('upload_id')->references('id')->on('upload')->onDelete('cascade');
            $table->integer('client_id')->unsigned()->index();
            $table->integer('billing_period_id')->index()->unSigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sv_acct_upload');
    }
}
