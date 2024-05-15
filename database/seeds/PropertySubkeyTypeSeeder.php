<?php

use Illuminate\Database\Seeder;
use App\Models\Services\Declarations\SevenTowCero\PropertySubkeyType;
use Illuminate\Support\Facades\DB;

class PropertySubkeyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        DB::table('sv_720_property_subkey_type')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        PropertySubkeyType::create(['property_key_type'=>'C','value'=>'1']);
        PropertySubkeyType::create(['property_key_type'=>'C','value'=>'2']);
        PropertySubkeyType::create(['property_key_type'=>'C','value'=>'3']);
        PropertySubkeyType::create(['property_key_type'=>'C','value'=>'4']);
        PropertySubkeyType::create(['property_key_type'=>'C','value'=>'5']);
        PropertySubkeyType::create(['property_key_type'=>'V','value'=>'1']);
        PropertySubkeyType::create(['property_key_type'=>'V','value'=>'2']);
        PropertySubkeyType::create(['property_key_type'=>'V','value'=>'3']);
        PropertySubkeyType::create(['property_key_type'=>'S','value'=>'1']);
        PropertySubkeyType::create(['property_key_type'=>'S','value'=>'2']);
        PropertySubkeyType::create(['property_key_type'=>'B','value'=>'1']);
        PropertySubkeyType::create(['property_key_type'=>'B','value'=>'2']);
        PropertySubkeyType::create(['property_key_type'=>'B','value'=>'3']);
        PropertySubkeyType::create(['property_key_type'=>'B','value'=>'4']);
        PropertySubkeyType::create(['property_key_type'=>'B','value'=>'5']);
        PropertySubkeyType::create(['property_key_type'=>'I','value'=>'0']);

    }
}
