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

class ClientCompanyIssueTransformer extends Transformer
{
    use TransformerTrait;

    public $messages = false;
    public $lastMessage = false;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'client_id' => $item['client_id'],
            'company_id' => $item['company_id'],
            'sender' => $item['sender'],
            'subject' => $item['subject'],
            'status' => $item['status'],
            'unreadCount' => $item->unreadMessages()->count(),
            'created_at' => $item['created_at'],
            'updated_at' => $item['updated_at'],
        ];

        if ($this->messages && $item->messages) {
            $array['messages'] = ClientCompanyMessageTransformer::transformCollectionS($item->messages);
            foreach($item->messages as $m) {
                $m->update(['read' => 1]);
            }
        }

        if ($this->lastMessage) {
            $message = $item->messages()->orderBy('id', 'desc')->first();
            $array['lastMessage'] = $message ? ClientCompanyMessageTransformer::transformS($message) : null;
        }

        return $array;
    }
}
