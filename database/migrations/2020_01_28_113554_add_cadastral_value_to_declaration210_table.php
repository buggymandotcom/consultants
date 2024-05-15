<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCadastralValueToDeclaration210Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_declaration_210', function (Blueprint $table) {
            $table->double('property_cadastral_value')->after('property_address_cadastral_ref')->nullable();
            $table->double('det_tax_base_i_original')->after('det_tax_base_i')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sv_declaration_210', function (Blueprint $table) {
            $table->dropColumn('property_cadastral_value');
            $table->dropColumn('det_tax_base_i_original');
        });
    }
}
