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

class ClientTransformer extends Transformer
{
    use TransformerTrait;

    public $additionalInfo = false;

    public function __construct($additionalInfo = false)
    {
        $this->additionalInfo = $additionalInfo;
    }

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'firstname' => $item['firstname'],
            'lastname' => $item['lastname'],
            'phone' => $item['phone'],
            'email' => $item['email'],
            'lang' => $item['lang'] ? $item->lang->locale : app()->getLocale(),
            'hired_services_count' => $item->services->count()
        ];

        if ($this->additionalInfo) {
            $array['additionalInfo'] = $item->additionalInfo ? ClientInfoTransformer::transformS($item->additionalInfo) : [];
        }

        return $array;
    }
}
