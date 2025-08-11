<?php 

namespace App\Services;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Collection;

class BrandDetailService
{
    public function getBySlug(string $slug): Brand
    {
        return Brand::where('slug', $slug)
            ->with([
                'products.category' => function ($q) {
                    $q->select('id', 'name', 'slug', 'parent_id');
                    $q->with('images'); // чтобы не было N+1
                }
            ])
            ->firstOrFail();
    }

    public function getBrandCategories(Brand $brand): Collection
    {
        return $brand->products
            ->pluck('category')
            ->filter() // Убираем null
            ->unique('id')
            ->values();
    }

    public function getLatestBrandProducts(Brand $brand, int $limit = 10): Collection
    {
        return Product::with('images')
            ->where('brand_id', $brand->id)
            ->where('is_active', true)
            ->latest()
            ->take($limit)
            ->get();
    }
}