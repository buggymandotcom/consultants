@component('mail::message')
El cliente {{ $client->fullname }}, con correo {{ $client->email }} e ID {{ $client->id }}, ha solicitado la contratación del servicio {{ $service->getAutoTrans()->name }}. Se le han enviado instrucciones a su correo para que realice el pago.

{{ config('app.name') }}
@endcomponent
