<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class RegisterClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
//        TODO Hacer bien esto y no este apaño, cuando se rehaga la autenticación
        try {
            if(user()) {
                return false;
            }
        } catch (AuthenticationException $e) {}

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string',
            'password' => 'required|confirmed'
        ];
    }
}
