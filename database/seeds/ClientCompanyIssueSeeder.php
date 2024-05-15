<?php

use App\Models\Communications\ClientCompany\CommClientCompanyIssue;
use App\Models\Communications\ClientCompany\CommClientCompanyMessage;
use Illuminate\Database\Seeder;

class ClientCompanyIssueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        CommClientCompanyIssue::truncate();
        CommClientCompanyMessage::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');

        factory(CommClientCompanyIssue::class, 100)->create()->each(function ($i) {
            factory(CommClientCompanyMessage::class, 1)->create([
                'sender' => 'client',
                'issue_id' => $i->id,
                'client_id' => $i->client_id,
                'company_id' => null,
            ]);
            if(mt_rand(0, 100) > 30) {
                $senders = ['client' => 'client', 'company' => 'company'];
                factory(CommClientCompanyMessage::class, mt_rand(0, 14))
                    ->create([
                        'issue_id' => $i->id
                    ])->each(function($m) use ($senders, $i) {
                        $sender = array_rand($senders, 1);
                        if($sender === 'client') {
                            $m->update([
                                'client_id' => $i->client_id,
                                'sender' => $sender,
                                'company_id' => null,
                            ]);
                        } else {
                            $m->update([
                                'client_id' => null,
                                'sender' => $sender,
                                'company_id' => $i->company_id,
                            ]);
                        }
                });
            }
        });
    }
}
