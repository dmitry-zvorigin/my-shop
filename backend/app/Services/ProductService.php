<?php 

namespace App\Services;

use App\Models\Product;

class ProductService 
{
    public function showById() 
    {

    }

    public function getBySlug(string $slug)
    {
        return Product::where('slug', $slug)->firstOrFail();
    }

    public function buildPath(Product $product): array
    {
        $service = app(CategoryDetailService::class);
        $path = $service->buildPath($product->category);

        $path[] = [
            'id'   => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'type' => 'product',
        ];

        return $path;
    }
}