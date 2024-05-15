<?php

namespace App\Models\Services\Accounting;

use App\Models\Client\Billing\BillingPeriod;
use App\Models\Foundations\Job;
use App\Models\Foundations\Upload;
use App\Models\User\Client;
use App\Traits\SearchModelTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AccountingUpload extends Model
{
    use SearchModelTrait;
    protected $table = 'sv_acct_upload';
    protected $dates = [
        'cancelled_at',
        'sent_at',
        'c_comment_at'
    ];
    protected $fillable = [
        'status',
        'invoice_type',
        'error',
        'job_id',
        'sent_at',
        'cancelled_at',
    ];
    protected $searchable = [
        'created_at',
        'invoice_type'
    ];
    protected $connection = 'mysql';
    protected $casts = [
        'error' => 'array',
    ];

    public function client (){
        return $this->belongsTo(Client::class);
    }

    public function billingPeriod(){
        return $this->belongsTo(BillingPeriod::class);
    }

    public function upload() {
        return $this->belongsTo(Upload::class, 'upload_id', 'id');
    }

    public function job (){
        return $this->belongsTo(Job::class);
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

    public function scopeType($q, $type) {
        if(is_array($type)) {
            return $q->whereIn('invoice_type', $type);
        } else {
            return $q->where('invoice_type', $type);
        }
    }

    public function scopeSearch ($q,$term){
        $q->whereHas('upload', function($q) use($term) {
            $nQ="";
            $rNQ="";
            foreach (explode(' ',$term ) as $t){
                $nQ.='%'.$t.'%';
            }
            foreach (array_reverse(explode(' ',$term )) as $t){
                $rNQ.='%'.$t.'%';
            }
            $q->where(function ($q) use ($nQ, $rNQ) {
                $q->where('original_name','like',$nQ);
                $q->orWhere('original_name','like',$rNQ);
            });
        });
        return $q;
    }

    public function scopeFilter(Builder $q,$data){
//        $counter = 0;
        foreach($data as $f => $value) {
            if($value) {
                if(in_array($f, $this->searchable)) {
                    if(is_array($value)) {
                        if(($f == 'created_at' || $f == 'updated_at' || in_array($f,$this->dates)) && sizeof($value) == 2) {
                            if($value[0] && $value[0] == $value[1]) {
                                $q->whereBetween($f,[$value[0]->toDateTimeString(), $value[0]->addDay()->toDateTimeString()]);
//                            $q->where($f,$value[0]->toDateString());+
                            } else {
                                if($value[0]) {
                                    $q->where($f,'>=',$value[0]->toDateTimeString());
                                }
                                if($value[1]) {
                                    $q->where($f,'<=',$value[1]->toDateTimeString());
                                }
                            }
                        } else {
                            $q->whereIn($f,$value);
                        }
                    } else {
                        $q->where($f,$value);
                    }
                }
            }
        }
        return $q;
    }


    public function setComment($message){
        $this->c_comment=$message;
        $this->c_comment_at=now();
        $this->save();
    }
}
