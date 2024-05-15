<?php
/**
 * Created by PhpStorm.
 * User: Juan Luis
 * Date: 21/11/2017
 * Time: 12:16
 */

namespace App\Traits;

use App\Transformers\Transformer;

trait UsesTransformerTrait
{
    public function getTransformer($class, $properties = null): Transformer {

        $trans = new $class();
        if(isset($properties) && $properties) {
            if(is_array($properties)) {
                foreach($properties as $i) {
                    if(property_exists($trans, $i)) {
                        $trans->$i = true;
                    }
                }
            } else {
                if(property_exists($trans, $properties)) {
                    $trans->$properties = true;
                }
            }
        }
        return $trans;
    }
}
