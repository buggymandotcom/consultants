<?php

namespace App\Models\User\Property;

use Illuminate\Database\Eloquent\Model;

class AcquirerOperation extends Model
{
    protected $connection = 'sharedb';
    protected  $table = 'opt_acquirer_prop';

    protected $fillable = [
        'id',
        'property_id',
        'operation_id',
        'client_id',
        'percent',
        'created_at',
        'updated_at',
    ];

    /* Propiedad vinculada */
    public function property(){
        return $this->belongsTo(Property::class,'property_id');
    }
}
