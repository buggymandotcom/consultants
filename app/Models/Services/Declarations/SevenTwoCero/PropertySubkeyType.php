<?php

namespace App\Models\Services\Declarations\SevenTwoCero;

use Illuminate\Database\Eloquent\Model;

class PropertySubkeyType extends Model
{
    public $timestamps = false;
    protected $table = 'sv_720_property_subkey_type';
    protected $connection = 'mysql';
    protected $fillable = [
        'id',
        'property_key_type',
        'value',
    ];
}
