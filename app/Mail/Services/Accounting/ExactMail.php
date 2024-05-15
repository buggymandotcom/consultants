<?php

namespace App\Mail\Services\Accounting;

use App\Exceptions\Jobs\ProccessSvAcctException;
use App\Models\Services\Accounting\AccountingUpload;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExactMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $accountingUpload;

    public function __construct(AccountingUpload $accountingUpload)
    {
        $this->accountingUpload=$accountingUpload;
    }

    public function build()
    {
        $u = $this->accountingUpload->upload;
        $filename = $this->accountingUpload->client_id.'_'.$u->id.'.'.$u->extension;

        return $this->markdown('emails.services.accounting')
            ->attachFromStorageDisk($u->repository,$u->path,$filename);
    }
}
