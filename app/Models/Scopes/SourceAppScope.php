<?php
namespace  App\Models\Scopes;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 04/05/2017
 * Time: 14:03
 */
class SourceAppScope  implements Scope
{


    public $user;

//    public function __construct($user)
//    {
//        $this->user=$user;
//    }

    public function apply(Builder $builder, Model $model)
    {
         //todo ver la forma de pasarle la empresa para hacerlo multiempresa
         $builder->where('source_app','ciberconsult');
    }
}