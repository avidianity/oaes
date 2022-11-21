<?php

namespace App\Http\Controllers\V1\Rider;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Rider\Order\UpdateRequest;
use App\Http\Resources\Rider\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $rider = $request->rider();

        $orders = Order::query()
            ->where('rider_id', $rider->getKey())
            ->orWhereNull('rider_id')
            ->with(['customer', 'items', 'rider'])
            ->get();

        return OrderResource::collection($orders);
    }

    public function show(Request $request, $id)
    {
        $rider = $request->rider();

        $order = Order::query()
            ->where('rider_id', $rider->getKey())
            ->orWhereNull('rider_id')
            ->with(['customer', 'items', 'rider'])
            ->findOrFail($id);

        return OrderResource::make($order);
    }

    public function update(UpdateRequest $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $rider = $request->rider();

            $order = Order::query()
                ->where('rider_id', $rider->getKey())
                ->orWhereNull('rider_id')
                ->with(['customer', 'items'])
                ->findOrFail($id);

            $order->update($request->validated());

            if ($request->boolean('assign_to_self')) {
                $order->update(['rider_id' => $rider->getKey()]);
            }

            return OrderResource::make($order);
        });
    }
}
