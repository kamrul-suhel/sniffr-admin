<?php

namespace App\Http\Requests\Contract;

use App\Traits\FrontendResponse;
use Illuminate\Foundation\Http\FormRequest;

class CreateContractRequest extends FormRequest
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
            'revenue_share' => 'integer|max:100',
            'upfront_payment' => 'integer|max:999',
            'success_system' => 'integer|max:999',
            'credit' => 'string|max:1024',
            'video_id' => 'required|string',
        ];
    }

    /**
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     */
    protected function response(array $errors)
    {
        dd("chao");
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
