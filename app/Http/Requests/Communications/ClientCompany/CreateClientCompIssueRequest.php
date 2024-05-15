<?php

namespace App\Http\Requests\Communications\ClientCompany;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateClientCompIssueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
//        De momento uso el guard de employees, ya que los mensajes de Lexforis se van a enviar registrado como employee
        return (bool) Auth::guard('clients')->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'subject' => 'required',
            'message' => 'required',
        ];
    }
}
