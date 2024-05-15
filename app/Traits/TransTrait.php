<?php
/**
 * Created by PhpStorm.
 * User: Juan Luis
 * Date: 21/11/2017
 * Time: 12:16
 */

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait TransTrait
{
    public abstract function trans();

    public function getTrans($locale) {
        return $this->trans()->whereHas('lang',function($q) use ($locale) {
            return $q->where('locale',$locale);
        })->first();
    }

    public function hasTrans($lang) {
        if(is_string($lang)) {
            return ($this->trans()->where('locale',$lang)->first());
        }
        return ($this->trans()->where('lang_id',$lang)->first());
    }

    public function getAutoTrans() {
        return $this->getTrans(app()->getLocale());
    }

    public function getTransTable(){
        return $this->trans()->getRelated()->getTable();
    }


    public function scopeSortTransBack($q,$opt){
        $q->select($this->getTable().'.*');
        $q->join($this->getTransTable().' as trans', 'trans.'.explode('.',$this->trans()->getForeignKey())[1], '=', $this->getTable().'.id')
        ->join('translator_languages as lang','lang.id','=','trans.lang_id')
        ->where('lang.locale',app()->getLocale())
        ->orderBy(explode('.',$opt[0])[1], $opt[1]);
        return $q;
    }
}