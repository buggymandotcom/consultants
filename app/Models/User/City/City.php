<?php

namespace App\Models\User\City;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
//    use HasMultiAuthApiTokens,Notifiable,SoftDeletes,Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $connection = 'sharedb';
    protected  $table = 'cities';

    protected $fillable = [
        'id',
        'country_code',
        'region_id',
        'name',
    ];
}
