<?php

use App\Http\Controllers\V1\Customer\AuthController;
use App\Http\Controllers\V1\Customer\BillPaymentController;
use App\Http\Controllers\V1\Customer\OrderController;
use App\Http\Controllers\V1\Customer\StoreController;
use App\Http\Controllers\V1\Customer\StoreItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');
    Route::post('register', 'register')->as('register');

    Route::middleware('auth:customers')->group(function () {
        Route::get('check', 'check')->as('check');
        Route::get('logout', 'logout')->as('logout');
    });
});

Route::middleware('auth:customers')->group(function () {
    Route::readonlyApiResources([
        'stores' => StoreController::class,
        'stores.items' => StoreItemController::class,
    ]);

    Route::get('items/all', [StoreItemController::class, 'all'])->name('items.all');

    Route::apiResource('bill-payments', BillPaymentController::class)->except(['update']);
    Route::apiResource('orders', OrderController::class)->except(['update', 'destroy']);
});
