<?php

namespace App\Models\User;

use App\Exceptions\Communications\InvalidMessageSenderException;
use App\Models\Communications\ClientCompany\CommClientCompanyIssue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

//    public const GUARD = 'companies';
    protected $connection = 'sharedb';
    protected $table = 'company';

    protected $fillable = [
        'name',
        'info',
    ];

    public function clientIssues() {
        return $this->hasMany(CommClientCompanyIssue::class, 'company_id', 'id');
    }

    public function helpIssues() {
//        TODO Incidencias con employee
//        return $this->hasMany(CommClientEmployeeIssue::class, 'company_id', 'id');
    }
}
