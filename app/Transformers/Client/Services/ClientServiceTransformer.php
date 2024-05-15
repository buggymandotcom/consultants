<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;
use Illuminate\Support\Facades\Auth;

class ClientServiceTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'name' => $item['name'],
            'color' => $item['color'],
            'route' => $item['route'],
            'translations' => ClientServiceLocalTransformer::transformCollectionS($item->trans),
            'created_at' => $item->created_at
        ];

        return $array;
    }
}
