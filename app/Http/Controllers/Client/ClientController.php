<?php

namespace App\Http\Controllers\Client;

use App\Mail\Client\NewPassMail;
use App\Mail\Services\Common\Client\ClientHireService;
use App\Mail\Services\Common\Employee\EmployeeHireService;
use App\Models\Scopes\SourceAppScope;
use App\Models\Services\Declarations\SevenTwoCero\CountryCode;
use App\Models\Services\Declarations\SevenTwoCero\Declaration720;
use App\Models\Services\Declarations\SevenTwoCero\DeclValoration;
use App\Models\Services\Declarations\SevenTwoCero\Property720;
use App\Models\Services\Declarations\SevenTwoCero\PropertySubkeyType;
use App\Models\Services\Service;
use App\Models\Services\TaxModels\TaxModel;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\User\Client;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Auth\GenericAuthUserTransformer;
use App\Transformers\Client\ClientMinTransformer;
use App\Transformers\Client\ClientTransformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientDeclaration720Transformer;
use App\Transformers\Client\Services\ModelDeclaration\ClientDraftModelTransformer;
use App\Transformers\Client\Services\ModelDeclaration\ClientModelTransformer;
use App\Transformers\Client\Services\ClientServiceTransformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientProperty720Transformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientPropertyCountryCod720Transformer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ClientController extends Controller
{
    use ApiHelperTrait, UsesTransformerTrait;

    /* CLIENTE */

    public function pagination(Request $request){
        if(intval($request['search_id'])){
            $clients = Client::
                where('id','=',$request['search_id'])
                ->filter(parseRequest($request))
                ->order($request['order'])->paginate($request['per_page']?$request['per_page']:12);
            return $this->respond(ClientTransformer::transformPaginationS($clients)->toArray());
        } else {
            $clients = Client::
            search($request['search'])
                ->filter(parseRequest($request))
                ->order($request['order'])->paginate($request['per_page']?$request['per_page']:12);
            return $this->respond(ClientTransformer::transformPaginationS($clients)->toArray());
        }
    }

    public function show(Request $request, Client $client) {
        $trans = $this->getTransformer(ClientTransformer::class, isset($request['with']) ? $request['with'] : null);
        return $this->respond($trans->transform($client));
    }

    public function store(Request $request) {
        /**Validamos el correo electronico de forma temporal hasta que se decida como será la relacion
         * de clientes entre selfconveyance y cyberconsultores
         **/

        $this->validate($request,[
            'client.email' => ['required',
                         function ($attribute, $value, $fail) {
                            //Comparamos con los usuarios de SC
                            $r=Client::withoutGlobalScope(SourceAppScope::class)
                                ->where('parent_id',null)
                                ->where('email',$value)->count();
                            if ($r) {
                                $fail('validation.email.already_exist_in_the_system');
                            }
                          }
                        ]
        ]);

        $result = DB::transaction(function () use ($request) {
            $data = prepareToEloquent($request['client'], new Client())
                ->put('source_app','ciberconsult')
                ->put('company_id',1)
                ->toArray();
            $client = Client::create($data);
            return $client;
        });
        if($result) {
            return $this->respond(ClientTransformer::transformS($result),201);
        }
        return $this->jsonResponse()->badRequest();
    }

    public function savePassword(Request $request,Client $client){
        $this->validate($request,['password'=>'required|min:4']);
        $client->password=$request['password'];
        $client->save();

        if($request['notify']==true){
             Mail::to($client->email)->send(new NewPassMail($request['password']));
        }

        return $this->jsonResponse()->created();
    }

    public function update (Client $client,Request $request){

         $this->validate($request,[
            'client.email' =>
              [
                'required',
                 function ($attribute, $value, $fail)use ($client) {
                    //Comparamos con los usuarios de SC
                    $r=Client::withoutGlobalScope(SourceAppScope::class)
                        ->root()
                        ->where('id','<>',$client->id)
                        ->where('email',$value)->count();
                    if ($r) {
                        $fail('validation.email.already_exist_in_the_system');
                    }
                  }
              ]
        ]);
        $d = prepareToEloquent($request['client'],new Client())->toArray();
        $client->update($d);

        return $this->respond(ClientTransformer::transformS($client),201);


    }

    public function list()
    {
        return $this->respond(ClientMinTransformer::transformCollectionS(Client::all())->toArray(), 200);
    }

    /* SERVICIOS */

    public function servicesHired(Client $client = null) {
        if(!$client) {
            $client = Auth::guard('clients')->user();
        }
        $user = Auth::user();
        if($client && ($client->id == $user->id || get_class($user) == 'App\Models\User\Employee')) {
            return $this->respond(ClientServiceTransformer::transformCollectionS($client->services)->toArray());
        } else {
            return $this->jsonResponse()->unAuthenticated();
        }
    }

    public function servicesNotHired(Client $client = null) {
        if(!$client) {
            $client = Auth::guard('clients')->user();
        }
        return $this->respond(ClientServiceTransformer::transformCollectionS(Service::whereNotIn('id', $client->services->pluck('id')->toArray())->get())->toArray());
    }

    public function services(Client $client = null) {
        return $this->respond(ClientServiceTransformer::transformCollectionS(Service::all())->toArray());
    }

    public function addService(Request $request,Client $client) {
        $this->validate($request,['service'=>'required|exists:sv_services,id']);

        $hired = $client->services()->wherePivot('service_id',$request->service)->count();

        if($hired){
            return $this->jsonResponse()->badRequest('error.client.service_already_hired');
        }

        $client->services()->attach([$request->service]);
        return $this->jsonResponse()->created();
    }

    public function hireService(Request $request, Service $service) {
//        TODO Hacerlo más eficiente, como se hace con el servicio de contabilidad, como en ClientSvAccountUpload.php:82
        Mail::send(new ClientHireService($service));
        Mail::send(new EmployeeHireService($service));
        return $this->jsonResponse()->created();
    }

}
