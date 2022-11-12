<?php

namespace Tests\Feature\V1\Http\Administrator;

use App\Models\Administrator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use function Pest\Faker\faker;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

$key = 'v1.administrator.auth';

uses()->group($key);

uses(RefreshDatabase::class);

it('logs in an administrator', function () use ($key) {
    $password = faker()->password;

    $administrator = Administrator::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $administrator->email, 'password' => $password])
        ->assertOk();
});

it('checks an administrator', function () use ($key) {
    actingAs(Administrator::class);

    getJson(route("$key.check"))
        ->assertOk();
});

it('logs out an administrator', function () use ($key) {
    actingAs(Administrator::class);

    getJson(route("$key.logout"))
        ->assertNoContent();
});

it('fails to login with an incorrect password', function () use ($key) {
    $faker = faker();

    $password = $faker->password;

    $administrator = Administrator::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $administrator->email, 'password' => $faker->password])
        ->assertStatus(Response::HTTP_BAD_REQUEST);
});
