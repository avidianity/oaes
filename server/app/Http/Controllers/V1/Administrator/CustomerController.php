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

    public function show(Customer $rider)
    {
        return CustomerResource::make($rider);
    }

    public function store(StoreRequest $request)
    {
        $rider = Customer::create($request->validated());

        return CustomerResource::make($rider);
    }

    public function update(UpdateRequest $request, Customer $rider)
    {
        $rider->update($request->validated());

        return CustomerResource::make($rider);
    }

    public function destroy(Customer $rider)
    {
        $rider->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
