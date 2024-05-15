<?php

namespace App\Providers;

use App\Events\Services\Accounting\CommentAdded;
use App\Events\TestEvent;
use App\Listeners\Foundations\LogDBGeneric;
use App\Listeners\Service\Accounting\NotifiyAfterCommentAdded;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [

            CommentAdded::class => [
                NotifiyAfterCommentAdded::class,
                LogDBGeneric::class

            ],



    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
