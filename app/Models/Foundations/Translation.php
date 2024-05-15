<?php

namespace App\Models\Foundations;

use Illuminate\Database\Eloquent\Model;
use Waavi\Translation\Models\Language;

class Translation extends Model
{
    protected $table = 'translator_translations';

    protected $fillable = ['locale', 'namespace', 'group', 'item', 'text', 'unstable'];


    public function language()
    {
        return $this->belongsTo(Language::class, 'locale', 'locale');
    }

    public static function findTrans($group,$item,$locale) {
        return Translation::where('group',$group)->where('item',$item)->where('locale',$locale)->first();
    }

    public function getByLocale($locale) {
        return self::findTrans($this->group, $this->item, $locale);
    }

}
