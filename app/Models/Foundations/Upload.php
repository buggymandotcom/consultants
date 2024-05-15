<?php

namespace App\Models\Foundations;

use App\Models\Document\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Upload extends Model
{
    protected $table = 'upload';
    protected $connection = 'mysql';
    protected $fillable = [
        'repository',
        'mime',
        'extension',
        'original_name',
        'size',
        'path',
//        'uploaded_by',
        'adapter'
    ] ;

//    public function type (){
//        return $this->belongsTo(Document::class,'doc_type_id');
//    }

    public function fullDelete(){
        $this->_deleteFromDisk();
        $this->delete();

    }
    private function _deleteFromDisk(){
        $disk=Storage::disk(config('uploads.default_disk','local'));
        $disk->delete($this->path);
    }
    public function getIsImageAttribute(){
        return preg_match('/image\/*/',strtolower($this->mime));
    }
    public function getIsPdfAttribute(){
        return strtolower($this->mime)=='application/pdf';
    }

//    public function getUrlAttribute() {
//        return Storage::disk($this->repository)->get($this->path);
//    }


}
