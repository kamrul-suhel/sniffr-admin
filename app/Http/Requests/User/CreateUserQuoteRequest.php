<?php

namespace App\Http\Requests\User;

use App\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class CreateUserQuoteRequest extends FormRequest
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
            'user_email' => 'required|email|unique:users,email',
            'company_name' => 'required|unique:clients,name',
        ];
    }

    public function response(array $errors)
    {
        return response()->json([
            'error' => 'true',
            'errors' => [$errors],
            'error_message' => 'There are validation errors',
        ], 200);
    }

}
