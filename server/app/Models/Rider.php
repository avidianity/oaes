<?php

namespace App\Models;

use App\Casts\Password;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Rider extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'email',
        'password',
    ];

    protected $casts = [
        'password' => Password::class,
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'data' => [
                'email' => $this->email,
            ],
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
