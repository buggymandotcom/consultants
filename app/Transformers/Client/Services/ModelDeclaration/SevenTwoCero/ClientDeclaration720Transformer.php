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
use App\Transformers\Client\Services\ModelDeclaration\ClientDraftModelTransformer;
use App\Transformers\Transformer;

class ClientDeclaration720Transformer extends Transformer
{
    use TransformerTrait;
    public $declarant = false;
    public $draft = false;
    public $properties = false;
    public $valoration1 = false;
    public $valoration2 = false;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'declarant_id' => $item['declarant_id'],
            'draft_id' => $item['draft_id'],
            'person_contact_name' => $item['person_contact_name'],
            'person_contact_phone' => $item['person_contact_phone'],
            'declaration_number' => $item['declaration_number'],
            'complementary_declaration' => $item['complementary_declaration'],
            'substitutive_declaration' => $item['substitutive_declaration'],
            'declaration_parent_number' => $item['declaration_parent_number'],
            'valoration1_id' => $item['valoration1_id'],
            'valoration2_id' => $item['valoration2_id'],
            'created_at' => $item['created_at'],
            'updated_at' => $item['updated_at'],
            'deleted_at' => $item['deleted_at']
        ];

        if($this->declarant) {
            $client = new ClientTransformer();
            $client->additionalInfo = true;
            $array['declarant'] = $item->declarant ? $client->transform($item->declarant) : null;
        }

        if($this->draft) {
            $array['draft'] = ClientDraftModelTransformer::transformS($item->draft);
        }

        if($this->properties) {

            $props = new ClientProperty720Transformer();
            $props->representative = true;
            $props->subkey_type = true;
            $props->country_cod = true;
            $props->valoration1 = true;
            $props->valoration2 = true;
            $array['properties'] = $item->properties ? $props->transformCollection($item->properties) : null;

        }

        if($this->valoration1) {
            $array['valoration1_id'] = ClientValoration720Transformer::transformS($item->valoration1);
        }

        if($this->valoration2) {
            $array['valoration2_id'] = ClientValoration720Transformer::transformS($item->valoration2);
        }

        return $array;
    }
}
