<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Communications\ClientCompany;

use App\Models\User\Client;
use App\Models\User\Company;
use App\Models\User\Employee;
use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class CommunicationMessageSenderTransformer extends Transformer
{
    use TransformerTrait;

    public $messages = false;
    public $lastMessage = false;

    public function transform($item)
    {
        if($item instanceof Client) {
            return [
                'id' => $item['id'],
                'name' => $item['firstname'] . ' ' . $item['lastname']
            ];
        } elseif($item instanceof Company) {
            return [
                'id' => $item['id'],
                'name' => $item['name']
            ];
        } elseif($item instanceof Employee) {
            return [
                'id' => $item['id'],
                'name' => $item['firstname'] . ' ' . $item['lastname']
            ];
        }
        return [];
    }
}
