<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Категория, в которую встраиваются дубли (alias'ы)
    public function aliasChildren()
    {
        return $this->hasMany(CategoryAlias::class, 'parent_id');
    }

    // Получаем все категории, которые дублируются сюда
    public function duplicateCategories()
    {
        return $this->aliasChildren()->with('category.images');
    }

    // Категории, в которые текущая категория дублируется
    public function aliasParents()
    {
        return $this->hasMany(CategoryAlias::class, 'category_id')->with('parent');
    }

    public function aliases()
    {
        return $this->hasMany(CategoryAlias::class);
    }

    // public function aliasParents()
    // {
    //     return $this->hasManyThrough(Category::class, CategoryAlias::class, 'category_id', 'id', 'id');
    // }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function images()
    {
        return $this->hasMany(CategoryImage::class);
    }

    // Получение Url изображения.
    public function getImageUrl(string $size = 'thumb'): ?string
    {
        // Используем загруженные изображения, если есть
        if ($this->relationLoaded('images')) {
            $image = $this->images->firstWhere('size', $size);
        } else {
            $image = $this->images()->where('size', $size)->first();
        }

        return $image ? asset($image->path) : null;
    }

    public function path()
    {
        $path = [];
        $category = $this;

        while ($category) {
            $path[] = $category;
            $category = $category->parent;
        }

        return array_reverse($path); // от корня до текущей
    }

    public function parent()
    {
        return $this->belongsTo(Category::class,'parent_id');
    }

    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive', 'images');
    }
}
