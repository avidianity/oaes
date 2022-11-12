<?php

namespace App\Http\Requests\V1\Administrator\StoreItem;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'picture_url' => ['nullable', 'url'],
            'price' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string'],
        ];
    }
}
