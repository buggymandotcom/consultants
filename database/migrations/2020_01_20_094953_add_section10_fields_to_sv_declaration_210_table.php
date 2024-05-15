<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSection10FieldsToSvDeclaration210Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sv_declaration_210', function (Blueprint $table) {

            /* Tipo de declaracion */

            /* PERSONA DE CONTACTO */
            $table->string('contact_person_name')->nullable();
            $table->integer('contact_person_phone1')->nullable();
            $table->integer('contact_person_phone2')->nullable();
            $table->string('contact_person_email')->nullable();

            /* INGRESO */
            $table->enum('entry_payment_method',["0","1","2","3","4"])->nullable(); // 0: No consta, 1: En efectivo, 2: Adeudo en cuenta, 3: Domiciliación, 4: Transferencia
            $table->string('entry_owner_identification')->nullable();
            $table->string('entry_owner_name')->nullable();
            $table->string('entry_owner_iban')->nullable();
            /* Bancos europeos */
            $table->string('entry_owner_ue_bic_code')->nullable();
            /* Bancos del resto del mundo */
            $table->string('entry_owner_no_ue_bic_code')->nullable();
            $table->string('entry_owner_no_ue_account_number')->nullable();
            $table->string('entry_owner_no_ue_bank_name')->nullable();
            $table->string('entry_owner_no_ue_bank_address')->nullable();
            $table->string('entry_owner_no_ue_bank_city')->nullable();
            $table->string('entry_owner_no_ue_bank_country_code')->nullable();

            /* DEVOLUCIÓN */
            $table->boolean('refund_renounce')->nullable(); //Renuncia a devolución
            /* España o Europa */
            $table->string('refund_account_identification')->nullable();
            $table->string('refund_account_name')->nullable();
            $table->string('refund_account_iban')->nullable();
            $table->string('refund_account_bic_code')->nullable();
            /* Resto de países del mundo */
            $table->string('refund_no_ue_bic_code')->nullable();
            $table->string('refund_no_ue_account_number')->nullable();
            $table->string('refund_no_ue_bank_name')->nullable();
            $table->string('refund_no_ue_bank_address')->nullable();
            $table->string('refund_no_ue_bank_city')->nullable();
            $table->string('refund_no_ue_country_code')->nullable();

            /* SIN INGRESO O DEVOLUCIÓN --> Cuando el resultado de la autoliquidación = 0: liq_result == 0 */

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
            $table->dropColumn('contact_person_name');
            $table->dropColumn('contact_person_phone1');
            $table->dropColumn('contact_person_phone2');
            $table->dropColumn('contact_person_email');
            $table->dropColumn('entry_payment_method');
            $table->dropColumn('entry_owner_identification');
            $table->dropColumn('entry_owner_name');
            $table->dropColumn('entry_owner_iban');
            $table->dropColumn('entry_owner_ue_bic_code');
            $table->dropColumn('entry_owner_no_ue_bic_code');
            $table->dropColumn('entry_owner_no_ue_account_number');
            $table->dropColumn('entry_owner_no_ue_bank_name');
            $table->dropColumn('entry_owner_no_ue_bank_address');
            $table->dropColumn('entry_owner_no_ue_bank_city');
            $table->dropColumn('entry_owner_no_ue_bank_country_code');
            $table->dropColumn('refund_renounce');
            $table->dropColumn('refund_account_identification');
            $table->dropColumn('refund_account_name');
            $table->dropColumn('refund_account_iban');
            $table->dropColumn('refund_account_bic_code');
            $table->dropColumn('refund_no_ue_bic_code');
            $table->dropColumn('refund_no_ue_account_number');
            $table->dropColumn('refund_no_ue_bank_name');
            $table->dropColumn('refund_no_ue_bank_address');
            $table->dropColumn('refund_no_ue_bank_city');
            $table->dropColumn('refund_no_ue_country_code');
        });
    }
}
