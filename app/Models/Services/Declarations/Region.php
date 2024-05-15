<?php

namespace App\Models\Services\Declarations;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $connection = 'sharedb';
    protected  $table = 'regions';

    protected $fillable = [
        'id',
        'country_code',
        'name',
    ];
}
