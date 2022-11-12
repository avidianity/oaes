<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "uses()" function to bind a different classes or traits.
|
*/

use Illuminate\Http\Response;
use Illuminate\Testing\TestResponse;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

uses(Tests\TestCase::class)->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

TestResponse::macro('assertBadRequest', function ($status = Response::HTTP_BAD_REQUEST) {
    /** @var TestResponse $this */
    return $this->assertStatus($status);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

/**
 * Set the currently logged in user for the application.
 *
 * @param  string $model
 * @return \App\Models\Administrator|\App\Models\Customer
 */
function actingAs($model)
{
    /**
     * @var JWTGuard
     */
    $guard = auth(Str::of(class_basename($model))->lower()->plural()->toString());

    /**
     * @var \Illuminate\Foundation\Auth\User|\PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject
     */
    $user = $model::factory()->create();

    $user->wasRecentlyCreated = false;

    $guard->login($user);

    return $user;
}
