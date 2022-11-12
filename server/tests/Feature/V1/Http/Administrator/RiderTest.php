<?php

namespace Tests\Feature\V1\Http\Administrator;

use App\Models\Administrator;
use App\Models\Rider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Faker\faker;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;

$key = 'v1.administrator.riders';

uses()->group($key);

uses(RefreshDatabase::class);

it('fetches riders', function () use ($key) {
    actingAs(Administrator::class);

    Rider::factory(5)->create();

    getJson(route("$key.index"))
        ->assertOk();
});

it('fetches a rider', function () use ($key) {
    actingAs(Administrator::class);

    $rider = Rider::factory(5)
        ->create()
        ->random();

    getJson(route("$key.show", ['rider' => $rider->getKey()]))
        ->assertOk();
});

it('stores a rider', function () use ($key) {
    actingAs(Administrator::class);

    $faker = faker();

    $data = [
        'email' => $faker->unique()->email,
        'password' => $faker->password,
    ];

    postJson(route("$key.store"), $data)
        ->assertCreated();
});

it('updates a rider', function () use ($key) {
    actingAs(Administrator::class);

    $rider = Rider::factory(5)
        ->create()
        ->random();

    $data = [
        'password' => faker()->password,
    ];

    putJson(route("$key.destroy", ['rider' => $rider->getKey()]), $data)
        ->assertOk();
});

it('deletes a rider', function () use ($key) {
    actingAs(Administrator::class);

    $rider = Rider::factory(5)
        ->create()
        ->random();

    deleteJson(route("$key.destroy", ['rider' => $rider->getKey()]))
        ->assertNoContent();
});
