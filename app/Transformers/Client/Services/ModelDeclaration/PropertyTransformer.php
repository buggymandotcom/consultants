<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class PropertyTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'parent_id'=> $item['parent_id'],
            'parent_property_id'=> $item['parent_property_id'],
            'extra_prop_type'=> $item['extra_prop_type'],
            'address'=> $item['address'],
            'postal_code'=> $item['postal_code'],
            'municipality_id'=> $item['municipality_id'],
            'latitude'=> $item['latitude'],
            'longitude'=> $item['longitude'],
            'acquisition_value'=> $item['acquisition_value'],
            'acquisition_date'=> $item['acquisition_date'],
            'r_cadastral_reference'=> $item['r_cadastral_reference'],
            'r_val_cadastral_floor'=> $item['r_val_cadastral_floor'],
            'r_val_cadastral_construction'=> $item['r_val_cadastral_construction'],
            'created_at'=> $item['created_at'],
            'updated_at'=> $item['updated_at']
        ];

        $array['city'] = $item->city ? CityTransformer::transformS($item->city) : [];

        return $array;
    }
}
