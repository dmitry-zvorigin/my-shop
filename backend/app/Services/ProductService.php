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
}