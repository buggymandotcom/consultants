<?php

namespace App\Http\Controllers;

use App\Mail\Client\ActivateAccountMail;
use App\Models\Services\TaxModels\TaxModelDraft;
use App\Models\Services\TaxModels\Types\ModelSevenTwoZero;
use App\Models\User\Client;
use App\Models\User\NormalClient;
use App\Models\User\Property\AcquirerOperation;
use App\Models\User\Property\Property;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Client\Services\ModelDeclaration\PropertyTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TestjlController extends Controller
{
    use ApiHelperTrait, UsesTransformerTrait;

    public function testjl(Request $request) {
//        dd("asd");
        $client = Client::orderBy('id', 'desc')->first();
        Mail::send(new ActivateAccountMail($client));
        return new ActivateAccountMail($client);
        dd("Fin");
//        $draft = TaxModelDraft::find(38);
        $draft = TaxModelDraft::find(45);

//        ModelSevenTwoZero::buildStringS($draft);
        $draft->modelT->buildString($draft);
    }

    /*

        PROVISIONAL
    */
    public function getProperties(Request $request)
    {

        /*
            - Se trata de obtener la propiedad que pueda estar vinculada al cliente en función de las operaciones de adquisión de la base de datos de lexforis:
            1) Buscaremos en la tabla de operaciones de aquisición "opt_acquirer_prop" un cliente y obtendremos la propiedad vinculada
            2) A partir del identificador de propiedad obtendremos los datos de la misma

             OJO hay que buscar el cliente en la base de datos cuyo identificador sea su parent_id

         */

        /* Obtener las instantáneas del cliente: Los clientes que son instantáneas aseguran que tienen operaciones asignadas */
        $client_snapshot = NormalClient::where('parent_id', '=', $request['client_id'])->get();

        /* Obtenemos el array de operaciones (de adquisición) asociadas a las instantáneas del cliente */
        $operations = $client_snapshot->map(function ($client) {
            return AcquirerOperation::where('client_id', '=', $client->id)->get();
        });


        if ($operations->count() > 0) {
            $properties = $operations[0]->map(function ($op) {
                return Property::where('id', '=', $op->property_id)->get();
            });

            if ($properties->count() > 0) {
                $trans = $this->getTransformer(PropertyTransformer::class, null);
                return $this->respond($trans->transformCollection($properties[0])->toArray());
            }
        }

        return 0;

    }
}
