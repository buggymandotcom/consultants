@component('mail::message')

# {{ trans('emails.client.activate_account') }}
{{ trans('emails.client.activate_account_msg') }}
# {{ $client->activate_token }}

{{ trans('emails.client.activate_account_lost') }}
@component('mail::button', ['url' => $client->activationLink])
{{ trans('emails.client.activate') }}
@endcomponent

@endcomponent
