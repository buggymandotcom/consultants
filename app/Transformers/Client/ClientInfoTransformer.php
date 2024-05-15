<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 10/04/2017
 * Time: 10:46
 */

namespace App\Transformers\Client;

use App\Traits\TransformerTrait;
use App\Transformers\Client\Services\ModelDeclaration\CityTransformer;
use App\Transformers\Transformer;

class ClientInfoTransformer extends Transformer
{
    use TransformerTrait;

    public function transform($item)
    {
        $array = [
            'id' => $item['id'],
            'client_id' => $item['client_id'],
            'nationality' => $item['nationality'],
            'identification' => $item['identification'],
            'resident' => $item['resident'],
            'residence_address' => $item['residence_address'],
            'passport' => $item['passport'],
            'postal_code' => $item['postal_code'],
            'iban' => $item['iban'],
            'bank' => $item['bank'],
            'birth_date' => $item->birth_date,
            'death_date' => $item['death_date'],
            'ocupation' => $item['ocupation'],
            'municipality_id' => $item['municipality_id'],
            'civil_status' => $item['civil_status'],
            'mother_name' => $item['mother_name'],
            'father_name' => $item['father_name'],
            'regime' => $item['regime']
        ];

        $array['city'] = $item->city ? CityTransformer::transformS($item->city) : [];

        return $array;

    }
}
