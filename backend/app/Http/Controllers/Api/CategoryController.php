<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryDetailService;
use App\Services\CategoryTreeBuilder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function tree(Request $request, CategoryTreeBuilder $treeBuilder)
    {
        $depth = (int) $request->query('depth', 1);
        $tree = $treeBuilder->build($depth);

        return response()->json($tree);
    }

    public function showBySlug(string $slug, CategoryDetailService $service)
    {
        $category = $service->getBySlug($slug);

        // Получаем обычных детей
        $children = $category->children;

        // Получаем дубликаты (из таблицы category_aliases)
        $aliases = $category->duplicateCategories->pluck('category');

        // Объединяем
        $mergedChildren = $children->concat($aliases)->unique('id');

        return response()->json([
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'image_url' => $category->getImageUrl('thumb'),
                'children' => CategoryResource::collection($mergedChildren),
            ],
            'path' => $service->buildPath($category),
        ]);
    }
}
