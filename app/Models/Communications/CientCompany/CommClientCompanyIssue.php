<?php

namespace App\Models\Communications\ClientCompany;

use App\Exceptions\Communications\InvalidMessageSenderException;
use App\Models\Communications\ClientCompany\CommClientCompanyMessage;
use App\Models\User\Client;
use App\Models\User\Company;
use Illuminate\Database\Eloquent\Model;

class CommClientCompanyIssue extends Model
{
//    use Eloquence
    
    protected $table = 'comm_clicom_issues';
    protected $connection = 'mysql';

    protected $fillable = [
        'client_id',
        'company_id',
        'subject',
        'status',
    ];

    public function messages() {
        return $this->hasMany(CommClientCompanyMessage::class, 'issue_id', 'id');
    }

    public function unreadMessages() {
        return $this->messages()->where('read', 0);
    }
}
