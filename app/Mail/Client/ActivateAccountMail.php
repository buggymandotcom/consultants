<?php

namespace App\Mail\Client;

use App\Models\User\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ActivateAccountMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $client;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Client $client)
    {
//        dd($this->client);
        $this->client = $client;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $client = $this->client;
        return $this->to($this->client->email)
            ->subject(trans('emails.client.activate_account_subject'))
            ->markdown('emails.client.activate_account', compact('client'));
    }
}
