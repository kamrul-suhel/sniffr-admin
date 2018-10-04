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
        if(auth()->user()->role === 'admin') {
            return redirect('admin/clients/');
        }

        $company = Client::find($this->user()->client_id);

        return ($company && ($this->user()->client_id == $company->id));
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
