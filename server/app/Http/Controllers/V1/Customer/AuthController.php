<?php

namespace App\Http\Controllers\V1\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Customer\Auth\LoginRequest;
use App\Http\Requests\V1\Customer\Auth\RegisterRequest;
use App\Http\Resources\Customer\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Response;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class AuthController extends Controller
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard = auth('customers');
    }

    public function login(LoginRequest $request)
    {
        if ($token = $this->guard->attempt($request->validated())) {
            $customer = $this->guard->userOrFail();

            return CustomerResource::make($customer)->additional([
                'access' => [
                    'type' => 'bearer',
                    'token' => $token,
                    'expiry' => config('jwt.ttl'),
                ],
            ]);
        }

        return response()->json([
            'key' => 'INVALID_PASSWORD',
            'message' => __('auth.password'),
        ], Response::HTTP_BAD_REQUEST);
    }

    public function register(RegisterRequest $request)
    {
        $customer = Customer::create($request->validated());

        return CustomerResource::make($customer)->additional([
            'access' => [
                'type' => 'bearer',
                'token' => $this->guard->login($customer),
                'expiry' => config('jwt.ttl'),
            ],
        ]);
    }

    public function check()
    {
        return CustomerResource::make($this->guard->userOrFail());
    }

    public function logout()
    {
        $this->guard->logout(true);

        return response('', Response::HTTP_NO_CONTENT);
    }
}
