<?php

namespace Tests\Feature\V1\Http\Rider;

use App\Models\Rider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use function Pest\Faker\faker;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

$key = 'v1.rider.auth';

uses()->group($key);

uses(RefreshDatabase::class);

it('logs in a rider', function () use ($key) {
    $password = faker()->password;

    $rider = Rider::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $rider->email, 'password' => $password])
        ->assertOk();
});

it('checks a rider', function () use ($key) {
    actingAs(Rider::class);

    getJson(route("$key.check"))
        ->assertOk();
});

it('logs out a rider', function () use ($key) {
    actingAs(Rider::class);

    getJson(route("$key.logout"))
        ->assertNoContent();
});

it('fails to login with an incorrect password', function () use ($key) {
    $faker = faker();

    $password = $faker->password;

    $rider = Rider::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $rider->email, 'password' => $faker->password])
        ->assertStatus(Response::HTTP_BAD_REQUEST);
});
