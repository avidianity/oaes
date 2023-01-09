<?php

namespace App\Models;

use App\Casts\Password;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Customer extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'first_name',
        'last_name',
        'birthday',
        'address',
        'phone',
        'email',
        'password',
        'valid_id_url',
    ];

    protected $casts = [
        'password' => Password::class,
    ];

    protected $dates = [
        'birthday',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'data' => [
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'full_name' => $this->full_name,
                'birthday' => $this->birthday,
                'phone' => $this->phone,
                'email' => $this->email,
            ],
        ];
    }

    public function getFullNameAttribute()
    {
        return sprintf('%s %s', $this->first_name, $this->last_name);
    }

    public function billPayments(): HasMany
    {
        return $this->hasMany(BillPayment::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
