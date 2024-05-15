<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\Accounting;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class ClientAccountingConfTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {


        return[
            'provider' => isset($item['provider'])?$item['provider']:null,
            'config' => $item->config
        ];
    }
}