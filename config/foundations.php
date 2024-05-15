<?php

return [
    "CONF_DOC_TYPE_ENTITY" => [
        "client",
    ],
    "ENTITIES" => [
        "client" => \App\Models\User\Client::class,
    ],

    "OAUTH_PASSWORD_ID" => env("OAUTH_PASSWORD_ID","2"),
    "OAUTH_PASSWORD_SECRET" => env("OAUTH_PASSWORD_SECRET"),
    "APP_URL" => env("APP_URL"),
    "PROCESSING_DELAY_SV_ACCT" => env("PROCESSING_DELAY_SV_ACCT",300),
    "SV_ACCT_P_EMAIL" => env("SV_ACCT_P_EMAIL","@cetainformatica.es"),
    "SV_ACCT_S_EMAIL" => env("SV_ACCT_S_EMAIL","@cetainformatica.es"),
    "MAIN_NOTIFICATION_MAIL" => env("MAIN_NOTIFICATION_MAIL","jmhernandez@cetainformatica.es"),
    "DEV_MAIN_NOTIFICATION_MAIL" => env("DEV_MAIN_NOTIFICATION_MAIL"),
    "USER_BASIC" => env("USER_BASIC"),
    "PASS_BASIC" => env("PASS_BASIC"),

];