<?php

namespace App\Mail\Client;

use App\Models\Services\Declarations\TwoOneCero\Declaration210;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\User\Client;
use FontLib\Table\Type\name;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DeclarationPaymentInfoMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $declaration;
    protected $client;
    protected $draft;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Declaration210 $declaration, Client $client, TaxModelDraft $draft)
    {
        $this->declaration = $declaration;
        $this->client = $client;
        $this->draft = $draft;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $client = $this->client;
        $declaration = $this->declaration;
        $draft = $this->draft;
        return $this->to($this->client->email)
//            ->subject(trans('emails.client.declaration_payment_info_mail_subject'))
            ->subject(trans('emails.client.payment__declaration_method_subject_msg') . ' ' . $this->declaration->draft_id . '-' . $this->draft->model->name . '-' . $this->declaration->declarant_nif)
            ->markdown('emails.client.declaration_payment_info',compact('client','declaration','draft'));
    }
}
