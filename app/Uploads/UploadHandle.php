<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 08/05/2017
 * Time: 17:37
 */

namespace App\Uploads;



use App\Models\Document\Document;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UploadHandle
{
    protected $file;
    protected $params;
    /** @var Filesystem */
    protected $disk;
    protected $uploads;

    public function __construct(\Illuminate\Http\UploadedFile $file, array $params){
        $this->file=$file;
        $this->params=$params;
        $this->disk=Storage::disk(config('uploads.default_disk','s3'));
        $this->config = config('uploads');
    }

    protected function getPathToUpload($type,$id=null,$subfolder=null){
        $path=$this->config['base'].$this->config['paths'][$type];
        if($id){
            $path=$path.'/'.$id;
            if($subfolder){
                $path=$path.'/'.$subfolder;
            }
        }
        return $path;
    }

    protected function preparedUploadModel($newPath){
        $uploadModel= [
            'repository' => config('uploads.default_disk','local'),
            'mime'=> $this->file->getMimeType()!=='application/octet-stream'?$this->file->getMimeType():$this->file->getClientMimeType(),
            'extension'=> $this->file->getClientOriginalExtension(),
            'original_name' => $this->file->getClientOriginalName(),
            'size'=>$this->file->getSize(),
            'path'=>$newPath,
           // 'uploaded_by'=> user()->id,
          //  'doc_type_id'=> (int)$this->params['doc_type_id'] ,
            'adapter' => get_called_class()
        ];
        return $uploadModel;
    }
    //Dispara un evento configurado al documento si lo tiene , despues de subir
//    protected function dispatchDocumentEventAfter (Document $document , Array $args) {
//
//        if($document->event_after){
//            $eventStr=key($document->event_after);
//            if(class_exists($eventStr)){
//                event($this->eventInstanceWithArgs($eventStr,$args));
//            }
//        }
//
//    }

//    protected function eventInstanceWithArgs($eventStr,$args){
//        $r= new \ReflectionClass($eventStr);
//        $event=$r->newInstance($args);
//        return $event;
//    }

    public function resize($path){}

    protected function checkMime($mime) {
        return preg_match($mime, $this->file->getClientMimeType());
    }

    public function getRules(){
        $availableTypes=array_keys(config('uploads.adapters'));
        $basicRules = ['type' => ['required',Rule::in($availableTypes)]];

        return array_merge($basicRules,$this->setRules());
    }

}