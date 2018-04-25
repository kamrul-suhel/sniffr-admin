<?php

namespace App\Http\Requests\Video;

use App\Traits\FrontendResponder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

class CreateVideoRequest extends FormRequest
{
    use FrontendResponder;

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
            'alpha_id' => 'unique',
            'full_name' => 'required',
            'email' => 'required|email',
            'title' => 'required',
            'file' => 'file|mimes:ogg,mp4,qt,avi,wmv,m4v,mov,webm,3gpp,quicktime|min:1|max:500000',
            'terms' => 'required'
        ];
    }

    /**
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     */
    protected function response(array $errors)
    {
        $isJson = $this->ajax() || $this->isJson();

        if ($isJson) {
            return $this->errorResponse('error, file did not pass validation check');
        }
        $routeName = Request::route()->getName();

        return response()->redirectTo($routeName)
            ->withErrors($errors)
            ->withInput();
    }
}
