<?php

namespace App\Models\Foundations\Settings;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $table = 'options';
    protected $fillable = ['group','label','key','value','type'];

    public function values() {
        return $this->hasMany(OptionValue::class, 'option_id', 'id');
    }

    public static function opt($key) {
        return Option::where('key', $key)->first();
    }

    public static function val($key) {
        return Option::opt($key)['value'];
    }

    public static function change($key, $value) {
        $opt = Option::opt($key);
        if ($opt) {
            $opt->update(['value' => $value]);
            return $opt;
        }
        return false;
    }

    public static function changeOrNew($key, $value, $type = 'text', $label = '',$group='*') {
        if (!$opt = Option::change($key, $value)) {
            $opt = Option::create([
                'label' => $label,
                'key' => $key,
                'value' => $value,
                'type' => $type,
                'group' => $group,
            ]);
        }
        return $opt;
    }

//    Scopes
    public function scopeGroup($q, $group) {
        return $q->where('group', $group);
    }
}
