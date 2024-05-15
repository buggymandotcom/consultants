<?php

namespace App\Imports\Foundations;

use App\Models\Foundations\Translation;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class TranslationsImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        foreach ($collection as $t){
            $parts = explode('.', $t[0]);
            $group = implode('', array_splice($parts, 0, 1));
            $index = implode('.', $parts);


            if($es = Translation::findTrans($group,$index,'es')) {
                        $es->update(['text' => $t[1]]);
                    } elseif(trim($t[1])!=='') {
                        $es = Translation::create([
                            'locale' => 'es',
                            'namespace' => '*',
                            'group' => $group,
                            'item' => $index,
                            'text' => $t[1]
                        ]);
             }
            if($en = Translation::findTrans($group,$index,'en')) {
                        $en->update(['text' => $t[2]]);
                    } elseif(trim($t[2])!=='') {
                        $en = Translation::create([
                            'locale' => 'en',
                            'namespace' => '*',
                            'group' => $group,
                            'item' => $index,
                            'text' => $t[2]
                        ]);
             }

        }
    }
}
