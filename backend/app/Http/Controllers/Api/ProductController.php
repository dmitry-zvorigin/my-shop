<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function showBySlug(string $slug, Product $product, ProductService $service)
    {
        $product = $service->getBySlug($slug);
        $product->load(['brand', 'category']);
        return new ProductResource($product);
    }

    // public function showBySlug(string $slug, BrandDetailService $service)
    // {
    //     $brand = $service->getBySlug($slug);
    //     $categories = $service->getBrandCategories($brand);

    //     return response()->json([
    //         'brand' => new BrandResource($brand),
    //         'categories' => CategoryResource::collection($categories),
    //         'latest_products' => ProductResource::collection($service->getLatestBrandProducts($brand),
    //         )
    //     ]);
    // }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function showAll()
    {
        return ProductResource::collection(Product::all());
    }
}
