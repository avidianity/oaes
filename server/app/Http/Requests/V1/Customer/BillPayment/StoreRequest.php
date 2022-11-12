<?php

namespace App\Http\Requests\V1\Customer\BillPayment;

use Illuminate\Foundation\Http\FormRequest;

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
            'biller' => ['required', 'string', 'max:255'],
            'account_number' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'total' => ['required', 'numeric'],
            'due_date' => ['required', 'date'],
        ];
    }
}
