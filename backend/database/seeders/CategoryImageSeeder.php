<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryImage;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryImageSeeder extends Seeder
{
    public function run(): void
    {
        $service = new ImageService();

        $data = [
            'Смартфоны и фототехника' => 'Смартфоны и фототехника.png',
            'ТВ, консоли и аудио' => 'ТВ, консоли и аудио.png',
            'ПК, ноутбуки, периферия' => 'ПК, ноутбуки, периферия.png',
            'Комплектующие для ПК' => 'Комплектующие для ПК.png',
            'Офис и мебель' => 'Офис и мебель.png',
            'Сетевое оборудование' => 'Сетевое оборудование.png',
            'Основные комплектующие для ПК' => 'Основные комплектующие для ПК.jpg',
            'Устройства расширения' => 'Устройства расширения.png',
            'Моддинг и обслуживание' => 'Моддинг и обслуживание.png',
            'Комплектующие для сервера' => 'Комплектующие для сервера.png',
            'Процессоры' => 'Процессоры.png',
            'Материнские платы' => 'Материнские платы.png',
            'Видеокарты' => 'Видеокарты.png',
            'Оперативная память' => 'Оперативная память.png',
            'Блоки питания' => 'Блоки питания.png',
            'Корпуса' => 'Корпуса.png',
        ];

        foreach ($data as $categoryName => $filename) {
            $category = Category::where('name', $categoryName)->first();
            if (!$category) continue;

            $originalPath = "category-images/original/{$filename}";

            if (!Storage::disk('public')->exists($originalPath)) {
                dump("Файл не найден: $originalPath");
                continue;
            }

            // Создаём миниатюры и средние
            $resizedPaths = $service->storeResizedVersions($originalPath);

            // Сохраняем оригинал
            CategoryImage::updateOrCreate([
                'category_id' => $category->id,
                'size' => 'original',
            ], [
                'path' => "storage/{$originalPath}",
                'type' => 'default',
            ]);

            // Сохраняем ресайзы
            foreach ($resizedPaths as $size => $path) {
                CategoryImage::updateOrCreate([
                    'category_id' => $category->id,
                    'size' => $size,
                ], [
                    'path' => "storage/{$path}",
                    'type' => 'default',
                ]);
            }
        }
    }
}
