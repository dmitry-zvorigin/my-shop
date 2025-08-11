<?php 

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;

class ImageService 
{
    public function storeResizedVersions(string $path, string $disk = 'public'): array
    {
        $resized = [];

        $sizes = [
            'medium' => 512,
            'thumb' => 128,
        ];

        $sourcePath = Storage::disk($disk)->path($path);

        foreach ($sizes as $label => $size) {
            $image = Image::read($sourcePath)
                ->resize($size, $size, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

            $newPath = str_replace('original/', "$label/", $path);

            Storage::disk($disk)->put(
                $newPath,
                $image->toPng()
            );

            $resized[$label] = $newPath;
        }

        return $resized;
    }

    public function storeResizedVersionsProduct(string $path, string $disk = 'public'): array
    {
        $resized = [];
        $sizes = [
            'medium' => 512,
            'thumb'  => 128,
        ];

        $sourcePath = Storage::disk($disk)->path($path);

        foreach ($sizes as $label => $size) {
            $image = Image::read($sourcePath)
                ->scaleDown($size, $size);

            $newPath = str_replace('/original/', "/{$label}/", $path);

            $binary = $image->encode(new WebpEncoder(quality: 85));
            Storage::disk($disk)->put($newPath, $binary);

            $resized[$label] = $newPath;
        }

        return $resized;
    }
}