<?php 

namespace App\Services;

use App\Models\Category;
use App\Models\CategoryAlias;

class CategoryTreeBuilder
{
    public function build(int $depth = 1): array
    {
        // Загружаем все категории и алиасы сразу
        $categories = Category::with(['images'])->get();
        $aliases = CategoryAlias::with(['category.images'])->get();

        // Группируем категории по parent_id
        $groupedCategories = $categories->groupBy('parent_id');

        // Группируем алиасы по parent_id
        $groupedAliases = $aliases->groupBy('parent_id');

        return $this->buildTree($groupedCategories, $groupedAliases, null, $depth);
    }

    protected function buildTree($grouped, $aliasesGrouped, $parentId = null, $depth = 1): array
    {
        if ($depth <= 0) {
            return [];
        }

        // Берем обычных детей
        $children = $grouped[$parentId] ?? collect();

        // Добавляем дубликаты, если есть
        if ($aliasesGrouped->has($parentId)) {
            $aliasCategories = $aliasesGrouped[$parentId]
                ->pluck('category')
                ->filter(); // фильтруем null если что-то не прогружено
            $children = $children->concat($aliasCategories)->unique('id')->values();
        }

        return $children->map(function (Category $category) use ($grouped, $aliasesGrouped, $depth) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'image_url' => $category->getImageUrl('thumb'),
                'children' => $this->buildTree($grouped, $aliasesGrouped, $category->id, $depth - 1),
            ];
        })->toArray();
    }
}


// <?php 

// namespace App\Services;

// use App\Models\Category;

// class CategoryTreeBuilder
// {
//     public function build(int $depth = 1): array
//     {
//         $categories = Category::with([
//             'children.images',
//             'images',
//             'aliasChildren.category.images',
//         ])->get();

//         $grouped = $categories->groupBy('parent_id');
//         $aliases = $categories->flatMap(function ($cat) {
//             return $cat->duplicateCategories->map(function ($alias) use ($cat) {
//                 return [
//                     'id' => $cat->id,
//                     'name' => $cat->name,
//                     'slug' => $cat->slug,
//                     'image_url' => $cat->getImageUrl('thumb'),
//                     'is_alias' => true,
//                     'original_id' => $cat->id,
//                     'parent_id' => $alias->parent_id,
//                 ];
//             });
//         })->groupBy('parent_id');

//         return $this->buildTree($grouped, $groupedAliases = $aliases, $grouped, null, $depth);
//     }

//     protected function buildTree($grouped, $groupedAliases, $all, $parentId = null, $depth = 1): array
//     {
//         if ($depth <= 0) {
//             return [];
//         }

//         $items = collect();

//         if ($grouped->has($parentId)) {
//             $items = $items->merge($grouped[$parentId]);
//         }

//         if ($groupedAliases->has($parentId)) {
//             $items = $items->merge($groupedAliases[$parentId]);
//         }

//         return $items->map(function ($item) use ($grouped, $groupedAliases, $all, $depth) {
//             if (is_array($item)) {
//                 // alias
//                 return [
//                     'id' => $item['id'],
//                     'name' => $item['name'],
//                     'slug' => $item['slug'],
//                     'image_url' => $item['image_url'],
//                     'is_alias' => true,
//                     'original_id' => $item['original_id'],
//                     'children' => $this->buildTree($grouped, $groupedAliases, $all, $item['id'], $depth - 1),
//                 ];
//             } else {
//                 return [
//                     'id' => $item->id,
//                     'name' => $item->name,
//                     'slug' => $item->slug,
//                     'image_url' => $item->getImageUrl('thumb'),
//                     'children' => $this->buildTree($grouped, $groupedAliases, $all, $item->id, $depth - 1),
//                 ];
//             }
//         })->toArray();
//     }
// }