<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Customer\StoreRequest;
use App\Http\Requests\V1\Administrator\Customer\UpdateRequest;
use App\Http\Resources\Administrator\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    public function index()
    {
        return CustomerResource::collection(Customer::all());
    }

    public function show(Customer $customer)
    {
        return CustomerResource::make($customer);
    }

    public function store(StoreRequest $request)
    {
        $customer = Customer::create($request->validated());

        return CustomerResource::make($customer);
    }

    public function update(UpdateRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return CustomerResource::make($customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
