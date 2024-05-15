<?php

return [
    'default_disk' => env('UPLOADS_DEFAULT_DISK','local'),
    'base' => 'ciberconsultores/uploads/',

    'adapters' => [
        'CLIENTS_SV_ACCT' => \App\Uploads\Adapters\Client\ClientSvAccountingUpload::class,
    ],

    'paths' => [
        'CLIENTS_SV_ACCT' => 'clients/services/accounting',
    ],
    'measures' => [
        'CLIENTS_SV_ACCT' => [2048, 3072],
    ]




];