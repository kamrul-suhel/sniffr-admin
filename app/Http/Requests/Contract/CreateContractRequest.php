<?php

namespace App\Http\Requests\Contract;

use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;

class CreateContractRequest extends FormRequest
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
            'revenue_share' => 'integer|max:100|nullable',
            'upfront_payment' => 'integer|nullable',
            'success_system' => 'integer|nullable',
            'credit' => 'string|nullable',
        ];
    }
}
