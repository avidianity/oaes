<?php

namespace App\Enums;

use ArchTech\Enums\InvokableCases;
use ArchTech\Enums\Values;

enum OrderStatus: string
{
    use InvokableCases;
    use Values;

    case PLACED = 'placed';
    case CONFIRMED = 'confirmed';
    case SHIPPED = 'shipped';
    case TO_RECEIVE = 'to-receive';
    case TO_RATE = 'to-rate';
}
