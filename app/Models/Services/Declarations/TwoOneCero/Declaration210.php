<?php

namespace App\Models\Services\Declarations\TwoOneCero;

use App\Models\Services\Declarations\City;
use App\Models\Services\Declarations\Declaration;
use App\Models\Services\Declarations\Region;
use App\Models\Services\Declarations\SevenTwoCero\CountryCode;

class Declaration210 extends Declaration
{
    protected $table = 'sv_declaration_210';
    protected $connection = 'mysql';
    protected $fillable = [
        'declaration_type',
        'declarant_id',
        'draft_id',
        'declarant_nif',
        'declarant_name',
        'declarant_condition_isRepresentative',
        'declarant_condition_payer',
        'declarant_condition_holder',
        'declarant_condition_manager',
        'declarant_condition_keeper',
        'earn_agrupation',
        'earn_period',
        'earn_period_year',
        'earn_period_date',
        'rent_type',
        'rent_key_badge',
        'contributor_nif',
        'contributor_fj',
        'contributor_name',
        'contributor_residential_nif',
        'contributor_born_date',
        'contributor_born_locality',
        'contributor_country_cod',
        'contributor_fiscal_residential',
        'contributor_address',
        'contributor_complementary_address',
        'contributor_locality',
        'contributor_email',
        'contributor_zip_code',
        'contributor_state',
        'contributor_country',
        'contributor_phone',
        'contributor_mobile_phone',
        'contributor_fax',
        'agent_nif',
        'agent_fj',
        'agent_name',
        'agent_represent',
        'agent_road_type',
        'agent_address',
        'agent_numeration_type',
        'agent_address_number',
        'agent_address_qualifier_number',
        'agent_address_block',
        'agent_address_portal',
        'agent_address_stairs',
        'agent_address_floor',
        'agent_address_door',
        'agent_address_complementary',
        'agent_address_locality',
        'agent_address_city',
        'agent_address_state',
        'agent_address_municipality',
        'agent_address_zip_code',
        'agent_phone',
        'agent_mobile_phone',
        'agent_fax',
        'payer_nif',
        'payer_fj',
        'payer_name',
        'property_address_road_type',
        'property_address_road_name',
        'property_address_numeration_type',
        'property_address_number',
        'property_address_qualifier_number',
        'property_address_block',
        'property_address_portal',
        'property_address_stairs',
        'property_address_floor',
        'property_address_door',
        'property_address_complementary',
        'property_address_locality',
        'property_address_state',
        'property_address_municipality',
        'property_address_zip_code',
        'property_address_cadastral_ref',
        'property_cadastral_value',
        'det_tax_base_i',
        'det_tax_base_i_original',
        'det_full_returns_r',
        'det_dividends_applied_ext_r',
        'det_deductible_expenses_r',
        'det_tax_base_r',
        'det_tax_base_co_h',
        'det_taxpayer_participation_fee_h',
        'det_spouse_participation_fee_h',
        'det_spouse_nif_h',
        'det_spouse_name_h',
        'det_adquisition_transmission_value_h',
        'det_adquisition_value_h',
        'det_adquisition_diff_h',
        'det_adquisition_gain_h',
        'det_adquisition2_transmission_value_h',
        'det_adquisition2_value_h',
        'det_adquisition2_diff_h',
        'det_adquisition2_gain_h',
        'det_tax_base_h',
        'det_adquisition_date_h',
        'det_adquisition2_date_h',
        'det_model_voucher_number_h',
        'det_tax_base_g',
        'liq_irnr_law',
        'liq_convention',
        'liq_irnr_law_tax_type',
        'liq_integral_fee',
        'liq_donation_deduction',
        'liq_irnr_law_fee',
        'liq_convention_percentage',
        'liq_convention_limit',
        'liq_convention_reduction',
        'liq_reduced_integral_fee',
        'liq_retentions_income',
        'liq_previous_income_return',
        'liq_result',
        'aliq_complementary',
        'aliq_complementary_previous_number',
        'contact_person_name',
        'contact_person_phone1',
        'contact_person_phone2',
        'contact_person_email',
        'entry_payment_method',
        'entry_owner_identification',
        'entry_owner_name',
        'entry_owner_iban',
        'entry_owner_ue_bic_code',
        'entry_owner_no_ue_bic_code',
        'entry_owner_no_ue_account_number',
        'entry_owner_no_ue_bank_name',
        'entry_owner_no_ue_bank_address',
        'entry_owner_no_ue_bank_city',
        'entry_owner_no_ue_bank_country_code',
        'refund_renounce',
        'refund_account_identification',
        'refund_account_name',
        'refund_account_iban',
        'refund_account_bic_code',
        'refund_no_ue_bic_code',
        'refund_no_ue_account_number',
        'refund_no_ue_bank_name',
        'refund_no_ue_bank_address',
        'refund_no_ue_bank_city',
        'refund_no_ue_country_code',
    ];

    protected $dates = [
        'earn_period_date',
        'contributor_born_date',
        'det_adquisition_date_h',
        'det_adquisition2_date_h',
    ];
}
