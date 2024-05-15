<?php

namespace App\Models\Services\TaxModels;

use Illuminate\Database\Eloquent\Model;

class TaxModel extends Model
{
    protected $table = 'sv_models';
    protected $connection = 'mysql';
    protected $fillable = ['name','color','route'];


    public function trans() {
        return $this->hasMany(TaxModelTrans::class, 'model_id', 'id');
    }

    public function drafts() {
        return $this->hasMany(TaxModelDraft::class, 'model_id', 'id');
    }

    public static function modelTypeById($id) {
        return isset(config('taxreturns.MODEL_TYPES')[$id]) ? config('taxreturns.MODEL_TYPES')[$id] : null;
    }
}
