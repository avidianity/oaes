<?php

use App\Http\Controllers\V1\Administrator\AdministratorController;
use App\Http\Controllers\V1\Administrator\AuthController;
use App\Http\Controllers\V1\Administrator\CustomerController;
use App\Http\Controllers\V1\Administrator\FileController;
use App\Http\Controllers\V1\Administrator\RiderController;
use App\Http\Controllers\V1\Administrator\StoreController;
use App\Http\Controllers\V1\Administrator\StoreItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');

    Route::middleware('auth:administrators')->group(function () {
        Route::get('check', 'check')->as('check');
        Route::get('logout', 'logout')->as('logout');
    });
});

Route::middleware('auth:administrators')->group(function () {
    Route::apiResources([
        'administrators' => AdministratorController::class,
        'riders' => RiderController::class,
        'customers' => CustomerController::class,
        'stores' => StoreController::class,
        'stores.items' => StoreItemController::class,
    ]);

    Route::apiResource('files', FileController::class)->only(['store']);
});
