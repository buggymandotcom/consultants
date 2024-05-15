<?php

namespace App\Listeners\Foundations;



use App\Contracts\Foundations\LogDBGenericContract;
use App\Models\Foundations\Logs\LogDB;

class LogDBGeneric
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(LogDBGenericContract $event)
    {
        $logModel=$event->getLogDB();
        $db = LogDB::fromLogModel($logModel);

    }
}
