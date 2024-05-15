<?php

namespace App\Http\Controllers\Client\Services\Accounting;

use App\Events\Services\Accounting\CommentAdded;
use App\Models\Foundations\Job;
use App\Models\Foundations\Upload;
use App\Models\Services\Accounting\AccountingUpload;
use App\Models\User\Client;
use App\Traits\ApiHelperTrait;
use App\Transformers\Client\Billing\AccountingUploadTransformer;
use App\Transformers\Client\Services\Accounting\ClientAccountingConfTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AccountingUploadController extends Controller
{
    use ApiHelperTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AccountingUpload $invoice)
    {
        $job = $invoice->job;
        if($job && !$invoice->sent_at){
           // dd(config('foundations.PROCESSING_DELAY_SV_ACCT'));
            //Comprobamos que no pase mas tiempo del permitido para cancelar
            if($job->created_at->diffInSeconds(now())<(int)config('foundations.PROCESSING_DELAY_SV_ACCT')){
                if($job->delete()){
                    $invoice->update(['cancelled_at'=>now()]);
                }
                return $this->jsonResponse()->created();
            }

        }
        return $this->jsonResponse()->badRequest('No se puede cancelar , ya ha sido enviada');
    }

    public function byClient(Request $request, Client $client) {
//        DB::enableQueryLog();
        if(isset($request['invoice_type']) && $request['invoice_type']) {
            $uploads = $client->svAcctUploads()
//                ->type($request['invoice_type'])
                ->search($request['search'])
                ->filter(parseRequest($request))
                ->order($request['order'])->paginate(30);
            return $this->respond(AccountingUploadTransformer::transformPaginationS($uploads)->toArray());
        }
        return $this->jsonResponse()->badRequest();
    }

    public function saveCComment(AccountingUpload $invoice,Request $request){

        $this->validate($request,['comment'=>'required|max:500']);
        $invoice->setComment($request->comment);
        event(new CommentAdded($invoice));
        return $this->jsonResponse()->created();

    }

    public function getConfig(Request $request , Client $client){
        return $this->respond(ClientAccountingConfTransformer::transformCollectionS($client->svAcctOutConf)->toArray());
    }

    public function saveConfig(Request $request , Client $client){

        $this->validate($request,[
                'provider'=>['required',Rule::in(['trifact','exact','generic_conf'])]
        ]);

        if($request['provider']=='trifact'){
            $tfConf = $client->svAcctOutConf('trifact');
            $dt=['config'=>['endpoint_email'=>$request['config.endpoint_email']]];
            if($tfConf){
                $tfConf->update($dt);
            }else{
                $client->svAcctOutConf()->create(array_merge(['provider'=>'trifact'],$dt));
            }
        }elseif($request['provider']=='exact'){
            $exConf = $client->svAcctOutConf('exact');
            $de=['config'=>['exact_code'=>$request['config.exact_code']]];
            if($exConf){
                $exConf->update($de);
            }else{
                $client->svAcctOutConf()->create(array_merge(['provider'=>'exact'],$de));
            }
        }elseif($request['provider']=='generic_conf'){
            $gConfg = $client->svAcctOutConf('generic_conf');
            $de=['config'=>['default_provider'=>$request['config.default_provider']]];
            if($gConfg){
                $gConfg->update($de);
            }else{
                $client->svAcctOutConf()->create(array_merge(['provider'=>'generic_conf'],$de));
            }
        }


        return $this->respond(ClientAccountingConfTransformer::transformCollectionS($client->svAcctOutConf)->toArray());
    }


}
