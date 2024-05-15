<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(\App\Models\Communications\ClientCompany\CommClientCompanyIssue::class, function (Faker $faker) {
    return [
//        'client_id' => \App\Models\User\Client::inRandomOrder()->where('activated_at', '<>', null)->where('parent_id', null)->first()->id,
        'client_id' => 265, // Juan Luis
        'company_id' => 1,
        'subject' => $faker->realText(20),
        'status' => 1,
    ];
});

$factory->define(\App\Models\Communications\ClientCompany\CommClientCompanyMessage::class, function (Faker $faker) {
    $sender = $faker->randomElement(['client', 'company']);
    $lengthChance = mt_rand(0, 100);
    return [
        'issue_id' => \App\Models\Communications\ClientCompany\CommClientCompanyIssue::inRandomOrder()->first()->id,
        'sender' => $sender,
//        'client_id' => $sender === 'client' ? \App\Models\User\Client::inRandomOrder()->where('activated_at', '<>', null)->where('parent_id', null)->first()->id : null,
        'client_id' => 265, // Juan Luis
        'company_id' => $sender === 'company' ? 1 : null,
        'message' => $faker->realText($lengthChance > 0 && $lengthChance < 40 ? mt_rand(40, 60) : ($lengthChance < 80 ? mt_rand(60, 140) : mt_rand(140, 260))),
    ];
});
