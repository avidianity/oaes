<?php

namespace App\Http\Controllers\V1\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Customer\BillPayment\StoreRequest;
use App\Http\Resources\Customer\BillPaymentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BillPaymentController extends Controller
{
    public function index(Request $request)
    {
        $customer = $request->customer();

        return BillPaymentResource::collection($customer->billPayments()->get());
    }

    public function show(Request $request, $id)
    {
        $customer = $request->customer();

        $billPayment = $customer->billPayments()->findOrFail($id);

        return BillPaymentResource::make($billPayment);
    }

    public function store(StoreRequest $request)
    {
        $customer = $request->customer();

        $billPayment = $customer->billPayments()
            ->create($request->validated());

        return BillPaymentResource::make($billPayment);
    }

    public function destroy(Request $request, $id)
    {
        $customer = $request->customer();

        $billPayment = $customer->billPayments()->findOrFail($id);

        $billPayment->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
