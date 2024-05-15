<?php

namespace App\Models\Services\Declarations\SevenTwoCero;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\Client;

class Property720 extends Model
{
    protected $table = 'sv_720_property';
    protected $connection = 'mysql';
    protected $fillable = [
        'declaration_id', //FK
        'representative_id', //FK
        'declarant_condition',
        'declarant_type_ownership',
        'property_key_type',
        'property_subkey_type',
        'property_real_ownership',
        'country_cod', //FK
        'identity_key',
        'identity_values',
        'identity_key_account',
        'bic_code',
        'account_code',
        'entity_identity',
        'residential_country_nif',
        'address',
        'street',
        'number',
        'complement',
        'city',
        'address_state',
        'zip_code',
        'country_address_cod', //FK
        'incorporation_date',
        'origin',
        'extinction_date',
        'valoration1_id', //FK
        'valoration2_id', //FK
        'value_representation_key',
        'value_numbers',
        'real_state_key_type', // Clave de tipo bien o inmueble
        'participation',
        'created_at',
        'updated_at',
    ];

    protected $dates = [
        'incorporation_date',
        'extinction_date',
    ];

    public function declaration(){
        return $this->belongsTo(Declaration720::class,'declaration_id');
    }

    public function subkeyType(){
        return $this->belongsTo(PropertySubkeyType::class,'property_subkey_type');
    }

    public function countryCod(){
        return $this->belongsTo(CountryCode::class,'country_cod');
    }

    public function valoration1(){
        return $this->belongsTo( DeclValoration::class,'valoration1_id');
    }

    public function valoration2(){
        return $this->belongsTo( DeclValoration::class,'valoration2_id');
    }

    public function representative(){
        return $this->belongsTo(Client::class,'representative_id');
    }

    public function countryAddressCod(){
        return $this->belongsTo(CountryCode::class,'country_address_cod');
    }

    //TODO añadir valoraciones
}
