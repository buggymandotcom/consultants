<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client\Billing;


use App\Models\User\User;
use App\Traits\TransformerTrait;
use App\Transformers\Client\BasicUserTransformer;
use App\Transformers\Operation\DocumentTransformer;
use App\Transformers\Transformer;

class BillingPeriodTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        return[
            'id' =>  $item->id,
            'start_at' => $item->start_at,
            'end_at' => $item->end_at,
            'client_id' => $item->client_id,
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