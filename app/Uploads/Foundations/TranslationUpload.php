<?php
namespace App\Uploads\Adapters\Foundations;



use App\Jobs\Services\ProccessSvAcctOut;
use App\Models\Services\Accounting\AccountingUpload;

use App\Uploads\UploadHandle;
use App\Uploads\UploadInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;


//use Intervention\Image\Image;

class TranslationUpload extends UploadHandle implements  UploadInterface
{

   public function __construct(\Illuminate\Http\UploadedFile $file, array $params)
   {
       parent::__construct($file, $params);
       $this->disk=$this->disk=Storage::disk('local');
   }
   public function setRules(){
       return [
            'file' => 'file',
        ];
   }

   public function upload(){

        dd($this->file);
    }

    private function save ($newPath) {


    }


    public function getModel(){
    }

    public function resize($path){
    }


}