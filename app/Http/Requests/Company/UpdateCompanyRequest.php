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
        if (($this->user()->role == 'client') && ($this->route('client') != $this->user()->client_id)) {
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
        $client_id = null;
        if ($this->user()->role == 'client') {
            $client_id = $this->user()->client_id;
        } elseif ($this->user()->role == 'admin') {
            $client_id = $this->client->id;
        }

        return [
            'company_name' => 'required|unique:clients,name,' . $client_id,
        ];
    }
}
