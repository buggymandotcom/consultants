<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModelsTransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_models_trans', function (Blueprint $table) {
            $table->integer('model_id')->unsigned()->index();
            $table->foreign('model_id')->references('id')->on('sv_models')->onDelete('cascade');
            $table->integer('lang_id')->unsigned()->index();
            $table->foreign('lang_id')->references('id')->on('translator_languages')->onDelete('cascade');
            $table->string('name');
            $table->longText('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sv_models_trans');
    }
}
