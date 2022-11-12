<?php

namespace App\Http\Requests\V1\Rider\Auth;

use App\Models\Rider;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
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
            'email' => ['required', 'email', 'max:255', Rule::exists(Rider::class)],
            'password' => ['required', 'string', 'max:255'],
        ];
    }
}
