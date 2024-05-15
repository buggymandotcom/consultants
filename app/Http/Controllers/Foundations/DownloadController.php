<?php

namespace App\Http\Controllers\Foundations;

use App\Models\Foundations\Upload;
use App\Traits\ApiHelperTrait;
use App\Transformers\Foundations\UploadTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    use ApiHelperTrait;

    public function download (Upload $upload){
        /*if(!userFromJWT()->can('download',$upload)){
            return $this->jsonResponse()->forbidden();
        }*/
        //Obtener archivo resuesta de tipo download
        $filename=Storage::disk($upload->repository)->get($upload->path);

        return $this->respondDownload($filename, $upload->original_name, $upload->mime,'inline');

    }

    public function requestUrl(Upload $upload){
        /*if(!userFromJWT()->can('download',$upload)){
            return $this->jsonResponse()->forbidden();
        }*/
        $url = Storage::disk($upload->repository)->url($upload->path);
        return $this->respond(['url' => asset($url)]);

    }


    public function requestDownload(Upload $upload){
        /*if(!user()->can('download',$document)){
            return $this->jsonResponse()->forbidden();
        }
        $token=user()->createJwt(Carbon::now()->addSeconds(120));*/

        return $this->respond([
            'doc' => UploadTransformer::transformS($upload),
//            'url' => url("api/download/".$upload->id."/download?token=".$token)
            'url' => url("api/download/".$upload->id."/download")
        ]);

    }
}
