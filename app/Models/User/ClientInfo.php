<?php

namespace App\Models\User;

use App\Models\User\City\City;
use Illuminate\Database\Eloquent\Model;

class ClientInfo extends Model
{
    protected $connection = 'sharedb';
    protected  $table = 'client_info';

    protected $fillable = [
        'id',
        'client_id',
        'nacionality',
        'resident',
        'residence_address',
        'identification',
        'passport',
        'postal_code',
        'iban',
        'bank',
        'birth_date',
        'death_date',
        'ocupation',
        'municipality_id',
        'civil_status',
        'regime',
        'mother_name',
        'father_name'
    ];

    protected $dates = [
        'birth_date',
        'death_date',
        'created_at',
        'updated_at',
    ];

    /* Devuelve la información de la ciudad */
    public function city(){
        return $this->belongsTo(City::class,'municipality_id');
    }
}
