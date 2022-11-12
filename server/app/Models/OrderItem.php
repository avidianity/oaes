<?php

namespace App\Models;

use App\Casts\FloatingPoint;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'order_id',
        'name',
        'picture_url',
        'price',
        'description',
        'quantity',
    ];

    protected $casts = [
        'price' => FloatingPoint::class,
        'quantity' => 'integer',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
