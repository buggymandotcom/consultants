<?php

namespace App\Traits;




use App\Http\JsonResponses;
use Symfony\Component\HttpFoundation\StreamedResponse;

trait ApiHelperTrait {

    public function respond(Array  $data,$statusCode=200){
        return response()->json($data,$statusCode);
    }

    public function jsonResponse():JsonResponses{
        return new JsonResponses();
    }

    public function respondDownload($fileContent, $fileName, $mime,$disposition='attachment')
    {
        return (new StreamedResponse(function() use ($fileContent)
        {
            echo $fileContent;
        }, 200, [
            'Content-Type' => $mime,
            'Content-Disposition' => $disposition.'; filename="'.$fileName.'"'
        ]));
    }


}
