<?php

namespace App\Models\User;

use App\Models\Client\Billing\BillingPeriod;
use App\Models\Communications\ClientCompany\CommClientCompanyIssue;
use App\Models\Foundations\Upload;
use App\Models\Scopes\CompanyScope;
use App\Models\Scopes\SourceAppScope;
use App\Models\Services\Accounting\AccountingInvoice;
use App\Models\Services\Accounting\AccountingNorma43;
use App\Models\Services\Accounting\AccountingOutConfig;
use App\Models\Services\Accounting\AccountingUpload;
use App\Models\Services\Service;
use App\Models\Services\TaxModels\TaxModel;
use App\Models\Services\TaxModels\TaxModelDraft;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Passport\HasApiTokens;
use phpseclib\Crypt\Hash;
use SMartins\PassportMultiauth\HasMultiAuthApiTokens;


class Client extends Authenticatable
{
     use HasMultiAuthApiTokens,Notifiable,SoftDeletes,Billable;

    public const GUARD = 'clients';
    protected $connection = 'sharedb';
    protected  $table = 'clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'operation_id',
        'firstname',
        'lastname',
        'phone',
        'email',
        'lang_id',
        'password',
        'company_id',
        'source_app',
        'activate_token',
        'activated_at',
        'activation_sent_at',
        'identification',
        'identification_type',
    ];

    protected $dates = [
        'last_seen_at',
        'activated_at',
        'activation_sent_at',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $docEntity = 'client';

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new CompanyScope());
//        static::addGlobalScope(new SourceAppScope());
    }

    // Hash automatico
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    //Nombre completo
    public function getFullnameAttribute(){
        return $this->firstname.' '.$this->lastname;
    }

    /* Devuelve la información adicional del cliente */
    public function additionalInfo(){
        return $this->hasOne(ClientInfo::class);
    }

//    TODO Hay que rehacer completamente la relación y las tablas al estilo de Preventivos. De esta forma es un jaleo de registros
    /* Devuelve los servicios de los que dispone el cliente */
    public function services(){
        return $this->belongsToMany(Service::class,'sv_service_client')
            ->withPivot(['value','service_feat','service_id'])
            ->withTimestamps();
            //->using(ServiceFeature::class);
            //->wherePivot('service_feat','=',null);
    }

    /* Devuelve los modelos de los que dispone el cliente */
    public function models(){
        return $this->belongsToMany(TaxModel::class,'sv_models_drafts','client_id','model_id')->whereNull('deleted_at')
            ->withTimestamps();
    }

    /* Devuelve los modelos de los que dispone el cliente */
    public function models_available(){
        return $this->belongsToMany(TaxModel::class,'sv_models_drafts','client_id','model_id')->whereNull('deleted_at')
            ->withTimestamps();
    }

    /* Drafts - Borradores */
    public function drafts(){
        return $this->hasMany(taxModelDraft::class);
    }

    public function svAcctUploads(){
         return $this->hasMany(AccountingUpload::class);
    }

    public function svAcctInvoices(){
         return $this->belongsToMany(Upload::class,'sv_acct_upload','client_id','upload_id')->withPivot(['job_id','invoice_type'])
        ->withTimestamps();
    }
    public function svAcctOutConf($provider=null){
        $r=$this->hasMany(AccountingOutConfig::class);
        if($provider){
            return $r->where('provider',$provider)->first();
        }return $r;
    }
    public function getSvAccTOutDefaultProviderAttribute(){
        $genericConf=$this->svAcctOutConf('generic_conf');
        if(isset($genericConf->config['default_provider'])){
            return $genericConf->config['default_provider'];
        }return null;
    }

    public function parent(){
        return $this->belongsTo(Client::class,'parent_id');
    }

    public function helpIssues() {
        return $this->hasMany(CommClientCompanyIssue::class, 'client_id', 'id');
    }

    public function scopeFilter($q,$data){
        return $q;
    }
    public function scopeRoot($q){
        return $q->where('parent_id',null);
    }
    public function scopeSearch ($q,$term){
        $q->where('firstname','like','%'.$term.'%')
        ->orWhere('lastname','like','%'.$term.'%');
        return $q;
    }
        public function scopeOrder($q, $order) {
        $order = explode(',', $order);
        if(sizeof($order) == 2) {
            $relatedColumn = explode('.',$order[0]);
            if(sizeof($relatedColumn) == 2) {
//                https://zaengle.com/blog/sorting-parent-models-by-a-child-relationship
                $q->with($relatedColumn[0])->select($this->table.'.*', DB::raw('(SELECT '.$relatedColumn[1].' FROM '.$relatedColumn[0].' WHERE '.$this->table.'.upload_id = '.$relatedColumn[0].'.id) as sort'))->orderBy('sort',$order[1]);
            } else {
                return $q->orderBy($order[0], $order[1]);
            }
        }
        return $q;
    }
//    public function changeLang($code){
//        $lang=Language::whereLocale($code)->first();
//        if($lang){
//            $this->lang_id=$lang->id;
//            $this->save();
//            return true;
//        }return false;
//    }

    public function getActivationLinkAttribute() {
        return config('frontapp.client_activation_link') . $this->id;
    }

    public function serviceIsHired($service) {
        if($service instanceof Service) {
            return (bool) $this->services()->where('id', $service->id)->first();
        }
        return (bool) $this->services()->where('id', $service)->first();
    }
}
