<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStateSvModelsDrafts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_models_drafts', function (Blueprint $table) {
            $table->enum('state', ['active','incomplete','complete','invalid','valid','not_presented','presented'])->default('active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sv_models_drafts', function (Blueprint $table) {
            $table->dropColumn('state');
        });
    }
}
