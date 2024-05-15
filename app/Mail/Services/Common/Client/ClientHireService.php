<?php

namespace App\Mail\Services\Common\Client;

use App\Models\Services\Service;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;

class ClientHireService extends Mailable
{
    use Queueable, SerializesModels;

    protected $service;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
        $this->client = Auth::guard('clients')->user();
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $service = $this->service;
        $client = $this->client;
        return $this->markdown('emails.services.common.client.cli-hire-service', compact('service', 'client'))
            ->subject(trans('emails.services.common.hire_service'))
            ->to($client->email);
    }
}
