<?php

namespace App\DTOs;

use Illuminate\Http\Request;

class ProductFilterDTO 
{
    public ?string $category_slug = null;

    public ?int $category_id = null;
    public ?string $brand = null;
    public ?int $brand_id = null;
    public ?string $sort = null;
    public ?int $per_page = null;

    public static function fromRequest(Request $request): self {
        $dto = new self();
        $dto->category_slug = $request->string('category_slug')->toString() ?: null;
        $dto->category_id =   $request->integer('category_id') ?: null;
        $dto->brand =         $request->string('brand')->toString() ?: null;
        $dto->brand_id =      $request->integer('brand_id') ?: null;
        $dto->sort =          $request->string('sort')->toString() ?: null;
        $dto->per_page =      $request->integer('per_page') ?: 10;
        return $dto;
    }

    public function withCategorySlug(string $slug): self {
        $this->category_slug = $slug;
        return $this;
    }

    public function withBrandSlug(string $slug): self {
        $this->brand = $slug;
        return $this;
    }
}