<?php

namespace App\Models\Foundations\GeoSpain;

use Illuminate\Database\Eloquent\Model;

class SpainProvince extends Model
{
    protected $table = 'es_provinces';
    protected $fillable = [
        'id',
        'name',
        'code'
    ];

    public function municipalities() {
        return $this->hasMany(SpainMunicipality::class, 'province_id', 'id');
    }

    public static function findByMunicipalityCode($code) {
//        Aceptamos el código o sin dígito de control
        if(strlen($code) === 5 || strlen($code) === 6) {
            return self::where('code', substr($code, 0, 2))->first();
        }
        return false;
    }
}
