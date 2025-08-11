<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();

            // Основные поля
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();

            // Связи
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();

            // Цена и остатки
            $table->decimal('price', 10, 2)->default(0);
            $table->integer('stock_quantity')->default(0);

            // Сортировка
            $table->integer('sort_order')->default(0);

            // Дополнительно
            $table->boolean('is_active')->default(true);
            $table->integer('views')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
