<?php

namespace App\Http\Controllers;




use App\Http\Requests\Foundations\UploadRequest;
use App\Models\Foundations\Upload;
use App\Traits\ApiHelperTrait;
use App\Transformers\Foundations\BillingPeriodTransformer;
use App\Transformers\Foundations\UploadTransformer;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    use ApiHelperTrait;
    public function store (Request $request){
       //Si existe el type comprobamos si viene file
        if(!$this->existsAdapter($request->type)){
            return $this->jsonResponse()->badRequest('type is missing or invalid');
        }
        if(!$request->file('file')){
            return $this->jsonResponse()->badRequest('file is missing');
        }

        $adapter = $this->getAdapter($request->type,$request->file('file'),$request);

        $this->validate($request,$adapter->getRules());

        try{
           if ($upload=$adapter->upload()){
            return $this->respond(UploadTransformer::transformS($upload));
           }
        }catch (\Exception $exception){
            return $this->jsonResponse()->badRequest($exception->getFile()."-Line-".$exception->getLine()."-".$exception->getMessage());
        }
    }

    public function destroy (Upload $upload){
        Storage::disk(config('uploads.default_disk','local'))->delete($upload->path);
        $upload->delete();
    }

    private function existsAdapter($name){
         return isset(config('uploads.adapters')[strtoupper($name)]);
    }

    private function getAdapter($name,UploadedFile $file , Request $request){
         $className=config('uploads.adapters')[strtoupper($name)];
         return (new $className ($file,$request->except(['file'])));
    }

}
