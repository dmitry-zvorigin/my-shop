import clsx from "clsx";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({
  product,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  isOpen = false,         
  onOpen,                 
  onClose,               
}) {
  const hasImages =
    Boolean(product.images?.medium?.length) ||
    Boolean(product.image_medium_url);

  const columnsClosed = " [grid-template-columns:200px_1fr_200px]";
  const columnsOpen   = " [grid-template-columns:0px_1fr_200px]";

  // Для галереи возьмём medium → original → одиночный url
  const gallery = product.images?.medium?.length
    ? product.images.medium
    : product.image_medium_url
    ? [product.image_medium_url]
    : [];

  return (
    <div
      className={clsx(
        "grid gap-5 p-5 bg-white rounded-lg relative",
        "[grid-template-areas:'section_section_section''img_name_price''img_stat_price']",
        "transition-[grid-template-columns] duration-500 ease-in-out group",
        isOpen && hasImages ? columnsOpen : columnsClosed
      )}
    >
      {/* SECTION (верхняя) — только если есть картинки */}
      <section
        className={clsx(
          "[grid-area:section] overflow-hidden",
          "transition-[max-height,opacity] duration-500 ease-in-out",
          isOpen && hasImages ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="h-full flex items-center justify-center">
          {gallery.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto h-full w-full">
              {gallery.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${product.name} ${idx + 1}`}
                  className="max-h-full w-auto object-contain"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400">Нет изображений</div>
          )}
        </div>
      </section>

      {/* IMG (левая колонка) */}
      <div
        className={clsx(
          "[grid-area:img] flex items-center justify-center overflow-hidden",
          hasImages ? "cursor-pointer" : ""
        )}
        onClick={() => hasImages && onOpen?.()}
        title={hasImages ? "Открыть изображения" : "Нет изображений"}
      >
        {product.image_medium_url ? (
          <img
            src={product.image_medium_url}
            alt={product.name}
            className={clsx(
              "w-full object-contain transition-opacity duration-300",
              isOpen && hasImages && "opacity-0",
              isOpen ? "" : "h-[200px]"
            )}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
            Нет фото
          </div>
        )}
      </div>

      {/* NAME */}
      <div className="[grid-area:name]">
        <Link className="line-clamp-2 text-base font-medium text-gray-900 hover:text-orange-500 transition">
          {product.name}
        </Link>
      </div>

      {/* STAT */}
      <div className="[grid-area:stat] flex justify-start items-end h-[50px]">Other / Stat</div>

      {/* PRICE & BUTTONS */}
      <aside className="[grid-area:price] flex flex-col items-end gap-5">
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
            onClick={() => onToggleFavorite?.(product)}
            className="flex size-[45px] items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition hover:bg-gray-200 hover:text-black"
          >
            <HeartIcon className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="flex h-[45px] w-[110px] items-center justify-center rounded-lg text-base font-medium transition outline-1 outline-gray-300 bg-gradient-to-b from-white to-gray-50 group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white group-hover:outline-0"
          >
            Купить
          </button>
        </div>
      </aside>

      {/* Кнопка закрытия */}
      {isOpen && hasImages && (
        <button
          onClick={() => onClose?.()}
          className="absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-white shadow hover:bg-gray-100"
          aria-label="Закрыть изображения"
        >
          &times;
        </button>
      )}
    </div>
  );
}
