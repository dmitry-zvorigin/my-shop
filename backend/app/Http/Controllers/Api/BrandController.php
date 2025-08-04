<?php 

namespace App\Http\Controllers\Api;

use App\Http\Resources\BrandResource;
use App\Models\Brand;

class BrandController
{

    public function show()
    {
        return BrandResource::collection(Brand::all());
    }

    public function showById(int $id)
    {
        $brand = Brand::where('id', $id)->firstOrFail();
        return new BrandResource($brand);
    }

    public function showBySlug(string $slug)
    {
        $brand = Brand::where('slug', $slug)->firstOrFail();
        return new BrandResource($brand);
    }

}