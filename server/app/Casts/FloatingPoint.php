<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class FloatingPoint implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return float
     */
    public function get($model, string $key, $value, array $attributes)
    {
        return (float)str_replace(',', '', number_format($value, 2));
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return float
     */
    public function set($model, string $key, $value, array $attributes)
    {
        return floatval($value);
    }
}
