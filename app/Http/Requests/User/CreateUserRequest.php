<?php

namespace App\Http\Requests\User;

use App\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    use FrontendResponse;

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
        return [
            'email' => 'required|email|unique:users',
            'client_id' => 'required_if:role,client',
            'file' => 'file|mimes:jpg,gif,png|min:1|max:500000',
        ];
    }
}
