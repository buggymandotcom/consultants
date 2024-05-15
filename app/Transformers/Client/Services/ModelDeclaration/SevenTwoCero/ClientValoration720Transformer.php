<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class ClientValoration720Transformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'sign' => $item['sign'],
            'value' => $item['value'],
            'decimal' => $item['decimal'],
        ];

        return $array;
    }
}
