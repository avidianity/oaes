<?php

namespace Tests\Feature\V1\Http\Administrator;

use App\Models\Administrator;
use App\Models\Store;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Faker\faker;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;

$key = 'v1.administrator.stores';

uses()->group($key);

uses(RefreshDatabase::class);

it('fetches stores', function () use ($key) {
    actingAs(Administrator::class);

    Store::factory(5)->create();

    getJson(route("$key.index"))
        ->assertOk();
});

it('fetches a store', function () use ($key) {
    actingAs(Administrator::class);

    $store = Store::factory(5)
        ->create()
        ->random();

    getJson(route("$key.show", ['store' => $store->getKey()]))
        ->assertOk();
});

it('stores a store', function () use ($key) {
    actingAs(Administrator::class);

    $faker = faker();

    $data = [
        'name' => $faker->company,
        'address' => $faker->address,
        'picture_url' => $faker->imageUrl,
    ];

    postJson(route("$key.store"), $data)
        ->assertCreated();
});

it('updates a store', function () use ($key) {
    actingAs(Administrator::class);

    $store = Store::factory(5)
        ->create()
        ->random();

    $faker = faker();

    $data = [
        'name' => $faker->company,
        'address' => $faker->address,
        'picture_url' => $faker->imageUrl,
    ];

    putJson(route("$key.destroy", ['store' => $store->getKey()]), $data)
        ->assertOk();
});

it('deletes a store', function () use ($key) {
    actingAs(Administrator::class);

    $store = Store::factory(5)
        ->create()
        ->random();

    deleteJson(route("$key.destroy", ['store' => $store->getKey()]))
        ->assertNoContent();
});
