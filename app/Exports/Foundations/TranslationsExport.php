<?php

namespace App\Exports\Foundations;

use App\Models\Foundations\Translation;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithMapping;

class TranslationsExport implements FromCollection,ShouldAutoSize
{


    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $d = new Collection();
        $all = Translation::whereNotIn('group',['validation','auth','pagination'])->get();
        foreach ( $all as $t){
            $d->push([
                "id" => $t->id,
                "locale" => $t->locale,
                "group_item" => $t->group.'.'.$t->item,
                "text" => $t->text,
            ]);
        }

        $dMapped=$d->groupBy('locale')['es']->map(function($item)use($d) {
            $en=$d->where('locale','en')->where('group_item',$item['group_item'])->first();

            return [
                "group_item" => $item['group_item'],
                "es" => $item['text'],
                "en" => $en?$en['text']:''

            ];
        });

        return $dMapped;


//        return Translation::groupBy('locale')
//            ->where('group','<>','validation')->where('group','<>','validationNg')->get();
    }

//    public function columnFormats(): array
//    {
//        // TODO: Implement columnFormats() method.
//    }


}
