<?php

namespace App\Http\Controllers\Foundations;

use App\Exports\Foundations\TranslationsExport;
use App\Http\Requests\Foundations\TranslationRequest;
use App\Imports\Foundations\TranslationsImport;
use App\Models\Foundations\Translation;
use App\Traits\ApiHelperTrait;
use App\Transformers\Foundations\GroupTransTransformer;
use App\Transformers\Foundations\TransTransformer;
use function Aws\map;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\Facades\Excel;
use \Waavi\Translation\Repositories\LanguageRepository;
use \Waavi\Translation\Repositories\TranslationRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


Class TranslationController extends Controller {
    use ApiHelperTrait;

    private $languageRepository;
    private $translationRepository;

    public function __construct(TranslationRepository $translationRepository, LanguageRepository $languageRepository) {
        $this->translationRepository = $translationRepository;
        $this->languageRepository = $languageRepository;

    }

    public function getLanguages() {
        return $this->languageRepository->availableLocales();
    }

    //params locale, name.
    public function createLanguage(Request $request) {
        if ($this->languageRepository->create($request->all()))
            return "ok";
        else
            return "error al crear";
    }

    public function getTranslations($loc) {
        //$loc = locale_get_primary_language(null);
        //return $loc;

        $untrated=$this->translationRepository->allByLocale($loc);


        $final=$this->mapTranslations($untrated);

        return $this->respond($final->toArray(),200);

    }

    public function allTransForManager (Request $request ,$lang){
        $untrated=$this->translationRepository->search($lang,$request->search);
        $clean=new Collection();
        $untrated->groupBy('group')->map(function($item)use($clean){
            $clean->push(['name' => $item->first()->group , 'translations' => TransTransformer::transformCollectionS($item)]);
        });
        return $this->respond($clean->toArray());
    }

    public function createManyTranslations(Request $request){

        foreach ($request->translations as $tr){
            $keyParsed = $this->parseKey($tr['key']);
            $newTrans = array_merge($keyParsed, [
                "text" => $tr['text'],
                "locale" => $tr['lang'],
                "namespace" => '*',
                "unstable" => 0,
            ]);
            $existTrans = Translation::whereGroup($keyParsed['group'])->whereItem($keyParsed['item'])->whereLocale($tr['lang'])->first();
            if ($existTrans) {
                $existTrans->update($newTrans);
            } else {
                Translation::create($newTrans);
            }
            //Generador de seed


        }
        if(env('APP_ENV')=='local'){$this->generateSeedDev();}
        return $this->jsonResponse()->created();

    }




    public function createTranslation(TranslationRequest $request)
    {
        try {
            $keyParsed = $this->parseKey($request->key);
            $newTrans = array_merge($keyParsed, [
                "text" => $request->text,
                "locale" => $request->lang,
                "namespace" => '*',
                "unstable" => 0,
            ]);
            $existTrans = Translation::whereGroup($keyParsed['group'])->whereItem($keyParsed['item'])->whereLocale($request->lang)->first();
            if ($existTrans) {
                $existTrans->update($newTrans);
            } else {
                Translation::create($newTrans);
            }
            //Generador de seed
            if(env('APP_ENV')=='local'){$this->generateSeedDev();}
            return $this->jsonResponse()->created();

        } catch (\Exception $e) {
            return $this->jsonResponse()->badRequest('Translation could not be created: ' . $e->getMessage());
        }
    }




    public function deleteTranslation(Translation $translation){
       if($translation->delete()){
           return $this->jsonResponse()->created();
       }return $this->jsonResponse()->badRequest('Translation could not be deleted');
    }

    public function updateTranslation(Request $request) {
        $translations=$request->translations;
        foreach ($translations as $trans){

            $objTrans=Translation::find($trans['id']);
            $objTrans->text=$trans['text'];
            $objTrans->save();
        }
        //Generador de seed
        if(env('APP_ENV')=='local'){$this->generateSeedDev();}

        return $this->jsonResponse()->created();

        
    }

    private function mapTranslations(Collection $collection){
        return $collection->groupBy('group')->map(function ($trans){

            $parent = new Collection();

            $r=$trans->map(function (\Waavi\Translation\Models\Translation $transItem)use ($parent) {
                $parent->put($transItem->item,replaceParamsTrans($transItem->text));
            });
            return $parent;

        });


    }


    private function parseKey($key):array {
        $exploded=explode('.',trim($key));
        if(count($exploded)<2){
            throw new \Exception('Invalid key');
        }
        if(count($exploded)>=2){
            if($exploded[1]==""){
                throw new \Exception('Invalid key');
            }
            $group=$exploded[0];
            unset($exploded[0]);
            return ['group' => $group ,'item' => join('.',$exploded)];

        }throw new \Exception('Invalid key');

    }

    private function generateSeedDev(){
        Artisan::call('iseed',['tables'=>'translator_translations','--force'=>true]);
    }


    public function uploadTranslations(Request $request){

        $f = $request->file('file');

        Artisan::call('snapshot:create',['trans_upload_'.now()->toDateTimeString()]);

        Excel::import(new TranslationsImport,$f);

        Artisan::call('iseed',['tables'=>'translator_translations','--force'=>true]);

        return $this->jsonResponse()->created();

    }

    public function getTranslationsExcel(){
         return Excel::download(new TranslationsExport(), 'trans_'.now()->toDateTimeString().'.xlsx');
    }

    public function changeLang(Request $request , $lang){
         if($l=$this->languageRepository->findByLocale($lang)){
             $u=user();
             $u->update(['lang_id'=>$l->id]);
             return $this->jsonResponse()->created();
         }return $this->jsonResponse()->badRequest();
    }
}