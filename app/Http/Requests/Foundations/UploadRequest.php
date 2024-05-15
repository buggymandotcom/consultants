<?php

namespace App\Http\Requests\Foundations;

use App\Http\Requests\CustomFormRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $availableTypes=array_keys(config('uploads.adapters'));
        return [
            'type' => ['required',Rule::in($availableTypes)],
            'client_id' => 'required_if:type,CLIENTS_SV_ACCT|integer',
            'billing_period_id' => 'required_if:type,CLIENTS_SV_ACCT|integer'
           // 'doc_type_id' => 'required|exists:doc_type,id',
            //User
//            'user_id' => 'required_if:type,USERS|integer|exists:users,id',
//
//            //Operation
//            'operation_id' => 'required_if:type,OPERATIONS|integer|exists:operation,id',
//
//            //Property
//            'property_id' => 'required_if:type,PROPERTIES|integer|exists:property,id',
        ];
    }
}
