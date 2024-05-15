<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 12/04/2017
 * Time: 11:13
 */

namespace App\Exceptions;


use Exception;
use Illuminate\Support\Facades\Lang;
use Illuminate\Translation\Translator;
use Illuminate\Validation\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ValidationHttpException extends HttpException
{
    protected $errors;

    protected $validator;

    public function __construct(Validator $validator, Exception $previous = null, $headers = [], $code = 0)
    {


        $this->validator=$validator;
        $this->errors=$validator->errors();

        $message="Invalid validation";

        parent::__construct(422, $message, $previous, $headers, $code);
    }

    /**
     * Get the errors message bag.
     *
     * @return \Illuminate\Support\MessageBag
     */
    public function getErrors()
    {

        return $this->formatErrors();
    }

    /**
     * Determine if message bag has any errors.
     *
     * @return bool
     */
    public function hasErrors()
    {
        return ! $this->errors->isEmpty();
    }

    public function formatErrors(){

        $parsedErrors=[];
        foreach ($this->errors->messages() as $k => $e){
            array_push($parsedErrors,['field' => $k,'messages'=>$e]);
        }
        return $parsedErrors;
    }

}