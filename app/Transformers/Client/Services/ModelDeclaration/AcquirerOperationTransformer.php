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

class AcquirerOperationTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'property_id' => $item['property_id'],
            'operation_id' => $item['operation_id'],
            'client_id' => $item['client_id'],
            'percent' => $item['percent'],
            'created_at' => $item['created_at'],
            'updated_at' => $item['updated_at'],
        ];

        $array['property'] = $item->city ? PropertyTransformer::transformS($item->property) : [];

        return $array;
    }
}
