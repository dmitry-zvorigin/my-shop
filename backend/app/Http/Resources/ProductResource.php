<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            // 'brand_id' => ?,
            // 'category_id' => ?,
            'image_medium_url' => $this->getImageUrl('medium'),
            'image_original_url' => $this->getImageUrl('original'),
            'image_thumb_url' => $this->getImageUrl('thumb'),
            // 'images' => $this->images->mapWithKeys(function ($img) {
            //     return [$img->size => asset('storage/' . $img->path)];
            // }),
            'price' => $this->price,
            'stock_quantity' => $this->stock_quantity,
            'sort_order' =>  $this->sort_order,
            'is_active' =>  $this->is_active,
            'views' =>  $this->views
        ];
    }
}
