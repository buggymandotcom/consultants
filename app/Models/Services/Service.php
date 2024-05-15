<?php

namespace App\Models\Services;

use App\Models\User\Client;
use App\Traits\TransTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    use TransTrait;

    protected $table = 'sv_services';
    protected $connection = 'mysql';
    protected $fillable = ['name','color','route'];


    public function trans() {
        return $this->hasMany(ServiceTrans::class, 'service_id', 'id');
    }
}
