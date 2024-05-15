<?php

namespace App\Traits;




use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

trait TransformerTrait {

   public static function transformS ($item){
       return (new self())->transform($item);
   }
   public static function transformCollectionS ($item):Collection{
       return (new self())->transformCollection($item);
   }
   public static function transformPaginationS ($item):LengthAwarePaginator{
       return (new self())->transformPagination($item);
   }

}
