<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class CreateComment extends FormRequest
{
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
        $validate = [
            'comment' => 'required|string',
        ];

        if(request()->has('asset_id')) {
            //$validate['asset_id'] = 'required|exists:videos,id';
        }

        if(request()->has('contact_id')) {
            $validate['contact_id'] = 'required|exists:contacts,id';
        }

        return $validate;
    }
}
