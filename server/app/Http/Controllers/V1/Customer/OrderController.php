<?php

namespace App\Http\Controllers\V1\Customer;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Customer\Order\StoreRequest;
use App\Http\Resources\Customer\OrderResource;
use App\Models\OrderItem;
use App\Models\StoreItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $customer = $request->customer();

        $orders = $customer->orders()
            ->with(['items', 'rider'])
            ->get();

        return OrderResource::collection($orders);
    }

    public function show(Request $request, $id)
    {
        $customer = $request->customer();

        $order = $customer->orders()
            ->with(['items', 'rider'])
            ->findOrFail($id);

        return OrderResource::make($order);
    }

    public function store(StoreRequest $request)
    {
        $customer = $request->customer();

        $order = $customer->orders()->create(['status' => OrderStatus::PLACED]);

        $order->items()->saveMany(collect($request->validated('items'))->map(function ($data) {
            $item = StoreItem::findOrFail(data_get($data, 'id'));

            return new OrderItem([
                'name' => $item->name,
                'picture_url' => $item->picture_url,
                'price' => $item->price,
                'description' => $item->description,
                'quantity' => data_get($data, 'quantity'),
            ]);
        }));

        $order->load(['items']);

        return OrderResource::make($order);
    }
}
