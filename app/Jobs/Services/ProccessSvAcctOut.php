<?php

namespace App\Jobs\Services;

use App\Exceptions\Jobs\ProccessSvAcctException;
use App\Mail\Services\Accounting\ExactMail;
use App\Mail\Services\Accounting\TrifactMail;
use App\Models\Services\Accounting\AccountingUpload;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProccessSvAcctOut implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected  $accountingUpload;

    public function __construct(AccountingUpload $accountingUpload)
    {
        $this->accountingUpload=$accountingUpload;
    }



    public function handle(){
         //Todo decidir con que proveedor se envia de momento con trifact pero debe se algo configurable por cliente
        //$this->sendWithExact();
        $defaultProvider=$this->accountingUpload->client->sv_acct_out_default_provider;
        if($defaultProvider=='exact'){
            $this->sendWithExact();
        }else{
            $this->sendWithTrifact();
        }


        return $this->job->getJobId();
    }

    public function failed(\Exception $exception){

        $this->accountingUpload->update([
            'status'=>2,'error'=>
                [
                    'message'=>$exception->getMessage(),
                    'code'=>$exception->getCode(),
                    'file'=>$exception->getFile(),
                    'line'=>$exception->getLine(),
                ]
        ]);
    }

    private function sendWithExact(){
        $c = $this->accountingUpload->client;
        $exactConf=$c->svAcctOutConf('exact');

        if($exactConf){
            if(!empty($exactConf->config['exact_code'])){
                $exactCode=$exactConf->config['exact_code'];
                $to = $exactCode;
                try {
                    $subject = null;
                    if($this->accountingUpload->invoice_type=='purchase'){
                        $to.=config('foundations.SV_ACCT_P_EMAIL');
                    }elseif ($this->accountingUpload->invoice_type=='sale'){
                        $to.=config('foundations.SV_ACCT_S_EMAIL');
                    }else{
                        throw new ProccessSvAcctException('El tipo de la subida no es correcto');
                    }
                    //No mandamos correo de momento
                    Mail::to($to)->send(new ExactMail($this->accountingUpload));
                }catch (\Exception $exception){
                    throw new ProccessSvAcctException('No se pudo mandar el email',0,$this->accountingUpload,$exception);
                }
                //Enviado
                $this->accountingUpload->update(['sent_at'=>now()]);
            }else{
                throw new ProccessSvAcctException('No se encontro el codigo de exact',0,$this->accountingUpload);
            }
        }else{
            throw new ProccessSvAcctException('No se encontró configuracion de exact',0,$this->accountingUpload);
        }

    }

    private function sendWithTrifact(){
        //Obtener configuracion de trifact del client_id
        $c=$this->accountingUpload->client;
        $trifactConf=$c->svAcctOutConf('trifact');
        //Mandar email
        if($trifactConf){
            if(!empty($trifactConf->config['endpoint_email'])){
                $trifactEmail=$trifactConf->config['endpoint_email'];
                try {
                    //No mandamos correo de momento
                    Mail::to($trifactEmail)->send(new TrifactMail($this->accountingUpload));
                }catch (\Exception $exception){
                    throw new ProccessSvAcctException('No se pudo mandar el email',0,$this->accountingUpload,$exception);
                }
                //Enviado
                $this->accountingUpload->update(['sent_at'=>now()]);
            }else{
                throw new ProccessSvAcctException('No se encontro correo de trifact',0,$this->accountingUpload);
            }
        }else{
            throw new ProccessSvAcctException('No se encontró configuracion de trifact',0,$this->accountingUpload);
        }
    }

}
