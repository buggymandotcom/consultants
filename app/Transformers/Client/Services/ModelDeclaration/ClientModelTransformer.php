<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration;

use App\Traits\TransformerTrait;
use App\Transformers\Client\Services\ClientModelLocalTransformer;
use App\Transformers\Transformer;

class ClientModelTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'id' => $item['id'],
            'name' => $item['name'],
            'color' => $item['color'],
            'route' => $item['route'],
            'translations' => ClientModelLocalTransformer::transformCollectionS($item->trans),
            'created_at' => $item->created_at
        ];
    }
}
