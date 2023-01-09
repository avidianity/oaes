<?php

namespace App\Http\Requests\V1\Customer\Auth;

use App\Models\Customer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', Rule::phone()->country(['PH'])->mobile()],
            'email' => ['required', 'email', 'max:255', Rule::unique(Customer::class)],
            'password' => ['required', 'string', 'max:255'],
            'valid_id_url' => ['required', 'url'],
        ];
    }
}
