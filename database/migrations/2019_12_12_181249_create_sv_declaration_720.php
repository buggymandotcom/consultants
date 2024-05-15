<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSvDeclaration720 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_declaration_720', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('declarant_id')->unsigned()->index();
            $table->integer('draft_id')->unsigned()->index();
            $table->string('person_contact_name');
            $table->string('person_contact_phone');
            $table->integer('declaration_number')->unsigned()->nullable();
            $table->char('complementary_declaration',1)->nullable();
            $table->char('substitute_declaration',1)->nullable();
            $table->integer('declaration_parent_number')->unsigned()->nullable();
            $table->integer('valoration1_id')->unsigned()->index()->nullable();
            $table->integer('valoration2_id')->unsigned()->index()->nullable();
            $table->foreign('draft_id')->references('id')->on('sv_models_drafts');
            $table->foreign('valoration1_id')->references('id')->on('sv_valoration');
            $table->foreign('valoration2_id')->references('id')->on('sv_valoration');
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
        Schema::dropIfExists('sv_declaration_720');
    }
}
