<?php

namespace App\Models\Services;

use Illuminate\Database\Eloquent\Model;

class ServiceFeatTrans extends Model
{
    protected $table = 'sv_feature_trans';
    protected $connection = 'mysql';
    protected $fillable = [
        'lang_id',
        'name',
    ];
}
