<?php

namespace App\Models\Services\TaxModels;

use App\Models\Services\Declarations\Declaration;
use App\Models\Services\TaxModels\Types\ModelSevenTwoZero;
use App\Models\User\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaxModelDraft extends Model
{
    use SoftDeletes;
    protected $table = 'sv_models_drafts';
    protected $connection = 'mysql';
    protected $fillable = [
        'client_id',
        'model_id',
        'year',
        'state'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    const DECLARATION_CLASS = Declaration::class;

    public function client (){
        return $this->belongsTo(Client::class);
    }

    public function model() {
        return $this->belongsTo(TaxModel::class, 'model_id', 'id');
    }

    /*
     * Devuelve el modelo convertido a su clase específica si está bien configurado por ID en config/taxreturns.php
     * */
    public function modelT() {
        if(isset(config('taxreturns.MODEL_TYPES')[$this->model_id])) {
            return $this->belongsTo(config('taxreturns.MODEL_TYPES')[$this->model_id], 'model_id', 'id');
        }
        return null;
    }

    /*
     * Devuelve la declaración en su declaración específica
     * */
    public function declaration() {
        return $this->hasOne($this->modelT ? config('taxreturns.MODEL_TYPES')[$this->model_id]::DECLARATION_CLASS : Declaration::class, 'draft_id', 'id');
    }

    public function scopeOrder($q, $order) {
        $order = explode(',', $order);
        if(sizeof($order) == 2) {
            $relatedColumn = explode('.',$order[0]);
            if(sizeof($relatedColumn) == 2) {
//                https://zaengle.com/blog/sorting-parent-models-by-a-child-relationship
                $q->with($relatedColumn[0])->select($this->table.'.*', DB::raw('(SELECT '.$relatedColumn[1].' FROM '.$relatedColumn[0].' WHERE '.$this->table.'.upload_id = '.$relatedColumn[0].'.id) as sort'))->orderBy('sort',$order[1]);
            } else {
                return $q->orderBy($order[0], $order[1]);
            }
        }
        return $q;
    }
}
