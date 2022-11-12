<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Administrator\StoreRequest;
use App\Http\Requests\V1\Administrator\Administrator\UpdateRequest;
use App\Http\Resources\Administrator\AdministratorResource;
use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdministratorController extends Controller
{
    public function index()
    {
        return AdministratorResource::collection(Administrator::all());
    }

    public function show(Administrator $administrator)
    {
        return AdministratorResource::make($administrator);
    }

    public function store(StoreRequest $request)
    {
        $administrator = Administrator::create($request->validated());

        return AdministratorResource::make($administrator);
    }

    public function update(UpdateRequest $request, Administrator $administrator)
    {
        $administrator->update($request->validated());

        return AdministratorResource::make($administrator);
    }

    public function destroy(Request $request, Administrator $administrator)
    {
        if ($request->administrator()->is($administrator)) {
            return response()->json([
                'key' => 'CANNOT_DELETE',
                'message' => 'You cannot delete your own account.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $administrator->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
