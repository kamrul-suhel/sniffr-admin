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

        if ((in_array($this->user()->role, ['client_owner', 'client'])) && ($this->route('client') != $this->user()->client_id)) {
            return false;
        }
        $company = Client::find($this->user()->client_id);

        return (($company && ($this->user()->id == $company->account_owner_id)));
    }

    /**
     * @return array
     */
    public function rules()
    {

        $client_id = request()->segment(3);

        return [
            'company_name' => 'required|unique:clients,name,' . $client_id,
        ];
    }
}
