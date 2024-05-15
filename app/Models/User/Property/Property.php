<?php

namespace App\Models\User\Property;

use App\Models\User\City\City;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $connection = 'sharedb';
    protected  $table = 'property';

    protected $fillable = [
        'id',
        'parent_id',
        'parent_property_id',
        'extra_prop_type',
        'address',
        'postal_code',
        'municipality_id',
        'latitude',
        'longitude',
        'acquisition_value',
        'acquisition_date',
        'r_cadastral_reference',
        'r_val_cadastral_floor',
        'r_val_cadastral_construction',
        'created_at',
        'updated_at',
    ];

    /* Devuelve la información de la ciudad */
    public function city(){
        return $this->belongsTo(City::class,'municipality_id');
    }

}
