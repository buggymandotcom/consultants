<?php

namespace App\Listeners\Service\Accounting;

use App\Events\Services\Accounting\CommentAdded;
use App\Mail\Services\Accounting\CommentAddedMail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class NotifiyAfterCommentAdded
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


    public function handle(CommentAdded $event){

        //Mandamos el mail con el comentario
        Mail::to([config('foundations.MAIN_NOTIFICATION_MAIL'),config('foundations.DEV_MAIN_NOTIFICATION_MAIL')])

            ->later(now()->addSeconds(5),new CommentAddedMail($event->acctUpload));
    }
}
