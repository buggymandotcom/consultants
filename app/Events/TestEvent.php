<?php

namespace App\Events;

use App\Contracts\Foundations\LogDBGenericContract;
use App\Models\Foundations\Logs\LogDB;
use App\Models\Foundations\Logs\LogModel;
use App\Models\Services\Accounting\AccountingUpload;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TestEvent implements LogDBGenericContract
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }

    public function getLogDB(): LogModel{
        $l = LogModel::info(23,'se produjo un error',3,AccountingUpload::class,342,['array'=>'test']);
        return $l;

    }

}
