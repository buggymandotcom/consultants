<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Foundations;


use App\Models\User\User;
use App\Traits\TransformerTrait;
use App\Transformers\Client\BasicUserTransformer;
use App\Transformers\Operation\DocumentTransformer;
use App\Transformers\Transformer;

class UploadTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'id' =>  $item->id,
            'mime' => $item->mime,
            //'doc_type' => DocumentTransformer::transformS($item->type),
            'extension' => $item->extension,
            'original_name' => $item->original_name,
            'size' =>(int) $item->size,
            'url' => $item->url,
//            'info' => $this->_pivot($item)
        ];

    }

//    private function _pivot($item){
//        if(!$item->pivot){
//            return null;
//        }else{
//            return [
//                'pivot_id' => $item->pivot->id,
//                'status' => $item->pivot->status,
//                'comment' => $item->pivot->comment,
//                'uploaded_by' =>$item->pivot->uploaded_by ? BasicUserTransformer::transformS(User::findOrFail($item->pivot->uploaded_by)):null,
//                'updated_by' => $item->pivot->updated_by ? BasicUserTransformer::transformS(User::findOrFail($item->pivot->updated_by)):null,
//                'created_at' => $item->pivot->created_at,
//                'updated_at' => $item->pivot->updated_at,
//            ];
//        }
//    }
}