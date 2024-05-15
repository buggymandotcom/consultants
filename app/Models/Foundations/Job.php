<?php

namespace App\Models\Foundations;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Job extends Model
{
    protected $table = 'jobs';
    protected $connection = 'mysql';
    protected $casts = [
        'payload' => 'array',
    ];




}
