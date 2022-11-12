<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Store\StoreRequest;
use App\Http\Requests\V1\Administrator\Store\UpdateRequest;
use App\Http\Resources\Administrator\StoreResource;
use App\Models\Store;
use Illuminate\Http\Response;

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

    public function store(StoreRequest $request)
    {
        $store = Store::create($request->validated());

        return StoreResource::make($store);
    }

    public function update(UpdateRequest $request, Store $store)
    {
        $store->update($request->validated());

        return StoreResource::make($store);
    }

    public function destroy(Store $store)
    {
        $store->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
