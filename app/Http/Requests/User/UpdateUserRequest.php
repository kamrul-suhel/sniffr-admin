<?php

namespace App\Http\Requests\User;

use App\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $passwordValidation = 'required|string|min:8';
        if(request()->segment(1) === 'admin') {
            $passwordValidation = 'nullable|string|min:8';
        }
        return [
            'password' => $passwordValidation,
            'email' => 'required|email',
            'client_id' => 'required_if:role,client',
            'file' => 'file|mimes:jpg,gif,png|min:1|max:500000',
        ];
    }
}
