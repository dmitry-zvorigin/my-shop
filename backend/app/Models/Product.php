<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'brand_id',
        'category_id',
        'price',
        'stock_quantity',
        'sort_order',
        'is_active',
        'views'
    ];

    protected static function booted()
    {
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
                $product->uuid = (string) Str::uuid();
            }
        });
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images() 
    {
        return $this->hasMany(ProductImage::class);
    }

    // Удобный метод для получения URL по size
    public function getImageUrl(string $size = 'thumb'): ?string
    {
        if ($this->relationLoaded('images')) {
            $image = $this->images
                ->where('size', $size)
                ->sortBy('position')    // сортируем по позиции
                ->first();
        } else {
            $image = $this->images()
                ->where('size', $size)
                ->orderBy('position')
                ->first();
        }

        return $image ? asset('storage/' . $image->path) : null;
    }
}
