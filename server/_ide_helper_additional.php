<?php

// @formatter:off
/**
 * A helper file for everything else
 *
 * @author John Michael B. Manlupig <manlupigjohnmichael@gmail.com>
 */

namespace Illuminate\Testing {
    class TestResponse extends \Illuminate\Testing\TestResponse
    {
        /**
         * Assert that the response has the 400 status code.
         *
         * @param  int $status
         * @return $this
         */
        public function assertBadRequest($status = \Illuminate\Http\Response::HTTP_BAD_REQUEST)
        {
            return $this->assertStatus($status);
        }
    }
}
