<?php

namespace App\Models\Foundations\Settings;

use Illuminate\Database\Eloquent\Model;

class OptionValue extends Model
{
    protected $table = 'option_values';
    protected $fillable = ['option_id','value'];

    public function option() {
        return $this->belongsTo(Option::class, 'option_id', 'id');
    }
}
