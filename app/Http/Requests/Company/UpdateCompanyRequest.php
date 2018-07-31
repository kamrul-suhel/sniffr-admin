<?php

namespace App\Http\Requests\Company;

use App\Client;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property int contact
 */
class UpdateCompanyRequest extends FormRequest
{
    protected $client;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->user()->role === 'admin') return true;

        if (in_array($this->user()->role, ['client_owner', 'client_admin'])) return true;

    }

    /**
     * @return array
     */
    public function rules()
    {

        $client_id = request()->segment(3);

        return [
            'company_name' => 'required|unique:clients,name,' . $client_id,
            'account_owner_id' => 'required_with:active'
        ];
    }
}
