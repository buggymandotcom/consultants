<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSvDeclaration210Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sv_declaration_210', function (Blueprint $table) {
            $table->increments('id');

            /* Referencias de infraestrutura de ciberconsultores/lexforis */
            $table->integer('declarant_id')->unsigned()->index();
            $table->integer('draft_id')->unsigned()->index();

            /* Tipo de declaración */
            $table->string('declaration_type')->nullable();

            /* Persona que realiza la autoliquidación */
            $table->string('declarant_nif')->nullable();
            $table->string('declarant_name')->nullable();
            $table->boolean('declarant_condition_isRepresentative')->nullable(); // Si false --> Contribuyente, si no --> Representante
            $table->boolean('declarant_condition_payer')->nullable();
            $table->boolean('declarant_condition_holder')->nullable();
            $table->boolean('declarant_condition_manager')->nullable();
            $table->boolean('declarant_condition_keeper')->nullable();

            /* Devengo */
            $table->boolean('earn_agrupation')->nullable();
            $table->enum('earn_period',['1T','2T','3T','4T','0A'])->nullable();
            $table->string('earn_period_year')->nullable();
            $table->dateTime('earn_period_date')->nullable();

            /* Renta obtenida */
            $table->enum('rent_type',['01','02','35'])->nullable();
            $table->enum('rent_key_badge',['954','208','578','752','036','124','554','840','756','826','392','999'])->nullable();

            /* Contribuyente */
            $table->string('contributor_nif')->nullable();
            $table->enum('contributor_fj',['F','J'])->nullable();
            $table->string('contributor_name')->nullable();
            $table->string('contributor_residential_nif')->nullable();
            $table->dateTime('contributor_born_date')->nullable();
            $table->string('contributor_born_locality')->nullable();
            $table->string('contributor_country_cod')->nullable();
            $table->string('contributor_fiscal_residential')->nullable();
            $table->string('contributor_address')->nullable();
            $table->string('contributor_complementary_address')->nullable();
            $table->string('contributor_locality')->nullable();
            $table->string('contributor_email')->nullable();
            $table->string('contributor_zip_code')->nullable();
            $table->string('contributor_state')->nullable();
            $table->string('contributor_country')->nullable();
            $table->string('contributor_phone')->nullable();
            $table->string('contributor_mobile_phone')->nullable();
            $table->string('contributor_fax')->nullable();

            /* Representante del contribuyente */
            $table->string('agent_nif')->nullable();
            $table->enum('agent_fj',['F','J'])->nullable();
            $table->string('agent_name')->nullable();
            $table->enum('agent_represent',['L','V','N'])->nullable();
            $table->string('agent_road_type')->nullable();
            $table->string('agent_address')->nullable();
            $table->enum('agent_numeration_type',['NUM','S/N','OTR','KM.'])->nullable();
            $table->string('agent_address_number')->nullable();
            $table->enum('agent_address_qualifier_number',['BIS','DUP','MOD','ANT'])->nullable();
            $table->string('agent_address_block')->nullable();
            $table->string('agent_address_portal')->nullable();
            $table->string('agent_address_stairs')->nullable();
            $table->string('agent_address_floor')->nullable();
            $table->string('agent_address_door')->nullable();
            $table->string('agent_address_complementary')->nullable();
            $table->string('agent_address_locality')->nullable();
            $table->string('agent_address_state')->nullable();
            $table->string('agent_address_municipality')->nullable();
            $table->string('agent_address_zip_code')->nullable();
            $table->string('agent_phone')->nullable();
            $table->string('agent_mobile_phone')->nullable();
            $table->string('agent_fax')->nullable();

            /* Pagador */
            $table->string('payer_nif')->nullable();
            $table->enum('payer_fj',['F','J'])->nullable();
            $table->string('payer_name')->nullable();

            /* Situación del inmueble */
            $table->string('property_address_road_type')->nullable();
            $table->string('property_address_road_name')->nullable();
            $table->string('property_address_numeration_type')->nullable();
            $table->integer('property_address_number')->unsigned()->nullable();
            $table->enum('property_address_qualifier_number',['BIS','DUP','MOD','ANT'])->nullable();
            $table->string('property_address_block')->nullable();
            $table->string('property_address_portal')->nullable();
            $table->string('property_address_stairs')->nullable();
            $table->string('property_address_floor')->nullable();
            $table->string('property_address_door')->nullable();
            $table->string('property_address_complementary')->nullable();
            $table->string('property_address_locality')->nullable();
            $table->string('property_address_state')->nullable(); //Provincia
            $table->string('property_address_municipality')->nullable(); //Municipio
            $table->string('property_address_zip_code')->nullable();
            $table->string('property_address_cadastral_ref')->nullable();

            /* Determinación de la base imponible */
            $table->double('det_tax_base_i')->nullable(); // Base imponible I
            $table->double('det_full_returns_r')->nullable(); // Rendimientos íntegros
            $table->double('det_dividends_applied_ext_r')->nullable(); // Extensión aplicada dividendos
            $table->double('det_deductible_expenses_r')->nullable(); // Gastos deducibles
            $table->double('det_tax_base_r')->nullable(); // Base imponible R
            $table->enum('det_tax_base_co_h',['C','O','N'])->nullable();
            $table->double('det_taxpayer_participation_fee_h')->nullable(); // Cuota participación contribuyente
            $table->double('det_spouse_participation_fee_h')->nullable(); // Cuota participación  Conyuge
            $table->string('det_spouse_nif_h')->nullable(); //Conyuge
            $table->string('det_spouse_name_h')->nullable(); //Conyuge
            /* Adquisición */
            $table->double('det_adquisition_transmission_value_h')->nullable(); // Adquisición. Valor de transmisión
            $table->double('det_adquisition_value_h')->nullable(); // Adquisición. Valor de adquisición
            $table->double('det_adquisition_diff_h')->nullable(); // Adquisición. Diferencia
            $table->double('det_adquisition_gain_h')->nullable(); // Adquisición. Ganancia
            /* 2ª Adquisición */
            $table->double('det_adquisition2_transmission_value_h')->nullable(); // Adquisición. Valor de transmisión
            $table->double('det_adquisition2_value_h')->nullable(); // Adquisición. Valor de adquisición
            $table->double('det_adquisition2_diff_h')->nullable(); // Adquisición. Diferencia
            $table->double('det_adquisition2_gain_h')->nullable(); // Adquisición. Ganancia
            $table->double('det_tax_base_h')->nullable(); // gain1 + gain2
            $table->dateTime('det_adquisition_date_h')->nullable();
            $table->dateTime('det_adquisition2_date_h')->nullable();
            $table->string('det_model_voucher_number_h')->nullable(); //Número de justificante del modelo
            $table->double('det_tax_base_g')->nullable(); // gain1 + gain2

            /* Liquidación */
            $table->boolean('liq_irnr_law')->nullable();
            $table->boolean('liq_convention')->nullable();
            $table->double('liq_irnr_law_tax_type', 5, 2)->nullable();
            $table->double('liq_integral_fee', 17, 2)->nullable();
            $table->double('liq_donation_deduction', 17, 2)->nullable();
            $table->double('liq_irnr_law_fee', 17, 2)->nullable(); //Cuota ley IRNR
            $table->double('liq_convention_percentage', 5, 2)->nullable(); //Porcentaje convenio
            $table->double('liq_convention_limit', 17, 2)->nullable(); //Limite convenio
            $table->double('liq_convention_reduction', 17, 2)->nullable(); //Reducción por convenio
            $table->double('liq_reduced_integral_fee', 17, 2)->nullable();
            $table->double('liq_retentions_income', 17, 2)->nullable();
            $table->double('liq_previous_income_return', 17, 2)->nullable();
            $table->double('liq_result', 17, 2)->nullable();

            /* Autoliquidación complementaria */
            $table->boolean('aliq_complementary')->nullable();
            $table->string('aliq_complementary_previous_number')->nullable();

            /* Constraints */
            $table->foreign('draft_id')->references('id')->on('sv_models_drafts');

            /* Timestamp */
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
        Schema::dropIfExists('sv_declaration_210');
    }
}
