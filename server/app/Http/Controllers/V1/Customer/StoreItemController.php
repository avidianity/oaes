<?php

namespace App\Http\Controllers\V1\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\StoreItemResource;
use App\Models\Store;
use App\Models\StoreItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StoreItemController extends Controller
{
    public function index(Store $store)
    {
        return StoreItemResource::collection($store->items()->get());
    }

    public function show(Store $store, $id)
    {
        return StoreItemResource::make($store->items()->findOrFail($id));
    }

    public function all(Request $request)
    {
        return StoreItemResource::collection(StoreItem::findOrFail($request->input('items', [])));
    }
}
