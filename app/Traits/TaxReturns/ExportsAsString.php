<?php

namespace App\Traits\TaxReturns;


use App\Models\Services\TaxModels\TaxModelDraft;

trait ExportsAsString
{
    public abstract static function buildStringS(TaxModelDraft $draft);
    public abstract function buildString(TaxModelDraft $draft);
}