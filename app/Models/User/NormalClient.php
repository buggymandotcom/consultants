<?php

namespace App\Models\User;

use App\Models\User\Property\Property;
use Illuminate\Foundation\Auth\User as Authenticatable;

class NormalClient extends Authenticatable
{

    protected $connection = 'sharedb';
    protected  $table = 'clients';

    protected $fillable = [
        'operation_id',
        'firstname',
        'lastname',
        'phone',
        'email',
        'lang_id',
        'password',
        'company_id',
        'source_app',
        'parent_id',
    ];

//    public function properties(){
//        return $this->belongsToMany(Property::class);
//    }
//
//    public function services(){
//        return $this->belongsToMany(Service::class,'sv_service_client')
//            ->withPivot(['value','service_feat','service_id'])
//            ->withTimestamps();
//        //->using(ServiceFeature::class);
//        //->wherePivot('service_feat','=',null);
//    }
}
