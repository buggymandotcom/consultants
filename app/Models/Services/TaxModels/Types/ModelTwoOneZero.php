<?php

namespace App\Models\Services\TaxModels\Types;

use App\Models\Services\Declarations\TwoOneCero\Declaration210;
use App\Models\Services\TaxModels\TaxModel;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Traits\TaxReturns\ExportsAsString;
use App\Traits\TaxReturns\FormatsAEATValues;

class ModelTwoOneZero extends TaxModel
{
    use ExportsAsString, FormatsAEATValues;

    const DECLARATION_CLASS = Declaration210::class;

    public function buildString(TaxModelDraft $draft) {
        return self::buildStringS($draft);
    }

    public static function buildStringS(TaxModelDraft $draft)
    {
        $declaration = $draft->declaration;
        $declarant = $draft->declaration->declarant;

//        Inicio del identificador de modelo y página.
        $result = "<T";

//        Modelo.
        $result .= "210";

//        Página.
        $result .= "01";

//       Fin de identificador de modelo.
        $result .= ">";

//        Reservado para la Administración.
        $result .= " ";

//        Tipo de declaración.
        $result .= self::formatValue($declaration->declaration_type, "An", 1);

//        Persona que realiza la autoliquidación.
//          NIF.
        $result .= self::formatValue($declaration->declarant_nif, "An", 9);

//          Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->declarant_name, "An", 125);

//          Condición de la persona.
        if(!$declaration->declarant_condition_isRepresentative) {
            $result .= "X     ";
        } else {
            $result .= " X";
            $result .= $declaration->declarant_condition_payer ? "X" : " ";
            $result .= $declaration->declarant_condition_holder ? "X" : " ";
            $result .= $declaration->declarant_condition_manager ? "X" : " ";
            $result .= $declaration->declarant_condition_keeper ? "X" : " ";
        }

//        Devengo. Agrupación.
        $result .= self::formatValue($declaration->earn_agrupation ? "X" : " ", "An", 1);

//        Devengo. Período.
        $result .= self::formatValue($declaration->earn_period, "An", 2);

//        Devengo. Año.
        $result .= self::formatValue($declaration->earn_period_year, "Num", 4);

//        Devengo. Fecha de devengo.
        $result .= self::formatValue($declaration->earn_period_date ? $declaration->earn_period_date->format('dmY') : null, "Num", 8);

//        Renta obtenida. Tipo renta.
        $result .= self::formatValue($declaration->rent_type, "An", 2);

//        Renta obtenida. Clave de divisa.
        $result .= self::formatValue($declaration->rent_type_badge, "An", 3);


        /*****************
         * CONTRIBUYENTE *
         *****************/
//          NIF.
        $result .= self::formatValue($declaration->contributor_nif, "An", 9);

//          F/J.
        $result .= self::formatValue($declaration->contributor_fj, "An", 1);

//         Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->contributor_name, "An", 125);

//         NIF en el país de residencia.
        $result .= self::formatValue($declaration->contributor_residential_nif, "An", 15);

//         Fecha de nacimiento.
        $result .= self::formatValue($declaration->contributor_born_date ? $declaration->contributor_born_date->format('dmY') : null, "Num", 8);

//         Lugar de nacimiento. Ciudad.
        $result .= self::formatValue($declaration->contributor_born_locality, "An", 30);

//         Lugar de nacimiento. Código País.
        $result .= self::formatValue($declaration->contributor_country_cod, "An", 2);

//         Residencia fiscal. Código país.
        $result .= self::formatValue($declaration->contributor_fiscal_residential, "An", 2);

//         Dirección en el país de residencia. Domicilio.
        $result .= self::formatValue($declaration->contributor_address, "An", 50);

//         Dirección en el país de residencia. Datos complementarios del domicilio.
        $result .= self::formatValue($declaration->contributor_complementary_address, "An", 40);

//         Dirección en el país de residencia. Población/ciudad.
        $result .= self::formatValue($declaration->contributor_locality, "An", 30);

//         Dirección en el país de residencia. Correo electrónico.
        $result .= self::formatValue($declaration->contributor_locality, "An", 100);

//         Dirección en el país de residencia. Código postal (ZIP).
        $result .= self::formatValue($declaration->contributor_zip_code, "An", 10);

//         Dirección en el país de residencia. Provincia/región/estado.
        $result .= self::formatValue($declaration->contributor_state, "An", 30);

//         Dirección en el país de residencia. Código país.
        $result .= self::formatValue($declaration->contributor_country, "An", 2);

//         Dirección en el país de residencia. Teléfono fijo.
        $result .= self::formatValue($declaration->contributor_phone, "Num", 15);

//         Dirección en el país de residencia. Teléfono móvil.
        $result .= self::formatValue($declaration->contributor_mobile_phone, "Num", 15);

//         Dirección en el país de residencia. Nº de fax.
        $result .= self::formatValue($declaration->contributor_fax, "An", 15);

        /*****************
         * REPRESENTANTE *
         *****************/
//          NIF en el país de residencia.
        $result .= self::formatValue($declaration->agent_nif, "An", 9);

//          F/J.
        $result .= self::formatValue($declaration->agent_fj, "An", 1);

//          Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->agent_name, "An", 125);

//          Legal o voluntario.
        $result .= self::formatValue($declaration->agent_represent, "An", 1);

//          Domicilio. Tipo de vía.
        $result .= self::formatValue($declaration->agent_road_type, "An", 5);

//          Domicilio. Nombre de la vía pública.
        $result .= self::formatValue($declaration->agent_road_address, "An", 50);

//          Domicilio. Tipo de numeración.
        $result .= self::formatValue($declaration->agent_numeration_type, "An", 3);

//          Domicilio. Número de casa.
        $result .= self::formatValue($declaration->agent_address_number, "Num", 5);

//          Domicilio. Calificador del número.
        $result .= self::formatValue($declaration->agent_address_qualifier_number, "An", 3);

//          Domicilio. Bloque.
        $result .= self::formatValue($declaration->agent_address_block, "An", 3);

//          Domicilio. Portal.
        $result .= self::formatValue($declaration->agent_address_portal, "An", 3);

//          Domicilio. Escaleras.
        $result .= self::formatValue($declaration->agent_address_stairs, "An", 3);

//          Domicilio. Planta.
        $result .= self::formatValue($declaration->agent_address_floor, "An", 3);

//          Domicilio. Puerta.
        $result .= self::formatValue($declaration->agent_address_door, "An", 3);

//          Domicilio. Datos complementarios.
        $result .= self::formatValue($declaration->agent_address_complementary, "An", 40);

//          Domicilio. Localidad/población (si es distinta del municipio).
        $result .= self::formatValue($declaration->agent_address_locality, "An", 30);

//          Domicilio. Código postal.
        $result .= self::formatValue($declaration->agent_address_zip_code, "An", 5);

//          Reservado para la administración.
        $result .= self::formatValue("", "A", 30);

//          Código INE del municipio.
        $result .= self::formatValue($declaration->agent_address_municipality, "Num", 5);

//          Código provincia.
        $result .= self::formatValue($declaration->agent_address_state, "An", 2);

//          Teléfono fijo.
        $result .= self::formatValue($declaration->agent_phone, "Num", 9);

//          Teléfono móvil.
        $result .= self::formatValue($declaration->agent_mobile_phone, "Num", 9);

//          Número de fax.
        $result .= self::formatValue($declaration->agent_fax, "An", 9);

        /****************************************
         * PAGADOR/RETENEDOR/EMISOR/ADQUIRIENTE *
         ****************************************/
//          NIF.
        $result .= self::formatValue($declaration->payer_nif, "An", 9);

//          F/J.
        $result .= self::formatValue($declaration->payer_fj, "An", 1);

//          Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->payer_name, "An", 125);

        /**************************
         * SITUACIÓN DEL INMUEBLE *
         **************************/
        if($declaration->rent_type == "01" || $declaration->rent_type == "02" || $declaration->rent_type == "35") {

//            Tipo de vía.
            $result .= self::formatValue($declaration->property_address_road_type, "An", 5);

//            Nombre de la vía pública.
            $result .= self::formatValue($declaration->property_address_road_name,  "An",50);

//            Tipo de numeración.
            $result .= self::formatValue($declaration->property_address_numeration_type, "An", 3);

//            Número de casa.
            $result .= self::formatValue((int) $declaration->property_address_number, "Num", 5);

//            Calificador del número.
            $result .= self::formatValue($declaration->property_address_qualifier_number, "An", 3);

//            Bloque.
            $result .= self::formatValue($declaration->property_address_block, "An", 3);

//            Portal.
            $result .= self::formatValue($declaration->property_address_portal, "An", 3);

//            Escalera.
            $result .= self::formatValue($declaration->property_address_stairs, "An", 3);

//            Planta.
            $result .= self::formatValue($declaration->property_address_floor, "An", 3);

//            Puerta.
            $result .= self::formatValue($declaration->property_address_door, "An", 3);

//            Datos complementarios del domicilio.
            $result .= self::formatValue($declaration->property_address_complementary, "An", 40);

//            Localidad / población.
            $result .= self::formatValue($declaration->property_address_locality, "An", 30);

//            Código postal.
            $result .= self::formatValue($declaration->property_address_zip_code, "Num", 5);

//            Reservado para la administración.
            $result .= self::formatValue("", "A", 30);

//            Código INE del municipio.
            $result .= self::formatValue($declaration->property_address_municipality, "Num", 5);

//            Código de provincia.
            $result .= self::formatValue($declaration->property_address_state, "Num", 2);

//            Referencia catastral.
            $result .= self::formatValue($declaration->property_address_cadastral_ref, "An", 20);

        } else {
            $result .= self::formatValue("", "A", 213);
        }

        /**************************************
         * DETERMINACIÓN DE LA BASE IMPONIBLE *
         **************************************/
//          Base imponible [4].
        $result .= self::formatValue($declaration->det_tax_base, "Num", 17, 2);

//          Rendimientos íntegros [5].
        $result .= self::formatValue($declaration->det_full_returns_r, "Num", 17, 2);

//          Exención aplicada dividendos [6].
        $result .= self::formatValue($declaration->det_dividends_applied_ext_r, "N", 17, 2);

//          Gastos deducibles [7].
        $result .= self::formatValue($declaration->det_deductible_expenses_r, "N", 17, 2);

//          Base imponible ([5]-[6]-[7]) [8].
        $result .= self::formatValue($declaration->det_tax_base_r, "N", 17, 2);

//          C/O.
        $result .= self::formatValue($declaration->det_tax_base_co_h, "An", 1);

//          Cuota participación. Contribuyente.
        $result .= self::formatValue($declaration->det_taxpayer_participation_fee_h, "Num", 5, 2);

//          Cuota participación. Cónyuge.
        $result .= self::formatValue($declaration->det_spouse_participation_fee_h, "Num", 5, 2);

//          Cónyuge NIF.
        $result .= self::formatValue($declaration->det_spouse_nif_h, "An", 9);

//          Cónyuge. Apellidos y nombre.
        $result .= self::formatValue($declaration->det_spouse_name_h, "An", 40);

//          Adquisición. Valor de transmisión [9].
        $result .= self::formatValue($declaration->det_adquisition_transmission_value_h, "N", 17, 2);

//          Adquisición. Valor de adquisicón (actualizado) [10].
        $result .= self::formatValue($declaration->det_adquisition_value_h, "N", 17, 2);

//          Adquisición. Diferencia [11].
        $result .= self::formatValue($declaration->det_adquisition_diff_h, "N", 17, 2);

//          Adquisición. Ganancia [12].
        $result .= self::formatValue($declaration->det_adquisition_gain_h, "N", 17, 2);

//          Mejora o 2da adquisición. Valor de transmisión [13].
        $result .= self::formatValue($declaration->det_adquisition2_transmission_value_h, "N", 17, 2);

//          Mejora o 2da adquisición. Valor de adquisicón (actualizado) [14].
        $result .= self::formatValue($declaration->det_adquisition2_value_h, "N", 17, 2);

//          Mejora o 2da adquisición. Diferencia [15].
        $result .= self::formatValue($declaration->det_adquisition2_diff_h, "N", 17, 2);

//          Mejora o 2da adquisición. Ganancia [16].
        $result .= self::formatValue($declaration->det_adquisition2_gain_h, "N", 17, 2);

//          Base imponible ([12]+[16]) [17].
        $result .= self::formatValue($declaration->det_tax_base_h, "N", 17, 2);

//          Fecha de adquisición.
        $result .= self::formatValue($declaration->det_adquisition_date_h ? $declaration->det_adquisition_date_h->format('dmY') : null, "Num", 8);

//          Fecha de mejora o 2da adquisición.
        $result .= self::formatValue($declaration->det_adquisition2_date_h ? $declaration->det_adquisition2_date_h->format('dmY') : null, "Num", 8);

//          Número de justificante del modelo 211.
        $result .= self::formatValue($declaration->det_model_voucher_number_h, "An", 13);

//          Base imponible [18].
        $result .= self::formatValue($declaration->det_tax_base_g, "N", 17, 2);

        /***************
         * Liquidación *
         ***************/
//          Exenciones. Ley IRNR, excepto dividendos [19].
        $result .= self::formatValue($declaration->liq_irnr_law, "An", 1);

//          Convenio [20].
        $result .= self::formatValue($declaration->liq_convention, "An", 1);

//          Tipo de gravamen Ley IRNR (%) [21].
        $result .= self::formatValue($declaration->liq_irnr_law_tax_type, "Num", 5, 2);

//          Cuota íntegra [22].
        $result .= self::formatValue($declaration->liq_integral_fee, "Num", 17, 2);

//          Deducción por donativos [23].
        $result .= self::formatValue($declaration->liq_donation_deduction, "Num", 17, 2);

//          Cuota Ley IRNR (22) - (23) [24].
        $result .= self::formatValue($declaration->liq_irnr_law_fee, "Num", 17, 2);

//          Porcentaje convenio (%) [25].
        $result .= self::formatValue($declaration->liq_convention_percentage, "Num", 5, 2);

//          Límite convenio [26].
        $result .= self::formatValue($declaration->liq_convention_limit, "Num", 17, 2);

//          Reducción por convenio (24) - (26) [27].
        $result .= self::formatValue($declaration->liq_convention_reduction, "Num", 17, 2);

//          Cuota íntegra reducida (24) - (27) [28].
        $result .= self::formatValue($declaration->liq_reduced_integral_fee, "Num", 17, 2);

//          Retenciones/ingresos a cuenta [29].
        $result .= self::formatValue($declaration->liq_retentions_income, "Num", 17, 2);

//          Ingreso/devolución anterior. Exclusivamente en caso de autoliquidación complementaria [30].
        $result .= self::formatValue($declaration->liq_previous_income_return, "Num", 17, 2);

//          Resultado de la autoliquidación (28) - (29) ± (30) [31]
        $result .= self::formatValue($declaration->liq_result, "Num", 17, 2);

//        Autoliquidación complementaria. Indicador.
        $result .= self::formatValue($declaration->aliq_complementary, "An", 1);

//        Autoliquidación complementaria. Nº justificante.
        $result .= self::formatValue($declaration->aliq_complementary_previous_number, "An", 13);

//        Persona de contacto.
        $result .= self::formatValue($declaration->contributor_name, "An", 100);

//        Teléfono 1.
        $result .= self::formatValue($declaration->contributor_phone, "Num", 15);

//        Teléfono 2.
        $result .= self::formatValue($declaration->contributor_mobile_phone, "Num", 15);

//        Correo electrónico.
        $result .= self::formatValue($declaration->contributor_email, "An", 100);

//        Reservado para la administración. Sello electrónico de la AEAT.
        $result .= self::formatValue("", "A", 13);

//        Reservado para la administración.
        $result .= self::formatValue("", "A", 552);

//        Indicador de fin de registro
        $result .= "</T21001>";

        /*******************
         **** Página 02 ****
         *******************/

//        Inicio del identificador de modelo y página.
        $result .= "<T";

//        Modelo.
        $result .= "210";

//        Página.
        $result .= "02";

//        Fin de identificador de modelo.
        $result .= ">";

//        Reservado para la Administración.
        $result .= " ";

        /***********
         * Ingreso *
         ***********/
//        Ingreso. Forma de pago.
        $result .= self::formatValue($declaration->entry_payment_method, "An", 1);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "A", 48);

//        Entidiad financiera. Entidad bancaria extranjera. NIF.
        $result .= self::formatValue($declaration->entry_owner_identification, "An", 15);

//        Entidiad financiera. Entidad bancaria extranjera. Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->entry_owner_name, "An", 125);

//        Entidiad financiera. Entidad bancaria extranjera. UE/SEPA. IBAN.
        $result .= self::formatValue($declaration->entry_owner_iban, "An", 34);

//        Entidiad financiera. Entidad bancaria extranjera. UE/SEPA. Código SWIFT-BIC.
        $result .= self::formatValue($declaration->entry_owner_ue_bic_code, "An", 11);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Código SWIFT-BIC.
        $result .= self::formatValue($declaration->entry_owner_no_ue_bic_code, "An", 11);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Número de cuenta.
        $result .= self::formatValue($declaration->entry_owner_no_ue_account_number, "An", 34);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 16);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Banco.
        $result .= self::formatValue($declaration->entry_owner_no_ue_bank_name, "An", 70);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 55);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Dirección del banco.
        $result .= self::formatValue($declaration->entry_owner_no_ue_bank_address, "An", 35);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 65);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Ciudad.
        $result .= self::formatValue($declaration->entry_owner_no_ue_bank_city, "An", 30);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 30);

