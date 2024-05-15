<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Foundations;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class TransTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'key' =>  $item->group.'.'.$item->item,
            'text' => replaceParamsTrans($item->text),
            'lang' => $item->locale,
            'id' => $item->id
        ];
    }
}