<?php


use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\RequestParser;

function user(){
    return \Illuminate\Support\Facades\Auth::user();


    $guard=request()->header('app-guard');
    $allowed=collect(array_keys(config('auth.guards')))->filter(function($i){if($i=='web')return false;return true;})->toArray();
    if(!in_array($guard,$allowed)){
        throw new Exception('Guard especified not found');
    }
    $user=\Illuminate\Support\Facades\Auth::guard($guard)->user();
    if($user)return $user;
    throw new \Illuminate\Auth\AuthenticationException('User not found');
}

function userFromJWT(){
    return JWTAuth::parseToken()->authenticate();
}

function dateBetween($date,$from,$to){
	$date=new Carbon\Carbon($date);
	return $date->between(new \Carbon\Carbon($from),new \Carbon\Carbon($to));
}

function merge_company(Array $data){
    return array_merge(['company_id'=>user()->company_id],$data);
}

// Hash para la subida para el nombre en la subida de artchivos

function uploadHash():string {
	return md5(mt_rand(1,99999).\Carbon\Carbon::now());
}

function replaceParamsTrans($text){
    return preg_replace('/\:([a-zA-Z]+)([\s,.:;])?/', '{{$1}}$2',$text);
}

function prepareToEloquent($data,Model $model):RequestParser{
        $parser = RequestParser::instance($data,$model);
        return $parser->onlyFillables()->parseDates();
}

function tokenFromRequest(){
    $exploded  = explode('Bearer',trim(request()->header('authorization')));
    if (isset($exploded[1])){
        return trim($exploded[1]);
    }return null;
}

function findModelId($model,$id){

   $model= strtolower($model);
   $availableEntities = config('foundations.ENTITIES');

   if(isset($availableEntities[$model])){
        $model = new $availableEntities[$model] ();
        if(usesSoftDelete($model)){
            $res=$model->withTrashed()->findOrFail($id);
        }else{
            $res = $model->findOrFail($id);
        }
        return $res;
   }else{
       throw new Exception('Entity not found');
   }

}



function customdate(\Carbon\Carbon $date):\Jenssegers\Date\Date{
    return new Jenssegers\Date\Date($date);
}

function guardFromHead(){
    return request()->header('app-guard');
}

function usesSoftDelete($class){
    return in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($class));
}


if (!defined('getOptionVal')) {
    function getOptionVal($key) {
        return \App\Models\Foundations\Settings\Option::val($key);
    }
}
if (!defined('getValOr')) {
    function getValOr($key, $default) {
        if ($val = getOptionVal($key)) {
            return $val;
        } return $default;
    }
}

function appVersionFromFile (){
    try {
         return json_decode(\Illuminate\Support\Facades\File::get(storage_path('appinfo.json')),true)['version'];
    }catch (Exception $e){
         return null;
    }
}
function formatCurrency($price, $decimals = 2) {
    setlocale(LC_ALL,config('locales')[app()->getLocale()]);
    $locale = localeconv();
    setlocale(LC_ALL, null);
    return number_format($price,$decimals,
            $locale['decimal_point'],
            $locale['thousands_sep']) . ' &euro;';
}

function parseRequest(\Illuminate\Http\Request $request, $dates_attrs = ['created_at','updated_at']) {
    $data = collect($request->only($dates_attrs));
    $dates= $data->map(function($item){
        if($item){
            if(is_array($item)) {
                return collect($item)->map(function($date) {
                    if($date && (bool)strtotime($date)) {
                        $d = new \Carbon\Carbon($date);
                        $d->timezone(config('app.timezone'));
                        return $d;
                    }
                    return null;
                })->toArray();
            } else {
                $d = new \Carbon\Carbon($item);
                $d->timezone(config('app.timezone'));
                return $d;
            }
        }
    });
    return collect($request->all())->merge($dates);
}

