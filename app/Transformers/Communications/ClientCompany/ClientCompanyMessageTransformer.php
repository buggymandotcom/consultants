<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Communications\ClientCompany;

use App\Traits\TransformerTrait;
use App\Transformers\Transformer;

class ClientCompanyMessageTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'client_id' => $item['client_id'],
            'company_id' => $item['company_id'],
            'issue_id' => $item['issue_id'],
            'senderType' => $item['sender'],
            'message' => $item['message'],
            'sender' => CommunicationMessageSenderTransformer::transformS($item->senderModel),
            'created_at' => $item['created_at'],
        ];

        return $array;
    }
}
