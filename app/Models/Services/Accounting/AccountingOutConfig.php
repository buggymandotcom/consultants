<?php

namespace App\Models\Services\Accounting;

use Illuminate\Database\Eloquent\Model;

class AccountingOutConfig extends Model
{
    protected $table = 'sv_acct_out_conf';
    protected $connection = 'mysql';

    protected $casts = [
        'config' => 'array',
     ];

    protected $fillable = ['provider','config'];
}
