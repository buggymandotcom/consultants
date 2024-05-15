<?php

namespace App\Http\Controllers\Client\Services\TaxModels;

use App\Mail\Client\DeclarationPaymentInfoMail;
use App\Models\Services\Declarations\SevenTwoCero\CountryCode;
use App\Models\Services\Declarations\SevenTwoCero\Declaration720;
use App\Models\Services\Declarations\SevenTwoCero\DeclValoration;
use App\Models\Services\Declarations\SevenTwoCero\Property720;
use App\Models\Services\Declarations\SevenTwoCero\PropertySubkeyType;
use App\Models\Services\TaxModels\TaxModel;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\Services\TaxModels\TaxModelTrans;
use App\Models\User\Client;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Client\Services\ModelDeclaration\ClientDraftModelTransformer;
use App\Transformers\Client\Services\ModelDeclaration\ClientModelTransformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientDeclaration720Transformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientProperty720Transformer;
use App\Transformers\Client\Services\ModelDeclaration\SevenTwoCero\ClientPropertyCountryCod720Transformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class TaxModelsController extends Controller
{
    use ApiHelperTrait, UsesTransformerTrait;

    /* MODELOS */
    public function modelsAvailables(Client $client){

        $user = Auth::user();

        if($client->id == $user->id || get_class($user) == 'App\Models\User\Employee' ){
            $models = TaxModel::whereIn('id', function ($query) use ($client){
                $query->select('model_id')
                    ->from('sv_models_drafts')
                    ->where('client_id','=',$client->id)
                    ->whereNull('deleted_at')
                    ->distinct();
            })->get();

            return $this->respond(ClientModelTransformer::transformCollectionS($models)->toArray());
        } else return $this->jsonResponse()->unAuthenticated();

    }

    public function updateDraft(TaxModelDraft $draft, Request $request){
        $currentDraft = TaxModelDraft::find($draft->id);
        $data = prepareToEloquent($request['draft'], new TaxModelDraft())->toArray();

        $currentDraft->update($data);

        if($currentDraft->state == 'complete'){
            /* Send Mail */
            Mail::send(new DeclarationPaymentInfoMail($currentDraft->declaration,$currentDraft->client,$currentDraft));
        }

        $trans = $this->getTransformer(ClientDraftModelTransformer::class, null);
        return $this->respond($trans->transform($currentDraft));
    }

    public function modelsHired(Client $client) {
        return $this->respond(ClientModelTransformer::transformCollectionS($client->models)->toArray());
    }

    public function modelsAvailable(Client $client) {
        return $this->respond(ClientModelTransformer::transformCollectionS(TaxModel::whereNotIn('id',$client->models->pluck('id')->toArray())->get())->toArray());
    }

    public function delModel(Client $client,Request $request) {

        /* Hay que hacer softDelete de todos los borradores que pudiesen existir */
        DB::table('sv_models_drafts')
            ->where('client_id','=',$client->id)
            ->where('model_id','=',$request['taxModel'])
            ->update(array('deleted_at' => Carbon::now()));
    }

    /* BORRADORES */

    public function drafts(Request $request) {
        $per_page=$request['per_page']?:4;

        if($request['model']) {
            $drafts = TaxModelDraft::
            where([['client_id', '=', $request['client']], ['deleted_at', '=', null], ['model_id', '=', $request['model']]])
                ->order($request['order'])
                ->paginate($per_page);
        } else {
            $drafts = TaxModelDraft::
            where([['client_id', '=', $request['client']], ['deleted_at', '=', null]])
                ->order($request['order'])
                ->paginate($per_page);
        }
        $trans = $this->getTransformer(ClientDraftModelTransformer::class,null);
        return $this->respond($trans->transformPagination($drafts)->toArray());
    }

    public function addDraft(Client $client, Request $request){

        $user = Auth::user();

        if($client->id == $user->id || get_class($user) == 'App\Models\User\Employee' ){
            $newDraft = DB::transaction(function () use ($request) {
                $data = prepareToEloquent($request['draft'], new TaxModelDraft())->toArray();
                $draft = TaxModelDraft::create($data); //Esto ya crea los timestamp
                return $draft;
            });
            if($newDraft){
                $trans = $this->getTransformer(ClientDraftModelTransformer::class,null);
                return $this->respond($trans->transform($newDraft));
            } else return $this->jsonResponse()->badRequest();
        } else return $this->jsonResponse()->unAuthenticated();

    }

    public function delDraft(Client $client, Request $request){
        TaxModelDraft::find($request['draft_id'])->delete();
        return $this->jsonResponse()->deleted();
    }

    public function addModel(Client $client,Request $request) {

//        /* Si hubiese borradores los activamos */
//        $affected = $client->drafts()
//            ->where('model_id','=',$request['taxModel'])
//            ->delete();
//
//        /* Si no hay borradores, damos de alta uno */
//        if($affected == 0){
//            /* Hay que añadir un borrador */
//            DB::table('sv_models_drafts')
//                ->insert(
//                    ['client_id' => $client->id, 'model_id' => $request['taxModel']]
//                );
//        }

        /* Añadir borrador */
        $newDraft = DB::transaction(function () use ($request) {
            $data = prepareToEloquent($request['draft'], new TaxModelDraft())->toArray();
            $draft = TaxModelDraft::create($data); //Esto ya crea los timestamp
            return $draft;
        });

        return $this->jsonResponse()->created();
    }

    function getDraft(TaxModelDraft $draft){
        $trans = $this->getTransformer(ClientDraftModelTransformer::class,null);
        return $this->respond($trans->transform($draft));
    }

    /* DECLARACIONES */

    /*
        Esta función devuelve la declaración asociada al borrador. Si existe declaración (el borrador se acaba de crear) entonces se
        crea una declaración nueva y se le asocia el cliente y el borrador.

    */
    public function declaration720(Client $client, Request $request){
        $declaration = Declaration720::query()->where('draft_id','=',$request['draft_id'])->first();

        /* Si no existe declaración la creamos con los datos que proceden */
        if($declaration == null){

            /* Crear declaración */
            $declaration = DB::transaction(function () use ($client, $request) {
                $data = prepareToEloquent(new Declaration720(), new Declaration720())->toArray();
                $data['declarant_id'] = $client->id;
                $data['draft_id'] = $request['draft_id'];
                $data['person_contact_name'] = '';
                $data['person_contact_phone'] = '';
                $d = Declaration720::create($data);
                return $d;
            });

        }

        $trans = $this->getTransformer(ClientDeclaration720Transformer::class, isset($request['with']) ? $request['with'] : null);
        return $this->respond($trans->transform($declaration));
    }

    /*
        Guardar declaración SevenTwoCero
    */
    public function saveDeclaration720(Client $client, Request $request){

        /* Declaración  */
        $declaration = Declaration720::find($request['declaration_id']);
        $data = prepareToEloquent($request['declaration'], new Declaration720())->toArray();

        /* Comprobar valoraciones */
        $val1 = new DeclValoration($data["valoration1_id"]);
        $val2 = new DeclValoration($data["valoration2_id"]);

        if($val1->value){
            $valoration1 = DeclValoration::find($val1->id);
            if($valoration1) {
                $valoration1->update($val1->toArray()); //Actualiza
                $data['valoration1_id'] = $valoration1->id;
            } else {
                $newValoration = DeclValoration::create($val1->toArray()); //Crea
                $data['valoration1_id'] = $newValoration->id;
            }
        } else $data['valoration1_id'] = null;

        if($val2->value) {
            $valoration2 = DeclValoration::find($val2->id);
            if($valoration2) {
                $valoration2->update($val2->toArray()); //Actualiza
                $data['valoration2_id'] = $valoration2->id;
            } else {
                $newValoration = DeclValoration::create($val2->toArray()); //Crea
                $data['valoration2_id'] = $newValoration->id;
            }
        } else $data['valoration2_id'] = null;


        $declaration->update($data);

        /* Devolvemos la nueva declaración con los campos que proceden */
        $trans = $this->getTransformer(ClientDeclaration720Transformer::class, ['declarant','draft','properties','valoration1','valoration2']);
        return $this->respond($trans->transform($declaration));
    }

    /*
        Guardar propiedad
    */
    public function updateProperty720(Property720 $property, Request $request){
        $property = Property720::find($request['property_id']);
        $data = prepareToEloquent($request['property'], new Property720())->toArray();

        /* Comprobar valoraciones */
        $val1 = new DeclValoration($data["valoration1_id"]);
        $val2 = new DeclValoration($data["valoration2_id"]);

        if($val1->value){
            $valoration1 = DeclValoration::find($val1->id);
            if($valoration1) {
                $valoration1->update($val1->toArray()); //Actualiza
                $data['valoration1_id'] = $valoration1->id;
            } else {
                $newValoration = DeclValoration::create($val1->toArray()); //Crea
                $data['valoration1_id'] = $newValoration->id;
            }
        } else $data['valoration1_id'] = null;

        if($val2->value) {
            $valoration2 = DeclValoration::find($val2->id);
            if($valoration2) {
                $valoration2->update($val2->toArray()); //Actualiza
                $data['valoration2_id'] = $valoration2->id;
            } else {
                $newValoration = DeclValoration::create($val2->toArray()); //Crea
                $data['valoration2_id'] = $newValoration->id;
            }
        } else $data['valoration2_id'] = null;

        /* Hay que procesar estos campos */
        $cc = new CountryCode($data["country_cod"]);
        $data['country_cod'] = $cc->id;
        $cca = new CountryCode($data["country_address_cod"]);
        $data['country_address_cod'] = $cca->id;
        $pkt = new PropertySubkeyType($data["property_subkey_type"]);
        $data['property_subkey_type'] = $pkt->id;
        $date1 = new Carbon($data['incorporation_date']);
        $data['incorporation_date'] = $date1;
        $date2 = new Carbon($data['extinction_date']);
        $data['extinction_date'] = $date2;

//        var_dump($data);

        //Update
        $property->update($data);

        return $this->jsonResponse()->updated();
    }

    /*
        Obtener representante de la declaración 720
    */
    public function property720(Property720 $property, Request $request){
        $property = Property720::find($property->id);
        $trans = $this->getTransformer(ClientProperty720Transformer::class, isset($request['with']) ? $request['with'] : null);
        return $this->respond($trans->transform($property));
    }

    public function addProperty720(Declaration720 $declaration){
        $d = Declaration720::find($declaration->id);
        $data = prepareToEloquent(new Property720(), new Property720())->toArray();
        $data['declaration_id'] = $d->id;

        $property = Property720::create($data);
        $properties = $d->properties()->get();

        $trans = $this->getTransformer(ClientProperty720Transformer::class, ['representative','subkey_type','country_cod','valoration1','valoration2']);
        return $this->respond($trans->transformCollection($properties)->toArray());
    }

    public function removeProperty720(Property720 $property, Request $request){
        $prop = Property720::find($property->id);
        $prop->delete();

        $d = Declaration720::find($request['declaration_id']);
        $properties = $d->properties()->get();
        $trans = $this->getTransformer(ClientProperty720Transformer::class, ['representative','subkey_type','country_cod','valoration1','valoration2']);
        return $this->respond($trans->transformCollection($properties)->toArray());
    }

    public function getCountries(){
        $countries = CountryCode::all();
        $trans = $this->getTransformer(ClientPropertyCountryCod720Transformer::class);
        return $this->respond($trans->transformCollection($countries)->toArray());
    }

    public function exportDraft(TaxModelDraft $draft) {
        if(!$draft->deleted_at) {
            $model = $draft->modelT;
            $result = $model->buildString($draft);
            $path = storage_path('app/ciberconsultores/drafts/'.$draft->id.'.txt');
            $file = file_put_contents($path, $result);
            return response()->download($path)->deleteFileAfterSend(true);
        }
        return $this->jsonResponse()->notFound();
    }
}
