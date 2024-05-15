<?php

namespace App\Models\Services;

use Illuminate\Database\Eloquent\Model;
use Waavi\Translation\Models\Language;

class ServiceTrans extends Model
{
    protected $table = 'sv_service_trans';
    protected $connection = 'mysql';
    protected $fillable = [
        'lang_id',
        'name',
        'description',
    ];

    public function lang() {
        return $this->belongsTo(Language::class, 'lang_id', 'id');
    }
}
