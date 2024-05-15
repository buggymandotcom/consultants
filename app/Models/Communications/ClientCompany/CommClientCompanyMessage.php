<?php

namespace App\Models\Communications\ClientCompany;

use App\Exceptions\Communications\InvalidMessageSenderException;
use App\Models\Communications\ClientCompany\CommClientCompanyIssue;
use App\Models\User\Client;
use App\Models\User\Company;
use Illuminate\Database\Eloquent\Model;

class CommClientCompanyMessage extends Model
{
    protected $table = 'comm_clicom_messages';
    protected $connection = 'mysql';

    protected $fillable = [
        'client_id',
        'company_id',
        'issue_id',
        'sender',
        'message',
        'read',
    ];

    public function issue() {
        return $this->belongsTo(CommClientCompanyIssue::class, 'issue_id', 'id');
    }

    /*
     * @throws InvalidMessageSenderException
     * @return BelongsToMany
     * */
    public function senderModel() {
        if($this->sender === 'client') {
            return $this->belongsTo(Client::class, 'client_id', 'id');
        } elseif ($this->sender === 'company') {
            return $this->belongsTo(Company::class, 'company_id', 'id');
        }
        throw new InvalidMessageSenderException('Invalid message sender: ' . $this->sender);
    }
}
