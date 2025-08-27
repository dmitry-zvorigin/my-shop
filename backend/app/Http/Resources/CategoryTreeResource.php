<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryTreeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'       => data_get($this->resource, 'id'),
            'slug'     => data_get($this->resource, 'slug'),
            'name'     => data_get($this->resource, 'name'),
            'image'    => data_get($this->resource, 'image_url'),
            'children' => CategoryTreeResource::collection(
                collect(data_get($this->resource, 'children', []))
            ),
        ];
    }
}
