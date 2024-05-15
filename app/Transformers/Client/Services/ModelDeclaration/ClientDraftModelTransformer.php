<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Services\ModelDeclaration;

use App\Traits\TransformerTrait;
use App\Transformers\Client\Services\ModelDeclaration\TwoOneCero\ClientDeclaration210Transformer;
use App\Transformers\Transformer;

class ClientDraftModelTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'client_id' => $item['client_id'],
            'model_id' => $item['model_id'],
            'year' => $item['year'],
            'state' => $item['state'],
            'created_at' => $item->created_at,
            'updated_at' => $item->updated_at,
            'deleted_at' => $item->deleted_at
        ];

        $array['model'] = ClientModelTransformer::transformS($item->model);
        $array['declaration'] = ClientDeclaration210Transformer::transformS($item->declaration);

        return $array;
    }
}
