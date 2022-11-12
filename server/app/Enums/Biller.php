<?php

namespace App\Enums;

use ArchTech\Enums\InvokableCases;
use ArchTech\Enums\Values;

enum Biller: string
{
    use InvokableCases;
    use Values;

    case PANELCO = 'panelco';
    case CONVERGE = 'converge';
    case PLDT = 'pldt';
}
