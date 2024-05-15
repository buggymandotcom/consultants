<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 15/05/2016
 * Time: 16:37
 */
namespace App\Transformers;



use App\Traits\TransformerTrait;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

abstract class Transformer {

    public function transformCollection(Collection $items = null){

        if ($items==null){
            return null;
        }
        return $items->map([$this,'transform'],$items);
    }

    public function transformPagination(LengthAwarePaginator $items){
        $items->setCollection($this->transformCollection($items->getCollection()));
        return $items;
    }

    public abstract function transform($item);





}