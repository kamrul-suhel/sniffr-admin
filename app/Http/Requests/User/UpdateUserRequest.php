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
        return [
            'username' => 'required|string',
            'password' => 'nullable|string|min:6',
            'email' => 'required|email',
            // 'client_id' => 'required_if:role,client|integer',
            'file' => 'file|mimes:jpg,gif,png|min:1|max:500000',
        ];
    }
}
