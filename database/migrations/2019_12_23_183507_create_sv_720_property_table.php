<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSv720PropertyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_720_property', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('declaration_id')->unsigned(); // Declaración

            /* Datos del declarante */
            $table->integer('representative_id')->unsigned()->nullable(); // Datos de la persona que representa al declarante
            $table->enum('declarant_condition', ['1','2','3','4','5','6','7','8'])->nullable(); // Condición del declarante (Por defecto 1 = titular)
            $table->string('declarant_type_ownership')->nullable(); // Solo si declarant_condition = 8
            $table->enum('property_key_type',['C','V','I','S','B'])->nullable(); // Clave de la propiedad que se está declarando
            $table->integer('property_subkey_type')->unsigned()->nullable(); // Subclave de propiedad del bien que se está declarando (FK a tabla de claves)
            $table->string('property_real_ownership')->nullable(); // Tipo de derecho real (Solo si property_key_type=B y  property_subkey_type=5)
            $table->integer('country_cod')->unsigned()->nullable(); // FK al código del país del bien
            $table->enum('identity_key', ['0','1','2'])->default('0'); // Si property_key_type = V | I, entonces toma valores 1 o 2, en cualquier otro caso 0
            $table->string('identity_values')->nullable(); // Si property_key_type = V | I, aquí va el código SINI correctamente formateado
            $table->enum('identity_key_account',['I','O'])->nullable(); // Si property_key_type = C
            $table->string('bic_code')->nullable(); // Bank internation code
            $table->string('account_code')->nullable(); // Si property_key_type = I | O entonces IBAN o código de CCC
            $table->string('entity_identity')->nullable(); // Razón social, si prperty_key_type = B entonces hay que dejarlo en blanco
            $table->string('residential_country_nif')->nullable(); // Razón social, si prperty_key_type = B entonces hay que dejarlo en blanco

            /* Datos del inmueble bien o derecho */
            $table->string('address')->nullable(); //Domicilio de la entidad o inmueble
            $table->string('street')->nullable(); //Nombre de la vía pública
            $table->string('number')->nullable(); //Número o punto kilométrico
            $table->string('complement')->nullable(); //Datos adicionales
            $table->string('city')->nullable(); //Ciudad
            $table->string('address_state')->nullable(); //Provicnia/Región/Estado
            $table->string('zip_code')->nullable(); //Código Postal
            $table->integer('country_address_cod')->unsigned()->nullable(); // FK al código del país de la dirección
            $table->dateTime('incorporation_date')->nullable(); //Código Postal
            $table->enum('origin',['A','M','C'])->nullable(); //Origen
            $table->dateTime('extinction_date')->nullable(); //Fecha de extinción
            $table->integer('valoration1_id')->unsigned()->nullable(); //Valoración 1
            $table->integer('valoration2_id')->unsigned()->nullable(); //Valoración 2
            $table->enum('value_representation_key',['A','B'])->nullable(); //Clave de representación de valores
            $table->float('value_numbers')->nullable(); // Número de valores
            $table->enum('real_state_key_type',['U','R'])->nullable(); //Clave de tipo bien inmueble
            $table->float('participation')->nullable(); // Porcentaje de participación

            /* Constraints */
            $table->foreign('declaration_id')->references('id')->on('sv_declaration_720');
            $table->foreign('property_subkey_type')->references('id')->on('sv_720_property_subkey_type');
            $table->foreign('country_cod')->references('id')->on('sv_iso_country_cod');
            $table->foreign('country_address_cod')->references('id')->on('sv_iso_country_cod');
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
        Schema::dropIfExists('sv_720_property');
    }
}
