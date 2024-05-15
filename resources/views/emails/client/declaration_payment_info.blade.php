@component('mail::message')

    {{ trans('declaration.210.payment_info_mail_msg') }}

    {{ trans('app.concept') }}
    {{ $declaration->draft_id . '-' . $draft->model->name . '-' . $declaration->declarant_nif }}

    {{ trans('app.quantity') }}
    {{ $declaration->liq_result }}€

@endcomponent
