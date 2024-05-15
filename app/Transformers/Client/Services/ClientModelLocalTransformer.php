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

class ClientModelLocalTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'model_id' => $item['model_id'],
            'lang_id' => $item['lang_id'],
            'name' => $item['name'],
            'description' => $item['description'],
            'locale' => $item->lang->locale
        ];
    }
}
