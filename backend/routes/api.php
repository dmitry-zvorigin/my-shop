<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/brand', [BrandController::class, 'show']);
Route::get('/brand/{slug}', [BrandController::class, 'showBySlug']);

Route::get('/categories/tree', [CategoryController::class, 'tree']);
Route::get('/categories/slug/{slug}', [CategoryController::class, 'showBySlug']);

// Продукты по категории
Route::get('/categories/{categorySlug}/products', [ProductController::class, 'getByCategory']);
Route::get('/categories/{categorySlug}/metadata', [ProductController::class, 'getCategoryMetadata']);
Route::get('/categories/{categorySlug}/filters', [ProductController::class, 'getCategoryFilters']);

// Test api 
Route::get('/product/all', [ProductController::class, 'showAll']);
Route::get('/product/{slug}', [ProductController::class, 'showBySlug']);