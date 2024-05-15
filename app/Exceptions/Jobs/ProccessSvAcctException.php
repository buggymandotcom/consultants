<?php

namespace App\Exceptions\Jobs;

use App\Models\Services\Accounting\AccountingUpload;
use Exception;
use Throwable;

class ProccessSvAcctException extends Exception{

    private $upload;

    public function __construct($message = "", $code = 0, AccountingUpload $upload = null, Throwable $previous = null)
    {
        $this->upload=$upload;
        parent::__construct($message, $code, $previous);
    }

    public function report()
    {

        //\Log::debug($this->getMessage());
    }
}