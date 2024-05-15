<?php

namespace App\Models\Services;

use Illuminate\Database\Eloquent\Model;

class ServiceFeature extends Model
{
    protected $table = 'sv_features';
    protected $connection = 'mysql';
    protected $fillable = [
        'name',
        'type',
        'icon',
        'icon_type'
    ];
}
