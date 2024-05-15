<?php

namespace App\Traits\TaxReturns;


use App\Models\Services\TaxModels\TaxModelDraft;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasTaxReturnDeclaration
{
    public abstract function declaration(): HasOne;
}