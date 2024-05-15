@component('mail::message')


<p style="font-size: 11px;">#{{$acctUpload->client->id}}-{{$acctUpload->client->fullname}} has written you the comment about the invoice #{{$acctUpload->id}} : </p>

<h2>
    {{$acctUpload->c_comment}}
</h2>

{{--@component('mail::button', ['url' => ''])--}}
{{--Button Text--}}
{{--@endcomponent--}}


{{--{{ config('app.name') }}--}}
@endcomponent
