<?php 

namespace App\Http\Controllers\Api;

use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Services\BrandDetailService;

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

    public function showBySlug(string $slug, BrandDetailService $service)
    {
        $brand = $service->getBySlug($slug);
        $categories = $service->getBrandCategories($brand);

        return response()->json([
            'brand' => new BrandResource($brand),
            'categories' => CategoryResource::collection($categories),
            'latest_products' => ProductResource::collection($service->getLatestBrandProducts($brand),
            )
        ]);
    }

}