<?php

namespace App\Models\Services\TaxModels\Types;

use App\Models\Services\Declarations\SevenTwoCero\Declaration720;
use App\Models\Services\TaxModels\TaxModel;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Traits\TaxReturns\ExportsAsString;
use App\Traits\TaxReturns\FormatsAEATValues;
use App\Traits\TaxReturns\HasTaxReturnDeclaration;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ModelSevenTwoZero extends TaxModel
{
    use ExportsAsString;

    const DECLARATION_CLASS = Declaration720::class;

    public function buildString(TaxModelDraft $draft) {
        return self::buildStringS($draft);
    }

    public static function buildStringS(TaxModelDraft $draft)
    {
        $declaration = $draft->declaration;
        $declarant = $draft->declaration->declarant;

        /************************************************
         * REGISTRO DEL DECLARANTE (TIPO DE REGISTRO 1) *
         ************************************************ */

//        Tipo de registro
        $result = '1';

//        Modelo
        $result .= '720';

//        Ejercicio
        $result .= str_pad($draft->year, 4, "0", STR_PAD_LEFT);

//        NIF declarante
        $result .= str_pad($declarant->additionalInfo->identification, 9, " ", STR_PAD_RIGHT);

        /*
         * Apellidos y nombre del declarante si es una persona física.
         * Si es una persona jurídica, razón social completa, sin anagrama
         * TODO Implementar declarantes como personas jurídicas desde Selfconveyance
        */
        $result .= str_pad($declarant->lastname . " " . $declarant->firstname, 40, " ", STR_PAD_RIGHT);

//        Tipo de soporte
        $result .= "T";

//        Persona con quién relacionarse: teléfono
        $result .= str_pad($declarant->phone, 9, "0", STR_PAD_LEFT);

//        Persona con quién relacionarse: apellidos y nombre
        $result .= str_pad($declarant->lastname . " " . $declarant->firstname, 40, " ", STR_PAD_RIGHT);

//        Número identificativo de la declaración
        $result .= str_pad($declaration->declaration_number, 13, "0", STR_PAD_LEFT);

//        Declaración complementaria
        $result .= $declaration->complementary_declaration ? "C" : " ";

//        Declaración sustitutiva
        $result .= $declaration->substitutive_declaration ? "S" : " ";

//        Número identificativo de la declaración anterior
        $result .= str_pad($declaration->complementary_declaration || $declaration->substitutive_declaration ? $declaration->declaration_parent_number : "", 13, "0", STR_PAD_LEFT);

//        Número total de registros declarados
        $result .= str_pad($declaration->properties->count(), 9, "0", STR_PAD_LEFT);

//        Valoración 1
        $valoration1 = $declaration->valoration1;
        if($valoration1) {
//            Signo de valoración 1
            $result .= $valoration1->sign;

//            Suma total de la valoración, separada en número entero y parte decimal
            $result .= str_pad($valoration1->value, 15, "0", STR_PAD_LEFT) . str_pad($valoration1->decimal, 2, "0", STR_PAD_RIGHT);
        } else {
            $result .= str_pad("", 18, "0", STR_PAD_LEFT);
        }

//        Valoración 2
        $valoration2 = $declaration->valoration2;
        if($valoration2) {
//            Signo de valoración 2
            $result .= $valoration2->sign;

//            Suma total de la valoración, separada en número entero y parte decimal
            $result .= str_pad($valoration2->value, 15, "0", STR_PAD_LEFT) . str_pad($valoration2->decimal, 2, "0", STR_PAD_RIGHT);
        } else {
            $result .= str_pad("", 18, "0", STR_PAD_LEFT);
        }

        $result .= str_pad("", 320, " ");

        /***********************************************
         * REGISTRO DEL DECLARADO (TIPO DE REGISTRO 2) *
         *********************************************** */
        foreach($declaration->properties as $property) {
//            Tipo de registro
            $result .= '2';

//            Modelo declaración
            $result .= '720';

//            Ejercicio
            $result .= str_pad($draft->year, 4, "0", STR_PAD_LEFT);

//            NIF declarante
            $result .= str_pad($declarant->additionalInfo->identification, 9, " ", STR_PAD_RIGHT);

//            NIF declarado
            $result .= str_pad($declarant->additionalInfo->identification, 9, " ", STR_PAD_RIGHT);

//            NIF del representante legal
            $result .= str_pad($declaration->representative ? $declaration->representative->additionalInfo->identification : "", 9, " ", STR_PAD_RIGHT);

            /*
             * Apellidos y nombre. Razón social o denominación del declarado
             * Apellidos y nombre del declarante si es una persona física.
             * Si es una persona jurídica, razón social completa, sin anagrama
             * TODO Implementar declarantes como personas jurídicas desde Selfconveyance
            */
            $result .= str_pad($declarant->lastname . " " . $declarant->firstname, 40, " ", STR_PAD_RIGHT);

//            Clave de condición del declarante
            $result .= $property->declarant_condition;

//            Tipo de titularidad sobre el bien o derecho
            $result .= str_pad((int) $property->declarant_condition == 8 ? $property->declarant_type_ownership : "", 25, " ", STR_PAD_RIGHT);

//            Clave tipo de bien o derecho
            $result .= str_pad($property->property_key_type, 1, " ", STR_PAD_RIGHT);

//            Subclave de propiedad del bien que se está declarando
            $result .= str_pad($property->subkeyType && $property->property_key_type !== "I" ? $property->subkeyType->property_key_type : "", 1, "0", STR_PAD_LEFT);

//            Tipo de derecho real sobre el inmueble
            $result .= str_pad($property->property_real_ownership, 25, "0", STR_PAD_LEFT);

//            Código de país
            $result .= str_pad($property->countryCod ? $property->countryCod->cod : "", 2, " ", STR_PAD_RIGHT);

//            Clave de identificación
            $result .= str_pad($property->identity_key, 1, " ", STR_PAD_RIGHT);

//            Identificación de valores
            $result .= str_pad($property->identity_values, 12, "0", STR_PAD_LEFT);

//            Clave de identificación de cuenta
            $result .= str_pad($property->identity_key_account, 1, " ", STR_PAD_RIGHT);

//            Código BIC
            $result .= str_pad($property->bic_code, 11, " ", STR_PAD_RIGHT);

//            Código de cuenta
            $result .= str_pad($property->account_code, 34, " ", STR_PAD_RIGHT);

//            Identificación de la identidad
            $result .= str_pad($property->entity_identity, 41, " ", STR_PAD_RIGHT);

//            Número de identificación fiscal en el país de residencia fiscal
            $result .= str_pad($property->residential_country_nif, 20, " ", STR_PAD_RIGHT);

//            Domicilio de la entidad o ubicación del inmueble
            /*
             * TODO Revisar esto. No sé si independientemente del tipo de bien o derecho el domicilio se pone con estos campos
             * */
//            Nombre vía pública y número de casa
            $result .= str_pad($property->address . $property->street . $property->number, 52, " ", STR_PAD_RIGHT);

//            Complemento
            $result .= str_pad($property->complement, 40, " ", STR_PAD_RIGHT);

//            Población/ciudad
            $result .= str_pad($property->city, 30, " ", STR_PAD_RIGHT);

//            Provincia/región/estado
            $result .= str_pad($property->address_state, 30, " ", STR_PAD_RIGHT);

//            Código postal (ZIP code)
            $result .= str_pad($property->zip_code, 10, " ", STR_PAD_RIGHT);

//            Código país
            $result .= str_pad($property->countryCod ? $property->countryCod->cod : "", 2, " ", STR_PAD_RIGHT);

//            Fecha de incorporación
            $result .= str_pad($property->incorporation_date ? $property->incorporation_date->format('Ymd') : "", 8, " ", STR_PAD_RIGHT);

//            Origen del bien o derecho
            $result .= str_pad($property->origin, 1, " ", STR_PAD_RIGHT);

//            Fecha de extinción
            $result .= str_pad($property->origin == "C" && $property->extinction_date ? $property->extinction_date->format('Ymd') : "", 8, " ", STR_PAD_RIGHT);

//            Valoración 1
            $valoration1 = $property->valoration1;
            if($valoration1) {
//                Signo de valoración 1
                $result .= $valoration1->sign;

//                Suma total de la valoración, separada en número entero y parte decimal
                $result .= str_pad($valoration1->value, 12, "0", STR_PAD_LEFT) . str_pad($valoration1->decimal, 2, "0", STR_PAD_RIGHT);
            } else {
                $result .= str_pad("", 15, "0", STR_PAD_LEFT);
            }

//            Valoración 2
            $valoration2 = $property->valoration2;
            if($valoration2) {
//                Signo de valoración 2
                $result .= $valoration2->sign;

//                Suma total de la valoración, separada en número entero y parte decimal
                $result .= str_pad($valoration2->value, 12, "0", STR_PAD_LEFT) . str_pad($valoration2->decimal, 2, "0", STR_PAD_RIGHT);
            } else {
                $result .= str_pad("", 15, "0", STR_PAD_LEFT);
            }

//            Clave de representación de valores
            $result .= str_pad($property->property_key_type == "V" || $property->property_key_type == "I" ? $property->value_representation_key : "", 1, " ", STR_PAD_RIGHT);

//            Número de valores
            $value_numbers_int = (int) floor($property->value_numbers);
            $value_numbers_dec = (int) (($property->value_numbers - $value_numbers_int) * 100);
            if($property->property_key_type == "V" || $property->property_key_type == "I") {
                $result .= str_pad($value_numbers_int, 10, "0", STR_PAD_LEFT) . str_pad($value_numbers_dec, 2, "0", STR_PAD_LEFT);
            } else {
                $result .= str_pad("", 12, "0", STR_PAD_LEFT);
            }

//            Clave de tipo de bien inmueble
            $result .= str_pad($property->property_key_type == "B" ? $property->real_state_key_type : "", 1, " ", STR_PAD_RIGHT);

//            Porcentaje de participación
            $split_participation = explode(".", number_format($property->participation, 2, '.', ''));
            $result .= str_pad($split_participation[0], 3, "0", STR_PAD_LEFT) . str_pad($split_participation[1], 2, "0", STR_PAD_RIGHT);

//            Blancos
            $result .= str_pad("", 20, " ");
        }

        return $result;
    }
}
