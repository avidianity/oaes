<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Auth\LoginRequest;
use App\Http\Resources\Administrator\AdministratorResource;
use Illuminate\Http\Response;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class AuthController extends Controller
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard = auth('administrators');
    }

    public function login(LoginRequest $request)
    {
        if ($token = $this->guard->attempt($request->validated())) {
            $administrator = $this->guard->userOrFail();

            return AdministratorResource::make($administrator)->additional([
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

    public function check()
    {
        return AdministratorResource::make($this->guard->userOrFail());
    }

    public function logout()
    {
        $this->guard->logout(true);

        return response('', Response::HTTP_NO_CONTENT);
    }
}
