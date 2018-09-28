<?php

namespace App\Http\Requests\Contract;

use App\Http\Controllers\Api\v1\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;

class DeleteContractRequest extends FormRequest
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
            'id' => 'integer|exists:contracts',
        ];
    }
}
