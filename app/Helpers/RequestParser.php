<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 02/06/2017
 * Time: 18:58
 */

namespace App\Helpers;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class RequestParser
{

    private $data;
    private $model;


    function __construct($data,Model $model){

        $this->data = collect($data);
        $this->model=$model;


    }


    public function onlyFillables(){
        $fillables=$this->model->getFillable();
        $this->data=$this->data->only($fillables);
        return $this;
    }

    function parseDates(){
        $dates=$this->model->getDates();
        $parseDates=$this->data->only($dates)->map(function($item){
            if($item){
                $d = new \Carbon\Carbon($item);
                $d->timezone(config('app.timezone'));
                return $d;
            }
        });
        $this->data = $this->data->except($dates)->merge($parseDates);
        return $this;
    }

    public static function parseDate($datestring){
        $d = new \Carbon\Carbon($datestring);
        $d->timezone(config('app.timezone'));
        return $d;
    }

    //incluir el company_id por defecto
    function setCompany($id=null){
        $id = $id ? $id : user()->company_id;
        $this->data=$this->data->merge(['company_id'=>$id]);
        return $this;
    }

    public function get():Collection{
        return $this->data;
    }
    public function toArray(){
        return $this->data->toArray();
    }

    static function instance($data,Model $model) : RequestParser{
        return new self($data,$model);
    }

    public function push ($element) {
        $this->data->push($element);
        return $this;
    }
    public function put ($key,$value) {
        $this->data->put($key,$value);
        return $this;
    }

    public function tolower($opc){
        $this->alterData($opc,function ($d){
            return strtolower($d);
        });
        return $this;
    }
    public function toupper($opc){
        $this->alterData($opc,function ($d){
            return strtoupper($d);
        });
        return $this;
    }
    public function ucfirst($opc){
        $this->alterData($opc,function ($d){
            return ucfirst($d);
        });
        return $this;
    }


    private function alterData($opc,$callback){
        if(gettype($opc)=='string'){
            if($opc=='*'){
                foreach ($this->data as $i => $d){
                    $this->data[$i]=call_user_func($callback,$d);
                }
            }else{
                if(isset($this->data[$opc])){
                    $this->data[$opc]=call_user_func($callback,$this->data[$opc]);
                }
            }
        }
        if(gettype($opc)=='array'){
            foreach ($opc as $o){
                if(isset($this->data[$o])){
                    $this->data[$o]=call_user_func($callback,$this->data[$o]);
                }
            }
        }
        return $this;
    }

}