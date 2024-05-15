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

class CityTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'id' => $item['id'],
            'country_code' => $item['country_code'],
            'region_id' => $item['region_id'],
            'name' => $item['name'],
        ];
    }
}
