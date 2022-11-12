<?php

namespace App\Models;

use App\Casts\FloatingPoint;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillPayment extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'customer_id',
        'biller',
        'account_number',
        'name',
        'total',
        'due_date',
    ];

    protected $casts = [
        'total' => FloatingPoint::class,
    ];

    protected $dates = [
        'due_date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
