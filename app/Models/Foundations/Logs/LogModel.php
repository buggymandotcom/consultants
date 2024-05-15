<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 21/01/2019
 * Time: 17:35
 */

namespace App\Models\Foundations\Logs;


class LogModel
{
    public $type;
    public $code;
    public $message;
    public $object;
    public $object_id;
    public $client_id;
    public $extra_data;

//    public function __construct(Array $data){
//        foreach ($data as $k => $v){
//            if(property_exists($this,$k)){
//                $this->$k=$v;
//            }
//        }
//    }

    public static function info($code,$message,$client_id=null,$object=null,$object_id=null,Array $extra_data=[]):LogModel{
        $l = static::getInstance('info',$code,$message,$client_id,$object,$object_id,$extra_data);
        return $l;
    }

    public static function error($code,$message,$client_id=null,$object=null,$object_id=null,Array $extra_data=[]):LogModel{
        $l = static::getInstance('error',$code,$message,$client_id,$object,$object_id,$extra_data);
        return $l;
    }





    public static function getInstance($type,$code,$message,$client_id=null,$object=null,$object_id=null,Array $extra_data=[]):LogModel{
        $l = new self();
        $l->type = $type;
        $l->code = $code;
        $l->client_id = $client_id;
        $l->message = $message;
        $l->object = $object;
        $l->object_id = $object_id;
        $l->extra_data = $extra_data;
        return $l;
    }
}