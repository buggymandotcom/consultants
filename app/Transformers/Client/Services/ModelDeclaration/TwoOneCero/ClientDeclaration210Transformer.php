<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration\TwoOneCero;

use App\Traits\TransformerTrait;
use App\Transformers\Client\ClientTransformer;
use App\Transformers\Client\Services\ModelDeclaration\CityTransformer;
use App\Transformers\Client\Services\ModelDeclaration\ClientDraftModelTransformer;
use App\Transformers\Client\Services\ModelDeclaration\RegionTransformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientPropertyCountryCod720Transformer;
use App\Transformers\Transformer;

class ClientDeclaration210Transformer extends Transformer
{
    use TransformerTrait;
    public $declarant = false;
    public $draft = false;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'declaration_type' => $item['declaration_type'],
            'declarant_nif' => $item['declarant_nif'],
            'declarant_name' => $item['declarant_name'],
            'declarant_condition_isRepresentative' => $item['declarant_condition_isRepresentative'],
            'declarant_condition_payer' => $item['declarant_condition_payer'],
            'declarant_condition_holder' => $item['declarant_condition_holder'],
            'declarant_condition_manager' => $item['declarant_condition_manager'],
            'declarant_condition_keeper' => $item['declarant_condition_keeper'],
            'earn_agrupation' => $item['earn_agrupation'],
            'earn_period' => $item['earn_period'],
            'earn_period_year' => $item['earn_period_year'],
            'earn_period_date' => $item['earn_period_date'],
            'rent_type' => $item['rent_type'],
            'rent_key_badge' => $item['rent_key_badge'],
            'contributor_nif' => $item['contributor_nif'],
            'contributor_name' => $item['contributor_name'],
            'contributor_fj' => $item['contributor_fj'],
            'contributor_residential_nif' => $item['contributor_residential_nif'],
            'contributor_born_date' => $item['contributor_born_date'],
            'contributor_born_locality' => $item['contributor_born_locality'],
            'contributor_address' => $item['contributor_address'],
            'contributor_complementary_address' => $item['contributor_complementary_address'],
            'contributor_locality' => $item['contributor_locality'],
            'contributor_email' => $item['contributor_email'],
            'contributor_zip_code' => $item['contributor_zip_code'],
            'contributor_state' => $item['contributor_state'],
            'contributor_country_cod' => $item['contributor_country_cod'],
            'contributor_fiscal_residential' => $item['contributor_fiscal_residential'],
            'contributor_country' => $item['contributor_country'],
            'contributor_phone' => $item['contributor_phone'],
            'contributor_mobile_phone' => $item['contributor_mobile_phone'],
            'contributor_fax' => $item['contributor_fax'],
            'agent_nif' => $item['agent_nif'],
            'agent_fj' => $item['agent_fj'],
            'agent_name' => $item['agent_name'],
            'agent_represent' => $item['agent_represent'],
            'agent_road_type' => $item['agent_road_type'],
            'agent_address' => $item['agent_address'],
            'agent_numeration_type' => $item['agent_numeration_type'],
            'agent_address_number' => $item['agent_address_number'],
            'agent_address_qualifier_number' => $item['agent_address_qualifier_number'],
            'agent_address_block' => $item['agent_address_block'],
            'agent_address_portal' => $item['agent_address_portal'],
            'agent_address_stairs' => $item['agent_address_stairs'],
            'agent_address_floor' => $item['agent_address_floor'],
            'agent_address_door' => $item['agent_address_door'],
            'agent_address_state' => $item['agent_address_state'],
            'agent_address_municipality' => $item['agent_address_municipality'],
            'agent_address_complementary' => $item['agent_address_complementary'],
            'agent_address_locality' => $item['agent_address_locality'],
            'agent_address_city' => $item['agent_address_city'],
            'agent_address_zip_code' => $item['agent_address_zip_code'],
            'agent_phone' => $item['agent_phone'],
            'agent_mobile_phone' => $item['agent_mobile_phone'],
            'agent_fax' => $item['agent_fax'],
            'payer_nif' => $item['payer_nif'],
            'payer_fj' => $item['payer_fj'],
            'payer_name' => $item['payer_name'],
            'property_address_road_type' => $item['property_address_road_type'],
            'property_address_road_name' => $item['property_address_road_name'],
            'property_address_numeration_type' => $item['property_address_numeration_type'],
            'property_address_number' => $item['property_address_number'],
            'property_address_qualifier_number' => $item['property_address_qualifier_number'],
            'property_address_block' => $item['property_address_block'],
            'property_address_portal' => $item['property_address_portal'],
            'property_address_stairs' => $item['property_address_stairs'],
            'property_address_floor' => $item['property_address_floor'],
            'property_address_door' => $item['property_address_door'],
            'property_address_state' => $item['property_address_state'],
            'property_address_municipality' => $item['property_address_municipality'],
            'property_address_complementary' => $item['property_address_complementary'],
            'property_address_locality' => $item['property_address_locality'],
            'property_address_zip_code' => $item['property_address_zip_code'],
            'property_address_cadastral_ref' => $item['property_address_cadastral_ref'],
            'property_cadastral_value' => $item['property_cadastral_value'],
            'det_tax_base_i' => $item['det_tax_base_i'],
            'det_tax_base_i_original' => $item['det_tax_base_i_original'],
            'det_full_returns_r' => $item['det_full_returns_r'],
            'det_dividends_applied_ext_r' => $item['det_dividends_applied_ext_r'],
            'det_deductible_expenses_r' => $item['det_deductible_expenses_r'],
            'det_tax_base_r' => $item['det_tax_base_r'],
            'det_tax_base_co_h' => $item['det_tax_base_co_h'],
            'det_taxpayer_participation_fee_h' => $item['det_taxpayer_participation_fee_h'],
            'det_spouse_participation_fee_h' => $item['det_spouse_participation_fee_h'],
            'det_spouse_nif_h' => $item['det_spouse_nif_h'],
            'det_spouse_name_h' => $item['det_spouse_name_h'],
            'det_adquisition_transmission_value_h' => $item['det_adquisition_transmission_value_h'],
            'det_adquisition_value_h' => $item['det_adquisition_value_h'],
            'det_adquisition_diff_h' => $item['det_adquisition_diff_h'],
            'det_adquisition_gain_h' => $item['det_adquisition_gain_h'],
            'det_adquisition2_transmission_value_h' => $item['det_adquisition2_transmission_value_h'],
            'det_adquisition2_value_h' => $item['det_adquisition2_value_h'],
            'det_adquisition2_diff_h' => $item['det_adquisition2_diff_h'],
            'det_adquisition2_gain_h' => $item['det_adquisition2_gain_h'],
            'det_tax_base_h' => $item['det_tax_base_h'],
            'det_adquisition_date_h' => $item['det_adquisition_date_h'],
            'det_adquisition2_date_h' => $item['det_adquisition2_date_h'],
            'det_model_voucher_number_h' => $item['det_model_voucher_number_h'],
            'det_tax_base_g' => $item['det_tax_base_g'],
            'liq_irnr_law' => $item['liq_irnr_law'],
            'liq_convention' => $item['liq_convention'],
            'liq_irnr_law_tax_type' => $item['liq_irnr_law_tax_type'],
            'liq_integral_fee' => $item['liq_integral_fee'],
            'liq_donation_deduction' => $item['liq_donation_deduction'],
            'liq_irnr_law_fee' => $item['liq_irnr_law_fee'],
            'liq_convention_percentage' => $item['liq_convention_percentage'],
            'liq_convention_limit' => $item['liq_convention_limit'],
            'liq_convention_reduction' => $item['liq_convention_reduction'],
            'liq_reduced_integral_fee' => $item['liq_reduced_integral_fee'],
            'liq_retentions_income' => $item['liq_retentions_income'],
            'liq_previous_income_return' => $item['liq_previous_income_return'],
            'liq_result' => $item['liq_result'],
            'aliq_complementary' => $item['aliq_complementary'],
            'aliq_complementary_previous_number' => $item['aliq_complementary_previous_number'],
            'contact_person_name' => $item['contact_person_name'],
            'contact_person_phone1' => $item['contact_person_phone1'],
            'contact_person_phone2' => $item['contact_person_phone2'],
            'contact_person_email' => $item['contact_person_email'],
            'entry_payment_method' => $item['entry_payment_method'],
            'entry_owner_identification' => $item['entry_owner_identification'],
            'entry_owner_name' => $item['entry_owner_name'],
            'entry_owner_iban' => $item['entry_owner_iban'],
            'entry_owner_ue_bic_code' => $item['entry_owner_ue_bic_code'],
            'entry_owner_no_ue_bic_code' => $item['entry_owner_no_ue_bic_code'],
            'entry_owner_no_ue_account_number' => $item['entry_owner_no_ue_account_number'],
            'entry_owner_no_ue_bank_name' => $item['entry_owner_no_ue_bank_name'],
            'entry_owner_no_ue_bank_address' => $item['entry_owner_no_ue_bank_address'],
            'entry_owner_no_ue_bank_city' => $item['entry_owner_no_ue_bank_city'],
            'entry_owner_no_ue_bank_country_code' => $item['entry_owner_no_ue_bank_country_code'],
            'refund_renounce' => $item['refund_renounce'],
            'refund_account_identification' => $item['refund_account_identification'],
            'refund_account_name' => $item['refund_account_name'],
            'refund_account_iban' => $item['refund_account_iban'],
            'refund_account_bic_code' => $item['refund_account_bic_code'],
            'refund_no_ue_bic_code' => $item['refund_no_ue_bic_code'],
            'refund_no_ue_account_number' => $item['refund_no_ue_account_number'],
            'refund_no_ue_bank_name' => $item['refund_no_ue_bank_name'],
            'refund_no_ue_bank_address' => $item['refund_no_ue_bank_address'],
            'refund_no_ue_bank_city' => $item['refund_no_ue_bank_city'],
            'refund_no_ue_country_code' => $item['refund_no_ue_country_code'],
            'created_at' => $item['created_at'],
            'updated_at' => $item['updated_at']
        ];

        if($this->declarant) {
            $client = new ClientTransformer();
            $client->additionalInfo = true;
            $array['declarant'] = $item->declarant ? $client->transform($item->declarant) : null;
        }

        if($this->draft) {
            $array['draft'] = ClientDraftModelTransformer::transformS($item->draft);
        }

        return $array;
    }
}
