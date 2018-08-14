<?php

namespace App\Http\Requests\Quote;

use Illuminate\Foundation\Http\FormRequest;

class CreateQuote extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(auth()->user()->role !== 'admin') {
            return redirect('admin/clients/');
        };

        return redirect('/videos');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = ['final_price' => 'required|min:1|numeric'];

        if(request()->has('delete')) {
            $rules = [];
        }

        if(request()->has('update-quote')) {
            $rules = [];
        }

        return $rules;
    }
}
