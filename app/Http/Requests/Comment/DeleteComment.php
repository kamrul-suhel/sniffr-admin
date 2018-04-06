<?php

namespace App\Http\Requests\Comment;

use App\Comment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteComment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $comment = Comment::find($this->comment);

        if (Auth::user()->isAdmin() || ($comment->user_id == Auth::user()->id)) {
            return true;
        }

        return false;
    }

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'alpha_id' => 'required|exists:videos,alpha_id',
        ];
    }

    public function messages()
    {
        return [
            'alpha_id.required' => 'Id is required',
        ];
    }

    protected function failedAuthorization()
    {
        return false;
    }
}
