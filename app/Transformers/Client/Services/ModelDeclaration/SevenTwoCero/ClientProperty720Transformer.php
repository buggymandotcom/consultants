<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero;

use App\Traits\TransformerTrait;
use App\Transformers\Client\ClientTransformer;
use App\Transformers\Transformer;

class ClientProperty720Transformer extends Transformer
{
    use TransformerTrait;
    public $subkey_type = false;
    public $country_cod = false;
    public $country_address_cod = false;
    public $representative = false;
    public $valoration1 = false;
    public $valoration2 = false;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'declaration_id' => $item['declaration_id'],
            'representative_id' => $item['representative_id'],
            'declarant_condition' => $item['declarant_condition'],
            'declarant_type_ownership' => $item['declarant_type_ownership'],
            'property_key_type' => $item['property_key_type'],
            'property_real_ownership' => $item['property_real_ownership'],
            'country_cod' => $item['country_cod'],
            'identity_key' => $item['identity_key'],
            'identity_values' => $item['identity_values'],
            'identity_key_account' => $item['identity_key_account'],
            'bic_code' => $item['bic_code'],
            'account_code' => $item['account_code'],
            'entity_identity' => $item['entity_identity'],
            'residential_country_nif' => $item['residential_country_nif'],
            'address' => $item['address'],
            'street' => $item['street'],
            'number' => $item['number'],
            'complement' => $item['complement'],
            'city' => $item['city'],
            'address_state' => $item['address_state'],
            'zip_code' => $item['zip_code'],
            'country_address_cod' => $item['country_address_cod'],
            'incorporation_date' => $item['incorporation_date'],
            'origin' => $item['origin'],
            'extinction_date' => $item['extinction_date'],
            'value_representation_key' => $item['value_representation_key'],
            'value_numbers' => $item['value_numbers'],
            'real_state_key_type' => $item['real_state_key_type'],
            'participation' => $item['participation'],
            'created_at' => $item['created_at'],
            'updated_at' => $item['updated_at']
        ];

        if($this->subkey_type) {
            $array['property_subkey_type'] = ClientPropertySubkey720Transformer::transformS($item->subkeyType);
        }

        if($this->country_cod) {
            $array['country_cod'] = ClientPropertyCountryCod720Transformer::transformS($item->countryCod);
        }

        if($this->valoration1) {
            $array['valoration1_id'] = ClientValoration720Transformer::transformS($item->valoration1);
        }

        if($this->valoration2) {
            $array['valoration2_id'] = ClientValoration720Transformer::transformS($item->valoration2);
        }

        if($this->country_address_cod) {
            $array['country_address_cod'] = ClientPropertyCountryCod720Transformer::transformS($item->countryAddressCod);
        }

        if($this->representative) {
            $client = new ClientTransformer();
            $client->additionalInfo = true;
            $array['representative'] = $item->representative ? $client->transformS($item->representative) : null;
        }

        return $array;
    }
}
