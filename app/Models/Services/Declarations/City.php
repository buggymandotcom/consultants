<?php

namespace App\Models\Services\Declarations;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $connection = 'sharedb';
    protected  $table = 'cities';

    protected $fillable = [
        'id',
        'country_code',
        'region_id',
        'name',
    ];
}
