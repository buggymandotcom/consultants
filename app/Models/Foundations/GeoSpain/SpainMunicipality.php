<?php

namespace App\Models\Foundations\GeoSpain;

use Illuminate\Database\Eloquent\Model;

class SpainMunicipality extends Model
{
    protected $table = 'es_municipalities';
    protected $fillable = [
        'id',
        'name',
        'code',
        'province_id'
    ];

    public function province() {
        return $this->belongsTo(SpainProvince::class, 'province_id', 'id');
    }
}
