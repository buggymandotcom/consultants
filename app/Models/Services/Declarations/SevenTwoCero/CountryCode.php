<?php

namespace App\Models\Services\Declarations\SevenTwoCero;

use Illuminate\Database\Eloquent\Model;

class CountryCode extends Model
{
    public $timestamps = false;
    protected $table = 'sv_iso_country_cod';
    protected $connection = 'mysql';
    protected $fillable = [
        'id',
        'cod',
        'value',
    ];
}
