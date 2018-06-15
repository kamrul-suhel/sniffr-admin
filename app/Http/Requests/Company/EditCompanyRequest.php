<?php

namespace App\Http\Requests\Company;

use App\Client;
use Illuminate\Foundation\Http\FormRequest;

class EditCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $company = Client::find($this->user()->client_id);

        return (($company && ($this->user()->id == $company->account_owner_id)));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }
}
