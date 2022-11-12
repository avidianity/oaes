<?php

namespace App\Providers;

use App\Models\Administrator;
use App\Models\Customer;
use App\Models\Rider;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use LogicException;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /**
         * @return \App\Models\Administrator
         */
        Request::macro('administrator', function () {
            /** @var Request $this */
            $user = $this->user();

            if (!$user instanceof Administrator) {
                throw new LogicException(sprintf('[%s] expected. Received [%s]', get_class($user), Administrator::class));
            }

            return $user;
        });

        /**
         * @return \App\Models\Rider
         */
        Request::macro('rider', function () {
            /** @var Request $this */
            $user = $this->user();

            if (!$user instanceof Rider) {
                throw new LogicException(sprintf('[%s] expected. Received [%s]', get_class($user), Rider::class));
            }

            return $user;
        });

        /**
         * @return \App\Models\Customer
         */
        Request::macro('customer', function () {
            /** @var Request $this */
            $user = $this->user();

            if (!$user instanceof Customer) {
                throw new LogicException(sprintf('[%s] expected. Received [%s]', get_class($user), Customer::class));
            }

            return $user;
        });
    }
}
