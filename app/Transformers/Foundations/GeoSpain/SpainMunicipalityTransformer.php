<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Foundations\GeoSpain;


use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class SpainMunicipalityTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'id' => $item->id,
            'name' => $item->name,
            'code' => $item->code,
            'province_id' => $item->province_id,
        ];
    }
}