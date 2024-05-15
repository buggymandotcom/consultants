<?php
/**
 * Created by PhpStorm.
 * User: Jose
 * Date: 12/04/2017
 * Time: 11:12
 */

namespace App\Http\Requests;



use App\Exceptions\ValidationHttpException;
use Illuminate\Contracts\Validation\Validator;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Http\FormRequest as IlluminateFormRequest;


class CustomFormRequest extends IlluminateFormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @return void
     */

    protected $defaultMessages=Array();

    protected function failedValidation(Validator $validator)
    {

        if ($this->container['request'] instanceof Request) {
            throw new ValidationHttpException($validator);
        }
        parent::failedValidation($validator);
    }

    /**
     * Handle a failed authorization attempt.
     *
     * @return void
     */
    protected function failedAuthorization()
    {
        if ($this->container['request'] instanceof Request) {
            throw new HttpException(403);
        }

        parent::failedAuthorization();
    }




}