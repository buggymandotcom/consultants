<?php

namespace App\Models\User;


use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use SMartins\PassportMultiauth\HasMultiAuthApiTokens;


class Employee extends Authenticatable
{
     use HasMultiAuthApiTokens,Notifiable,Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public const GUARD = 'employees';
    protected $connection = 'mysql';
    protected  $table = 'employees';

    protected $fillable = [
        'firstname',
        'lastname',
        'phone',
        'email',
        'password',
        'lang_id',
//        'identification',
//        'identification_type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    // Hash automatico
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }



}
