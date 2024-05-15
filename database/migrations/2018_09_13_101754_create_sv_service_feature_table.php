<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSvServiceFeatureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_features', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->enum('type',['string','number','boolean'])->default('string');
            $table->string('icon')->nullable();
            $table->string('icon_type')->nullable();
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
        Schema::dropIfExists('sv_features');
    }
}
