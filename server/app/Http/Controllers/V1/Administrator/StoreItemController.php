<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\StoreItem\StoreRequest;
use App\Http\Requests\V1\Administrator\StoreItem\UpdateRequest;
use App\Http\Resources\Administrator\StoreItemResource;
use App\Models\Store;
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

    public function store(StoreRequest $request, Store $store)
    {
        $item = $store->items()->create($request->validated());

        return StoreItemResource::make($item);
    }

    public function update(UpdateRequest $request, Store $store, $id)
    {
        $item = $store->items()->findOrFail($id);

        $item->update($request->validated());

        return StoreItemResource::make($item);
    }

    public function destroy(Store $store, $id)
    {
        $item = $store->items()->findOrFail($id);

        $item->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
