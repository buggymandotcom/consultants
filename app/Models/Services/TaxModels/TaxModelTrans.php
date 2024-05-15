<?php

namespace App\Models\Services\TaxModels;

use Illuminate\Database\Eloquent\Model;
use Waavi\Translation\Models\Language;

class TaxModelTrans extends Model
{
    protected $table = 'sv_models_trans';
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
