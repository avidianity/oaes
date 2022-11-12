<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Rider\StoreRequest;
use App\Http\Requests\V1\Administrator\Rider\UpdateRequest;
use App\Http\Resources\Administrator\RiderResource;
use App\Models\Rider;
use Illuminate\Http\Response;

class RiderController extends Controller
{
    public function index()
    {
        return RiderResource::collection(Rider::all());
    }

    public function show(Rider $rider)
    {
        return RiderResource::make($rider);
    }

    public function store(StoreRequest $request)
    {
        $rider = Rider::create($request->validated());

        return RiderResource::make($rider);
    }

    public function update(UpdateRequest $request, Rider $rider)
    {
        $rider->update($request->validated());

        return RiderResource::make($rider);
    }

    public function destroy(Rider $rider)
    {
        $rider->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
