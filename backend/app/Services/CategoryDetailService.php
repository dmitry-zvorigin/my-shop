<?php 

namespace App\Services;

use App\Models\Category;

class CategoryDetailService
{
    public function getBySlug(string $slug): Category
    {
        return Category::where('slug', $slug)
            ->with([
                'children.images', 
                'images', 
                'parent', 
                'duplicateCategories.category.images'
            ])
            ->firstOrFail();
    }

    public function getById(int $id): Category
    {
        return Category::with(['children.images', 'images', 'parent'])->findOrFail($id);
    }

    public function buildPath(Category $category): array
    {
        return collect($category->path())->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
            ];
        })->toArray();
    }

    public function getChildrenWithAliases(Category $category)
    {
        $real = $category->children;
        $aliases = $category->duplicateCategories->pluck('category');

        return $real->concat($aliases);
    }
}