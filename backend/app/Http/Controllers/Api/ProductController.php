<?php

namespace App\Http\Controllers\Api;

use App\DTOs\ProductFilterDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductQueryService;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ProductQueryService $service)
    {
        $dto = ProductFilterDTO::fromRequest($request);
        $paginate = $service->paginate($dto);

        return ProductResource::collection($paginate)
            ->additional(['meta' => ['total' => $paginate->total()]]);
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

    /**
     * Получить продукты по slug категории с фильтрацией и пагинацией
     */
    public function getByCategory(string $categorySlug, Request $request)
    {
        $request->validate([
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'string|in:created_at,name,price,popularity',
            'order' => 'string|in:asc,desc',
            'min_price' => 'numeric|min:0',
            'max_price' => 'numeric|min:0',
            'brands' => 'array',
            'brands.*' => 'string',
            'attributes' => 'array',
        ]);

        $query = Product::query()
            ->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            })
            ->with(['brand', 'category', 'images']);

        // Фильтр по цене
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Фильтр по брендам
        if ($request->filled('brands')) {
            $query->whereHas('brand', function ($q) use ($request) {
                $q->whereIn('slug', $request->brands);
            });
        }

        // Фильтр по атрибутам
        if ($request->filled('attributes')) {
            foreach ($request->attributes as $key => $value) {
                if (is_array($value)) {
                    $query->whereJsonContains("attributes->{$key}", $value);
                } else {
                    $query->where("attributes->{$key}", $value);
                }
            }
        }

        // Сортировка
        $sortField = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');
        
        if ($sortField === 'popularity') {
            $query->orderBy('views', $sortOrder);
        } else {
            $query->orderBy($sortField, $sortOrder);
        }

        // Пагинация
        $perPage = $request->get('limit', 20);
        $products = $query->paginate($perPage);

        return ProductResource::collection($products);
    }

    /**
     * Получить метаданные категории (количество продуктов, статистика)
     */
    public function getCategoryMetadata(string $categorySlug)
    {
        $totalProducts = Product::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })->count();

        $priceRange = Product::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })->selectRaw('MIN(price) as min_price, MAX(price) as max_price')->first();

        $brandsCount = Product::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })->distinct('brand_id')->count('brand_id');

        return response()->json([
            'total_products' => $totalProducts,
            'price_range' => [
                'min' => $priceRange->min_price ?? 0,
                'max' => $priceRange->max_price ?? 0,
            ],
            'brands_count' => $brandsCount,
        ]);
    }

    /**
     * Получить доступные фильтры для категории
     */
    public function getCategoryFilters(string $categorySlug)
    {
        // Получаем все бренды в категории
        $brands = Product::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })
        ->with('brand:id,name,slug')
        ->get()
        ->pluck('brand')
        ->unique('id')
        ->values();

        // Получаем все атрибуты в категории
        $attributes = Product::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })
        ->whereNotNull('attributes')
        ->pluck('attributes')
        ->flatMap(function ($attrs) {
            return array_keys($attrs ?? []);
        })
        ->unique()
        ->values();

        return response()->json([
            'brands' => $brands,
            'available_attributes' => $attributes,
        ]);
    }
}
