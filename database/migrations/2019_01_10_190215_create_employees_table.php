<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('lang_id')->unsigned()->index()->nullable();
            $table->foreign('lang_id')->references('id')->on('translator_languages');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->string('identification')->nullable();
            $table->enum('identification_type',['NIE','DNI','CIF'])->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('employees');
    }
}
