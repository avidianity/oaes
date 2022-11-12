<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\BillPayment
 */
class BillPaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->getKey(),
            'biller' => $this->biller,
            'account_number' => $this->account_number,
            'name' => $this->name,
            'total' => $this->total,
            'due_date' => $this->due_date,
            'created_at' => $this->created_at,
        ];
    }
}
