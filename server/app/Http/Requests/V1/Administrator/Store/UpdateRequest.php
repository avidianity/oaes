<?php

namespace App\Http\Requests\V1\Administrator\Store;

use App\Models\Store;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255', Rule::unique(Store::class)->ignoreModel($this->route('store'))],
            'address' => ['nullable', 'string', 'max:255'],
            'picture_url' => ['nullable', 'url'],
        ];
    }
}
