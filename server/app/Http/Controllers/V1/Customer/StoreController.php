<?php

namespace App\Http\Controllers\V1\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\StoreResource;
use App\Models\Store;

class StoreController extends Controller
{
    public function index()
    {
        return StoreResource::collection(Store::with('items')->get());
    }

    public function show(Store $store)
    {
        return StoreResource::make($store->load('items'));
    }
}
