<?php

namespace App\Models\Services\Declarations;

use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\User\Client;
use Illuminate\Database\Eloquent\Model;

class Declaration extends Model
{
    public function declarant(){
        return $this->belongsTo(Client::class,'declarant_id');
    }

    public function draft(){
        return $this->belongsTo(TaxModelDraft::class,'draft_id');
    }
}
