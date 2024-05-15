<?php

namespace App\Models\Services\Declarations\SevenTwoCero;

use App\Models\Services\Declarations\Declaration;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\User\Client;
use Illuminate\Database\Eloquent\Model;

class Declaration720 extends Declaration
{
    protected $table = 'sv_declaration_720';
    protected $connection = 'mysql';
    protected $fillable = [
        'declarant_id',
        'draft_id',
        'person_contact_name',
        'person_contact_phone',
        'declaration_number',
        'complementary_declaration',
        'substitutive_declaration',
        'declaration_parent_number',
        'valoration1_id',
        'valoration2_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function properties(){
        return $this->hasMany(Property720::class,'declaration_id');
    }

    public function valoration1() {
        return $this->belongsTo(DeclValoration::class, 'valoration1_id', 'id');
    }

    public function valoration2() {
        return $this->belongsTo(DeclValoration::class, 'valoration2_id', 'id');
    }
}
