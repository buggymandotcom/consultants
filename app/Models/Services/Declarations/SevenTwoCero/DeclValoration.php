<?php

namespace App\Models\Services\Declarations\SevenTwoCero;

use Illuminate\Database\Eloquent\Model;

class DeclValoration extends Model
{
    protected $table = 'sv_valoration';
    protected $connection = 'mysql';
    protected $fillable = [
        'id',
        'sign',
        'value',
        'decimal',
    ];
}