//        Entidiad financiera. Entidad bancaria extranjera. Resto países. Código país.
        $result .= self::formatValue($declaration->entry_owner_no_ue_bank_country_code, "An", 2);


        /**************
         * Devolución *
         **************/
//        Devolución.
        $result .= $declaration->refund_renounce ? "X" : " ";

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 158);

//        Devolución. NIF.
        $result .= self::formatValue($declaration->refund_account_identification, "An", 15);

//        Devolución. Apellidos y nombre, razón social o denominación.
        $result .= self::formatValue($declaration->refund_account_name, "An", 125);

//        Devolución. IBAN.
        $result .= self::formatValue($declaration->refund_account_iban, "An", 34);

//        Devolución. UE/SEPA. Código SWIFT-BIC.
        $result .= self::formatValue($declaration->refund_account_bic_code, "An", 11);

//        Devolución. Resto de países. Código SWIFT-BIC.
        $result .= self::formatValue($declaration->refund_no_ue_bic_code, "An", 11);

//        Devolución. Resto de países. Número de cuenta.
        $result .= self::formatValue($declaration->refund_no_ue_account_number, "An", 34);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 16);

//        Devolución. Resto de países. Nombre del banco.
        $result .= self::formatValue($declaration->refund_no_ue_bank_name, "An", 70);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 55);

//        Devolución. Resto de países. Dirección del banco.
        $result .= self::formatValue($declaration->refund_no_ue_bank_address, "An", 35);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 65);

//        Devolución. Resto de países. Ciudad.
        $result .= self::formatValue($declaration->refund_no_ue_bank_city, "An", 30);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 30);

//        Devolución. Resto de países. Código país.
        $result .= self::formatValue($declaration->refund_no_ue_country_code, "An", 2);

//        Sin ingreso y devolución. Si la autoliquidación resulta con cuota cero.
        $result .= $declaration->liq_result == 0 ? "X" : " ";

//        Ingreso efectuado a favor del T.P. Cuenta del banco de España. IBAN.
        $result .= self::formatValue($declaration->refund_renounce ? "ES8790000001200270002107" : "", "An", 24);

//        Ingreso efectuado a favor del T.P. Cuenta del banco de España. BIC.
        $result .= self::formatValue($declaration->refund_renounce ? "ESPBESMMXXX" : "", "An", 11);

//        Reservado para la admnistración.
        $result .= self::formatValue("", "An", 72);

//        Indicador de fin de registro
        $result .= "</T21002>";

        return iconv('UTF-8','Windows-1252',$result);
    }
}
