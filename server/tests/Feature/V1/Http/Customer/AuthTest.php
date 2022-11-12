<?php

namespace Tests\Feature\V1\Http\Customer;

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use function Pest\Faker\faker;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

$key = 'v1.customer.auth';

uses()->group($key);

uses(RefreshDatabase::class);

it('logs in a customer', function () use ($key) {
    $password = faker()->password;

    $customer = Customer::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $customer->email, 'password' => $password])
        ->assertOk();
});

it('checks a customer', function () use ($key) {
    actingAs(Customer::class);

    getJson(route("$key.check"))
        ->assertOk();
});

it('registers a customer', function () use ($key) {
    $faker = faker();

    $gender = $faker->randomElement(['male', 'female']);
    $data = [
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName($gender),
        'birthday' => $faker->date,
        'address' => $faker->address,
        'phone' => '09394158019',
        'email' => $faker->unique()->email,
        'password' => $faker->password,
    ];

    postJson(route("$key.register"), $data)
        ->assertCreated();
});

it('logs out a customer', function () use ($key) {
    actingAs(Customer::class);

    getJson(route("$key.logout"))
        ->assertNoContent();
});

it('fails to login with an incorrect password', function () use ($key) {
    $faker = faker();

    $password = $faker->password;

    $customer = Customer::factory()
        ->create(compact('password'));

    postJson(route("$key.login"), ['email' => $customer->email, 'password' => $faker->password])
        ->assertStatus(Response::HTTP_BAD_REQUEST);
});
