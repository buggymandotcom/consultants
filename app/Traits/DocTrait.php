<?php

namespace App\Traits;

use App\Models\Foundations\ConfDocType;
use Illuminate\Support\Collection;

trait DocTrait {

    public function getConfDocType(): Collection
    {
        return ConfDocType::byEntity($this->docEntity)->get();
    }
    //Obtenemos los documentos que puede subir la entidad y los cruzamos con los que ha subido
    public function allDocs(){
        //Posibles docs
        $availableTypeDocs  = ConfDocType::byEntity($this->docEntity);
        //Obtenemos las subidas con document type que este entre los disponibles
        $uploaded = $this->docs()->whereHas('type',function ($q) use ($availableTypeDocs){
            $q->whereIn('id',$availableTypeDocs->pluck('doc_type_id'));
        });
        $res = new Collection();
        $res->put('uploaded',$uploaded->get());
        $notUploaded=new Collection();
        $availableTypeDocs->whereNotIn('doc_type_id',$uploaded->pluck('doc_type_id'))->each(function($i) use ($notUploaded){
            $notUploaded->push($i);
        });
        $res->put('not_uploaded',$notUploaded);
        return $res;
    }

    //Rechazar documentos

    public function rejectDoc($upload_id,$reason){

       return $this->docs()->updateExistingPivot($upload_id,([
            'status'=>'rejected',
            'comment'=>$reason,
            'updated_by' => user()->id
        ]));
    }

    public function acceptDoc($upload_id){
        return $this->docs()->updateExistingPivot($upload_id,([
            'status'=>'accepted',
            'updated_by' => user()->id
        ]));
    }

}
