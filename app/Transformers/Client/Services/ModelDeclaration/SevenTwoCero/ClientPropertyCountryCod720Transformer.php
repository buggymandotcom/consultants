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

class ClientPropertyCountryCod720Transformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'cod' => $item['cod'],
            'value' => $item['value'],
        ];

        return $array;
    }
}
