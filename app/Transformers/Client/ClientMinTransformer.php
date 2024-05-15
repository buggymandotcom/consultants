<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class ClientMinTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'firstname' => $item['firstname'],
            'lastname' => $item['lastname'],
        ];

        return $array;
    }
}
