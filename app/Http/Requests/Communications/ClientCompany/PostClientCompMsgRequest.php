<?php

namespace App\Http\Requests\Communications\ClientCompany;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostClientCompMsgRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
//        De momento uso el guard de employees, ya que los mensajes de Lexforis se van a enviar registrado como employee
//        return Auth::guard('clients')->user() || Auth::guard('companies')->check();
        return Auth::guard('clients')->user() || Auth::guard('employees')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'message' => 'required',
        ];
    }
}
