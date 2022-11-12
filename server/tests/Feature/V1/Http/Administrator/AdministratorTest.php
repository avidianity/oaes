<?php

namespace Tests\Feature\V1\Http\Administrator;

use App\Models\Administrator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Faker\faker;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;

$key = 'v1.administrator.administrators';

uses()->group($key);

uses(RefreshDatabase::class);

it('fetches administrators', function () use ($key) {
    actingAs(Administrator::class);

    Administrator::factory(5)->create();

    getJson(route("$key.index"))
        ->assertOk();
});

it('fetches an administrator', function () use ($key) {
    actingAs(Administrator::class);

    $administrator = Administrator::factory(5)
        ->create()
        ->random();

    getJson(route("$key.show", ['administrator' => $administrator->getKey()]))
        ->assertOk();
});

it('stores an administrator', function () use ($key) {
    actingAs(Administrator::class);

    $faker = faker();

    $data = [
        'email' => $faker->unique()->email,
        'password' => $faker->password,
    ];

    postJson(route("$key.store"), $data)
        ->assertCreated();
});

it('updates an administrator', function () use ($key) {
    actingAs(Administrator::class);

    $administrator = Administrator::factory(5)
        ->create()
        ->random();

    $data = [
        'password' => faker()->password,
    ];

    putJson(route("$key.destroy", ['administrator' => $administrator->getKey()]), $data)
        ->assertOk();
});

it('deletes an administrator', function () use ($key) {
    actingAs(Administrator::class);

    $administrator = Administrator::factory(5)
        ->create()
        ->random();

    deleteJson(route("$key.destroy", ['administrator' => $administrator->getKey()]))
        ->assertNoContent();
});

it('fails to delete self as administrator', function () use ($key) {
    $administrator = actingAs(Administrator::class);

    deleteJson(route("$key.destroy", ['administrator' => $administrator->getKey()]))
        ->assertBadRequest();
});
