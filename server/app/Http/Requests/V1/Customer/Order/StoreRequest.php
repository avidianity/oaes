<?php

namespace App\Http\Requests\V1\Customer\Order;

use App\Models\StoreItem;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['required', 'uuid', Rule::exists(StoreItem::class, 'id')],
            'items.*.quantity' => ['required', 'numeric'],
        ];
    }
}
