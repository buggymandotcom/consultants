<?php

namespace App\Http\Controllers;




use App\Events\Services\Accounting\CommentAdded;
use App\Events\TestEvent;
use App\Exceptions\Jobs\ProccessSvAcctException;
use App\Exports\Foundations\TranslationsExport;
use App\Mail\Client\NewPassMail;
use App\Mail\Services\Accounting\CommentAddedMail;
use App\Mail\Services\Accounting\TrifactMail;
use App\Mail\TestEmail;
use App\Models\Foundations\Job;
use App\Models\Foundations\Logs\LogModel;
use App\Models\Services\Accounting\AccountingUpload;
use App\Models\Services\BillingPeriod;
use App\Models\User\Client;
use App\Models\User\Employee;
use App\Traits\ApiHelperTrait;
use App\Transformers\Auth\GenericAuthUserTransformer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use nickurt\Plesk\Plesk;
use phpDocumentor\Reflection\DocBlock\Tags\Generic;
use nickurt\Plesk\Facade as PleskXML;
class TestController extends Controller
{
    use ApiHelperTrait;


    public function test(){
//
//        $e=Client::find(168);
//        $e->password="cetait00";
//        $e->save();
//        die();

        $c =  PleskXML::clients()->all();
        dd($c);
        dd("hola");


        die();
        return Excel::download(new TranslationsExport, 'trans.xlsx');




        //Mail::to('jmhernandez@cetainformatica.es')->send(new CommentAddedMail(AccountingUpload::find(170)));


//        $c=Client::find(168);
//        $c->svAcctOutConf()->create(['provider'=>'exact','config'=>['exact_code'=>'jmhernandez']]);
        die();
        //Obtener configuracion de trifact del client_id
//        $trifactConf=$c->svAcctOutConf('trifact');
//        //Mandar email
//        if($trifactConf){
//            if(!empty($trifactConf->config['endpoint_email'])){
//                $trifactEmail=$trifactConf->config['endpoint_email'];
//                try {
//                    Mail::to($trifactEmail)->send(new TrifactMail($upload));
//                }catch (\Exception $exception){
//                    throw new ProccessSvAcctException('No se pudo mandar el email',0,$upload,$exception);
//                }
//                //Enviado
//                $upload->update(['sent_at'=>now()]);
//            }else{
//                throw new ProccessSvAcctException('No se encontro correo de trifact',0,$upload);
//            }
//        }else{
//            throw new ProccessSvAcctException('No se encontró configuracion de trifact',0,$upload);
//        }

        echo "completado";


        //dd($c->svAcctOutConf()->create(['provider'=>'otro','config'=>['endpoint_email'=>'jseer@gmail.com']]));
      //      $data = ['message' => 'This is a test'];

    //Mail::to('jmhernandez@cetainformatica.es')->send(new TestEmail($data));
//         DB::connection()->enableQueryLog();
//
//         $c = Client::first();
//         dump($c->svAcctInvoices);
//         $b = BillingPeriod::find(1);
//
//
//
//
//
//        dd(DB::getQueryLog());
    }

    public function exportTrans() {
        Excel::create('traducciones', function ($excel) {
            $excel->sheet('Traducciones', function ($sheet) {
                $sheet->appendRow([
                    'grupo',
                    'texto',
                    'espanol',
                    'ingles',
                    'holandes'
                ]);
                foreach(Translation::where('locale','es')->where('group','<>','validation')->where('group','<>','validationNg')->get() as $trans) {
                    $sheet->appendRow([
                        $trans->group,
                        $trans->item,
                        $trans->text,
                        $trans->getByLocale('en') ? $trans->getByLocale('en')->text : '',
                        $trans->getByLocale('nl') ? $trans->getByLocale('nl')->text : ''
                    ]);
                }
            });
        })->download('xlsx');
    }

    public function importTrans() {

        Excel::load(storage_path('imported_trans/Traducciones_06_03_2018.csv'), function($reader){
            $reader->noHeading();
            $r=$reader->get();
            $r=collect($r)->map(function($tr){
                return [
                    'grupo' => $tr[0],
                    'texto' => $tr[1],
                    'es' => $tr[2],
                    'en' => $tr[3],
                    'nl' => $tr[4],
                ];
            });
            foreach($r as $row) {
                if($row['en']) {
                    if($en = Translation::findTrans($row['grupo'],$row['texto'],'en')) {
                        $en->update(['text' => $row['en']]);
                    } else {
                        $en = Translation::create([
                            'locale' => 'en',
                            'namespace' => '*',
                            'group' => $row['grupo'],
                            'item' => $row['texto'],
                            'text' => $row['en']
                        ]);
                    }
                }
                if($row['nl']) {
                    if($nl = Translation::findTrans($row['grupo'],$row['texto'],'nl')) {
                        $nl->update(['text' => $row['nl']]);
                    } else {
                        $nl = Translation::create([
                            'locale' => 'nl',
                            'namespace' => '*',
                            'group' => $row['grupo'],
                            'item' => $row['texto'],
                            'text' => $row['nl']
                        ]);
                    }
                }
            }
        });
        return true;
    }
}
