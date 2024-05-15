<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Auth;


use App\Traits\TransformerTrait;
use App\Transformers\Client\ClientInfoTransformer;
use App\Transformers\Client\RoleTransformer;
use App\Transformers\Transformer;

class ClientProfileTransformer extends Transformer
{
    use TransformerTrait;

    public $additionalInfo = false;

    public function transform($item)
    {
        $array = [
            'id' => $item->id,
            'firstname' => $item->firstname,
            'lastname' => $item->lastname,
            'phone' => $item->phone,
            'email' => $item->email,
//            'roles' => $item->roles ? RoleTransformer::transformCollectionS($item->roles):[],
        ];

        if($this->additionalInfo && $item->additionalInfo) {
            $array["additionalInfo"] = ClientInfoTransformer::transformS($item->additionalInfo);
        }

        return $array;
    }

    public function getSubscriptions($item) {
        $s = [];
        if($sv=$item->services){
            return $sv->map(function ($service){
               return ['name'=>$service->name,'subscribed'=>true];
            })->toArray();
        }return $s;
    }
}
