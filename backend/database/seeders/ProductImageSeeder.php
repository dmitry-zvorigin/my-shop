<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\ImageService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        // Полностью очищаем product-images перед генерацией
        Storage::disk('public')->deleteDirectory('product-images');
        Storage::disk('public')->makeDirectory('product-images');

        $diskPrivate = 'local';
        $diskPublic = 'public';
        $importBase = 'import-products';
        $exportBase = 'product-images';

        $imageService = app(ImageService::class);

        $products = Product::all();

        foreach ($products as $product) {
            $sourceDir = "$importBase/{$product->slug}";
            if (!Storage::disk($diskPrivate)->exists($sourceDir)) {
                continue;
            }

            $uuidDir = "$exportBase/{$product->uuid}";

            $originalDir = "$uuidDir/original";

            foreach (Storage::disk($diskPrivate)->files($sourceDir) as $index => $filePath) {
                $fileName = basename($filePath);
                $newPath = "$originalDir/$fileName";

                Storage::disk($diskPublic)->put($newPath, Storage::disk($diskPrivate)->get($filePath));

                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $newPath,
                    'size' => 'original',
                    'position' => $index
                ]);

                $resizedPaths = $imageService->storeResizedVersionsProduct($newPath, $diskPublic);
                foreach ($resizedPaths as $size => $path) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'path' => $path,
                        'size' => $size,
                        'position' => $index
                    ]);
                }
            }

        }
    }
}
