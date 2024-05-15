<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 24/04/2017
 * Time: 19:26
 */

namespace App\Http;


class JsonResponses
{

    public function created($message=null){
        $message=$message ? $message : 'Created';
        return response()->json(['message'=>$message],201);
    }

    public function updated($message=null){
        $message=$message ? $message : 'Created';
        return response()->json(['message'=>$message],201);
    }

    public function deleted($message=null){
        $message=$message ? $message : 'Deleted';
        return response()->json(['message'=>$message],204);
    }

    public function validationError(Array $errors ){
        return  response()->json(["message" => "Invalid validation",'errors'=> $errors],422);
    }

    public function badRequest ($error=null,$status=400){
        $error=$error ? $error : 'Bad request';
        return  response()->json(["error" => $error],$status);
    }

    public function unAuthenticated($error=null,$status=401){
        $error=$error ? $error : 'Unauthenticated';
        return  response()->json(["error" => $error],$status);
    }
    public function forbidden($error=null,$status=403){
        $error=$error ? $error : 'forbidden';
        return  response()->json(["error" => $error],$status);
    }
    public function notFound($error=null,$status=404){
        $error=$error ? $error : 'forbidden';
        return  response()->json(["error" => $error],$status);
    }

}