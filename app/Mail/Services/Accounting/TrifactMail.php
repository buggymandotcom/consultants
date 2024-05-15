<?php

namespace App\Mail\Services\Accounting;

use App\Exceptions\Jobs\ProccessSvAcctException;
use App\Models\Services\Accounting\AccountingUpload;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TrifactMail extends Mailable
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
        $filename = $this->accountingUpload->client_id.'_'.$this->accountingUpload->id.'.'.$u->extension;
        $subject = null;
        if($this->accountingUpload->invoice_type=='purchase'){
            $subject = 'inkoop';
        }elseif ($this->accountingUpload->invoice_type=='sale'){
            $subject = 'verkoop';
        }else{
            throw new ProccessSvAcctException('El tipo de la subida no es correcto');
        }

        return $this->markdown('emails.services.accounting')->subject($subject)
            ->attachFromStorageDisk($u->repository,$u->path,$filename);
    }
}
