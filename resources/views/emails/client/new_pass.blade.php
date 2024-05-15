@component('mail::message')

{{trans('emails.client.your_new_pass')}} : {{$pass}}


@component('mail::button', ['url' => 'google.es'])
{{trans('emails.client.enter')}}
@endcomponent


{{ config('app.name') }}
@endcomponent
