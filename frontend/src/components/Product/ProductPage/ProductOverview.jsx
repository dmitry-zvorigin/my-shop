import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductPrice from "../ProductCard/ProductPrice";
import ProductMediaStrip from "./ProductOverview/ProductMediaStrip";

export default function ProductOverview({
  product,
  onBuy,
  onToggleFavorite,
  isFavorite = false,
  ratingValue = 0,
  ratingCount = 0,
  questionsCount = 0,
}) {
  return (
    <div className="rounded-lg bg-white grid">
      <div className="grid grid-cols-[1fr_1fr]">
        {/* Левая колонка — большая галерея */}
        <ProductGallery
          images={product.images}
          alt={product.name}
          height={500}
          thumbSize={80}
        />

        {/* Правая колонка — инфо и действия */}
        <div className="flex flex-col gap-5 p-5">

          {/* Короткое описание + бренд */}
          <div className="h-[80px] grid grid-cols-[1fr_100px] gap-4">
            <h2 className="text-sm leading-snug">
              {/* Вставь сюда реальное краткое описание или характеристики */}
              AM5, 16 x 4.3 ГГц, L2 - 16 МБ, L3 - 64 МБ, 2 х DDR5-5600 МГц, AMD Radeon Graphics, TDP 170 В
            </h2>
            <div className="flex items-center justify-center">
              <Link to={`/brand/${product.brand.slug}`} className="block">
                <img
                  src={product.brand.logo_url}
                  alt={product.brand.name}
                  className="object-contain max-h-[80px]"
                />
              </Link>
            </div>
          </div>

          {/* Действия/метрики */}
          <div className="h-[36px] flex items-center gap-5">
            <button className="h-full bg-gray-100 rounded-lg p-2 gap-1 flex items-center justify-center hover:bg-gray-200 transition">
              <span>Сравнить</span>
            </button>

            <button className="h-full bg-gray-100 rounded-lg p-2 gap-1 flex items-center justify-center hover:bg-gray-200 transition">
              <StarIcon className="size-4 text-yellow-500" />
              <span className="font-bold">{ratingValue.toFixed(2)}</span>
              <span className="px-1">|</span>
              <span>{ratingCount} отзывов</span>
            </button>

            <button className="h-full bg-gray-100 rounded-lg p-2 flex items-center justify-center hover:bg-gray-200 transition">
              {questionsCount} вопросов
            </button>

            <div className="h-full w-[100px] bg-gray-100 rounded-lg" />
          </div>

          {/* Цена + избранное + купить */}
          <div className="h-[64px] grid grid-cols-[3fr_64px_150px] gap-5">
            <ProductPrice price={product.price} isGrid={true} classText="text-2xl" />

            <button
              type="button"
              onClick={onToggleFavorite}
              className="rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
              aria-pressed={isFavorite}
              title={isFavorite ? "Убрать из избранного" : "В избранное"}
            >
              <HeartIcon className={`size-[18px] ${isFavorite ? "text-red-500" : ""}`} />
            </button>

            <button
              onClick={onBuy}
              className="flex items-center justify-center rounded-lg text-lg font-medium text-white
                         transition bg-gradient-to-b from-orange-300 to-orange-400
                         hover:from-orange-400 hover:to-orange-500"
            >
              Купить
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя полоса мини-превью */}
      <div className="mt-10">
        <ProductMediaStrip images={product.images?.thumb ?? []} />
      </div>
    </div>
  );
}
