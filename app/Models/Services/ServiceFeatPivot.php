<?php

namespace App\Models\Services;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ServiceFeatPivot extends Pivot
{
    protected $table = 'sv_serviceclient_feat';
    protected $connection = 'mysql';
}
