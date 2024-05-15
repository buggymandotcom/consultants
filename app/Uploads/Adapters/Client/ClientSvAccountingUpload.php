<?php
namespace App\Uploads\Adapters\Client;



use App\Jobs\Services\ProccessSvAcctOut;
use App\Models\Services\Accounting\AccountingUpload;
use App\Models\User\Client;
use App\Models\User\User;
use App\Uploads\UploadHandle;
use App\Uploads\UploadInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

//use Intervention\Image\Image;

class ClientSvAccountingUpload extends UploadHandle implements  UploadInterface
{

   public function __construct(\Illuminate\Http\UploadedFile $file, array $params)
   {
       parent::__construct($file, $params);

   }
   public function setRules(){
       //Validacion distinta segun norma43 o factura
       if(isset($this->params['invoice_type']) && $this->params['invoice_type'] == 'norma43' ){
            $file = "file|mimetypes:text/plain|max:2048";
       }else{
            $availableMimes=["application/pdf","image/jpeg","image/png","image/tiff"];
            $file = ["max:10240",function ($attribute, $value, $fail)use($availableMimes){
                if(!in_array($this->file->getMimeType(),$availableMimes) && !in_array($this->file->getClientMimeType(),$availableMimes)){
                    $fail('La extension de '.$attribute. 'no es correcta, debe de ser '.join(',',$availableMimes));
                }
        }];
       }

       return [
            'client_id' => 'required|integer',
            'file' => $file,
            'invoice_type' => ['required',Rule::in(['purchase','sale','norma43'])]
        ];
   }

   public function upload(){
        $c=Client::withTrashed()->find($this->params['client_id']);
        $path=$this->getPathToUpload('CLIENTS_SV_ACCT',$this->params['client_id']);
        $resUp=$this->disk->putFile($path,$this->file);
        if ($resUp){
            if ($this->checkMime('/image\/*/')) {
                $this->resize($resUp);
            }
            //Caso de que se suba creamos el regristro Upload y lo asociamos a su pivote
            $upload=$this->save($resUp);
            if(!$upload){
                throw new \Exception('File could not be saved');
            }return $upload;

        }throw new \Exception('File could not be uploaded');

    }

    private function save ($newPath) {

          $params = $this->params;
          $c = $this->getModel();
          $u = DB::transaction(function () use ($newPath,$params,$c) {
              $uploadModel = $this->preparedUploadModel($newPath);
              //dd($uploadModel);
              return $c->svAcctInvoices()->create($uploadModel, ['invoice_type' => $params['invoice_type']]);
          });
          //Ejecutamos la tarea de enviarla
          $aupload=AccountingUpload::whereUploadId($u->id)->first();
          if($u && $this->params['invoice_type']!=='norma43'){
              /**
                La unica forma de obtener el id del job es hacer el dispatch de esta forma (02/01/2019)
               * https://stackoverflow.com/questions/46785656/in-laravel-5-5-how-to-get-the-job-id-after-we-dispatch-a-job-to-the-job-queue
               **/

            $job=app(\Illuminate\Contracts\Bus\Dispatcher::class)->dispatch((new ProccessSvAcctOut($aupload))
                        ->delay(now()->addSeconds(config('foundations.PROCESSING_DELAY_SV_ACCT')))
                        ->onQueue('sv_acct_out'));
            //Guardamos el id del job
//            dd($c->svAcctInvoices()->where('upload_id',$u->id)->first());
            $c->svAcctInvoices()->updateExistingPivot($u->id,['job_id'=>$job]);


          }
          return $u;

//        $u=Client::withTrashed()->findOrFail($this->params['client_id']);
//        $uploadModel = $this->preparedUploadModel($newPath);
//        $pivots =  [
//            'up_by_user' => \user()->id
//        ] ;
//        $upload=$u->docs()->create($uploadModel,$pivots);
//
//        event(new ClientDocUploaded($u,$upload));
//
//        return $upload;
    }


    public function getModel(){

        return Client::withTrashed()->findOrFail($this->params['client_id']);
    }

    public function resize($path){
        //$path = storage_path('app/'.$path);
//        $image = Image::make($path);
////        Para detectar la orientación. La configuración está puesta para formato vertical
//        if ($image->height() > $image->width()) {
//            $image->resize(
//                $this->config['measures']['CLIENTS'][0],
//                $this->config['measures']['CLIENTS'][1],
//                function($constraint) {
//                    $constraint->aspectRatio();
//                    $constraint->upsize();
//                });
//        } else {
//            $image->resize(
//                $this->config['measures']['CLIENTS'][1],
//                $this->config['measures']['CLIENTS'][0],
//                function($constraint) {
//                    $constraint->aspectRatio();
//                    $constraint->upsize();
//                });
//        }
//        $image->save($path);
    }


}