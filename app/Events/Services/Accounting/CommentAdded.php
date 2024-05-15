<?php

namespace App\Events\Services\Accounting;

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

class CommentAdded implements LogDBGenericContract
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $acctUpload;

    public function __construct(AccountingUpload $acctUpload)
    {
        $this->acctUpload=$acctUpload;
    }

    public function getLogDB(): LogModel{
        return LogModel::info('sv_acct.client.upload_comment_added',
            'Se ha añadido un comentario a una factura/subida',
            $this->acctUpload->client->id,
            get_class($this->acctUpload),$this->acctUpload->id,
            ['comment'=>$this->acctUpload->c_comment]
        );
    }


}
