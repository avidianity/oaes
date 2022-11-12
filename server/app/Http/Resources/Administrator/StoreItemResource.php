<?php

namespace App\Http\Resources\Administrator;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\StoreItem
 */
class StoreItemResource extends JsonResource
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
            'name' => $this->name,
            'picture' => [
                'url' => $this->picture_url,
            ],
            'price' => $this->price,
            'description' => $this->description,
            'store' => StoreResource::make($this->whenLoaded('store')),
        ];
    }
}
