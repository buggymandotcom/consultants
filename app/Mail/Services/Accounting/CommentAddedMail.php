<?php

namespace App\Mail\Services\Accounting;

use App\Models\Services\Accounting\AccountingUpload;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CommentAddedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $acctUpload;
    public function __construct(AccountingUpload $acctUpload){
        $this->acctUpload=$acctUpload;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Invoice #'.$this->acctUpload->id.' : New comment added -'.$this->acctUpload->client->fullname)
            ->markdown('emails.services.accounting.comment-added');
    }
}
