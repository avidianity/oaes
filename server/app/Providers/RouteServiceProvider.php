<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Routing\PendingResourceRegistration;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('v1/administrator')
                ->as('v1.administrator.')
                ->group(base_path('routes/v1/administrator.php'));

            Route::middleware('api')
                ->prefix('v1/rider')
                ->as('v1.rider.')
                ->group(base_path('routes/v1/rider.php'));

            Route::middleware('api')
                ->prefix('v1/customer')
                ->as('v1.customer.')
                ->group(base_path('routes/v1/customer.php'));
        });

        /**
         * @param string $value
         * @return \Illuminate\Routing\RouteRegistrar
         */
        \Illuminate\Routing\Route::macro('as', function ($value) {
            /** @var \Illuminate\Routing\Route $this */
            return $this->name($value);
        });

        /**
         * @param array $resources
         * @param array $options
         * @return void
         */
        Route::macro('readonlyApiResources', function ($resources, $options = []) {
            /** @var Route $this */
            return $this->apiResources($resources, array_merge($options, [
                'only' => ['index', 'show'],
            ]));
        });

        /**
         * @return PendingResourceRegistration
         */
        PendingResourceRegistration::macro('readonly', function () {
            /** @var PendingResourceRegistration $this */
            return $this->only(['index', 'show']);
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(240)->by($request->user()?->id ?: $request->ip());
        });
    }
}
