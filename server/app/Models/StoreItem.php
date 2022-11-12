<?php

namespace App\Models;

use App\Casts\FloatingPoint;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreItem extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'store_id',
        'name',
        'picture_url',
        'price',
        'description',
    ];

    protected $casts = [
        'price' => FloatingPoint::class,
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
