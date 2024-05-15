<?php

namespace App\Models\Foundations\Logs;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;


class LogDB extends Model
{
    protected $table = 'logs';
    protected $connection = 'mysql';
    protected $fillable = [
        'type',
        'code',
        'message',
        'object',
        'object_id',
        'client_id',
        'extra_data',
    ];
    protected $casts = ['extra_data'=>'array'];


    public static function fromLogModel(LogModel $logModel):LogDB{
        $d=prepareToEloquent(get_object_vars($logModel),new LogDB())->toArray();
        return self::create($d);
    }

}
