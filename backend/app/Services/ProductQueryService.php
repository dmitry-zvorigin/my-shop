<?php 

namespace App\Services;

use App\DTOs\ProductFilterDTO;
use App\Models\Product;

class ProductQueryService 
{
    public function paginate(ProductFilterDTO $dto) {
        $q = Product::query()->with(['brand', 'images', 'category'])->where('is_active', true);

        if ($dto->category_slug) {
            $q->whereHas('category', function ($qq) use ($dto) {
                $qq->where('slug', $dto->category_slug);
            });
        }

        if ($dto->brand) {
            $q->whereHas('brand', function ($qq) use ($dto) {
                $qq->where('slug', $dto->brand);
            });
        }

        // другие фильтры..
        if ($dto->brand_id)   $q->where('brand_id', $dto->brand_id);
        // if ($dto->min_price)  $q->where('price', '>=', $dto->min_price);
        // if ($dto->max_price)  $q->where('price', '<=', $dto->max_price);

        // сортировка
        match ($dto->sort) {
            'price_asc' => $q->orderBy('price'),
            'price_desc' => $q->orderByDesc('price'),
            default => $q->latest(),
        };

        return $q->paginate($dto->per_page ?? 10);
    }
}