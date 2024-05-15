<?php

namespace App\Http\Controllers\Foundations;

use App\Models\Foundations\GeoSpain\SpainMunicipality;
use App\Models\Foundations\GeoSpain\SpainProvince;
use App\Traits\ApiHelperTrait;
use App\Transformers\Foundations\GeoSpain\SpainMunicipalityTransformer;
use App\Transformers\Foundations\GeoSpain\SpainProvinceTransformer;
use App\Transformers\Localization\ProvinceTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class GeoSpainController extends Controller
{
    use ApiHelperTrait;
    public function sync() {
        $client = new Client(['verify' => false]);
        $urlProvinces = "https://servicios.ine.es/wstempus/js/ES/VALORES_VARIABLE/115";
        $urlMunicipalities = "https://servicios.ine.es/wstempus/js/ES/VALORES_VARIABLE/19";

        $result = DB::transaction(function () use($client, $urlProvinces, $urlMunicipalities) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            SpainMunicipality::truncate();
            SpainProvince::truncate();

            $resProvinces = $client->get($urlProvinces);
            $provinces = collect(json_decode($resProvinces->getBody()->getContents()));
            $provinces->each(function ($p) {
                if((int) $p->Codigo) {
                    SpainProvince::create([
                        'id' => $p->Id,
                        'name' => $p->Nombre,
                        'code' => $p->Codigo
                    ]);
                }
            });

            $resMunicipalities = $client->get($urlMunicipalities);
            $municipalities = collect(json_decode($resMunicipalities->getBody()->getContents()));
            $municipalities->each(function ($m) {
                $prov = SpainProvince::findByMunicipalityCode($m->Codigo);
                if($prov) {
                    $prov->municipalities()->create([
                        'id' => $m->Id,
                        'name' => $m->Nombre,
                        'code' => $m->Codigo
                    ]);
                }
            });

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            return true;
        });

        dd($result ? 'Bien' : 'Error?');
    }

    public function indexProvinces() {
        return $this->respond(SpainProvinceTransformer::transformCollectionS(SpainProvince::orderBy('name','asc')->get())->toArray());
    }

    public function indexMunicipalities(SpainProvince $province) {
        return $this->respond(SpainMunicipalityTransformer::transformCollectionS($province->municipalities()->orderBy('name','asc')->get())->toArray());
    }
}
