<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

trait SearchModelTrait {

    public function scopeSearch ($q,$term){

        foreach ($this->fillable as $k => $f){
           // dd(explode(' ',$term));
            $nQ="";
            $rNQ="";
            foreach (explode(' ',$term ) as $t){
                $nQ.='%'.$t.'%';
            }
            foreach (array_reverse(explode(' ',$term )) as $t){
                $rNQ.='%'.$t.'%';
            }
            if($k == 0) {
                $q->where(function ($q) use ($f,$nQ, $rNQ) {
                    $q->where($f,'like',$nQ);
                    $q->orWhere($f,'like',$rNQ);
                });
            } else {
                $q->orWhere(function ($q) use ($f,$nQ, $rNQ) {
                    $q->where($f,'like',$nQ);
                    $q->orWhere($f,'like',$rNQ);
                });
            }

        }
        return $q;
    }



    public function scopeBasicFilter($q,Request $request){
        if(isset($request['limit']) && $request['limit']){
            $q->limit($request['limit']);
        }
    }

}