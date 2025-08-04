<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/brand', [BrandController::class, 'show']);
Route::get('/brand/{slug}', [BrandController::class, 'showBySlug']);

Route::get('/categories/tree', [CategoryController::class, 'tree']);
Route::get('/categories/slug/{slug}', [CategoryController::class, 'showBySlug']);
