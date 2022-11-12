<?php

namespace App\Http\Controllers\V1\Rider;

use App\Http\Controllers\Controller;
use App\Http\Resources\Rider\CustomerResource;
use App\Models\Customer;

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
}
