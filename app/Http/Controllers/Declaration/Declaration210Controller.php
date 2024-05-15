<?php

namespace App\Http\Controllers\Declaration;

use App\Models\Services\Declarations\SevenTwoCero\CountryCode;
use App\Models\Services\Declarations\SevenTwoCero\Declaration720;
use App\Models\Services\Declarations\TwoOneCero\Declaration210;
use App\Models\User\Client;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Client\Services\ModelDeclaration\TwoOneCero\ClientDeclaration210Transformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class Declaration210Controller extends Controller
{

    use ApiHelperTrait, UsesTransformerTrait;

    public function getDeclaration(Client $client, Request $request){

        $declaration = Declaration210::query()->where('draft_id','=',$request['draft_id'])->first();

        /* Si no existe declaración la creamos con los datos que proceden */
        if($declaration == null){

            /* Crear declaración */
            $declaration = DB::transaction(function () use ($client, $request) {
                $data = prepareToEloquent(new Declaration210(), new Declaration210())->toArray();
                $data['declarant_id'] = $client->id;
                $data['draft_id'] = $request['draft_id'];
                $d = Declaration210::create($data);
                return $d;
            });

        }

        $trans = $this->getTransformer(ClientDeclaration210Transformer::class, isset($request['with']) ? $request['with'] : null);
        return $this->respond($trans->transform($declaration));
    }

    public function saveDeclaration(Declaration210 $declaration, Request $request){

        $currentDeclaration = Declaration210::find($declaration->id);
        $data = prepareToEloquent($request['declaration'], new Declaration210())->toArray();

//        var_dump($data['entry_payment_method']);

        $currentDeclaration->update($data);

        /* Devolvemos la nueva declaración con los campos que proceden */
        $trans = $this->getTransformer(ClientDeclaration210Transformer::class, ['declarant','draft']);
        return $this->respond($trans->transform($currentDeclaration));
    }
}
