<?php

use App\Http\Controllers\V1\Rider\AuthController;
use App\Http\Controllers\V1\Rider\CustomerController;
use App\Http\Controllers\V1\Rider\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');

    Route::middleware('auth:riders')->group(function () {
        Route::get('check', 'check')->as('check');
        Route::get('logout', 'logout')->as('logout');
    });
});

Route::middleware('auth:riders')->group(function () {
    Route::readonlyApiResources([
        'customers' => CustomerController::class,
    ]);

    Route::apiResource('orders', OrderController::class)->except(['store', 'destroy']);
});
