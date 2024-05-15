<?php
namespace  App\Contracts\Foundations;
use App\Models\Foundations\Logs\LogModel;

interface LogDBGenericContract

{
    public function getLogDB():LogModel;

}
