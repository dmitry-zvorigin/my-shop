import { HeartIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { BsCart3 } from "react-icons/bs";

function ProductActionButtons({ product, isFavorite, onAddToCart, onToggleFavorite, isGrid }) {

  return(
    <aside className="flex flex-col justify-center gap-5 h-full items-end">
      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
          onClick={() => onToggleFavorite?.(product)}
          className="flex size-[45px] items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition hover:bg-gray-300 hover:text-black cursor-pointer"
        >
          <HeartIcon className="size-5" />
        </button>

        {!isGrid ? (
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="
              flex h-[45px] w-[110px] items-center justify-center rounded-lg text-base font-medium cursor-pointer
              transition outline-1 outline-gray-300 bg-gradient-to-b from-white to-gray-50 
              group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white group-hover:outline-0"
          >
            Купить
          </button>
        ) : (
          <button 
            className="
              flex justify-center items-center h-[45px] w-[45px] outline-1 rounded-lg cursor-pointer transition outline-gray-300
              bg-gradient-to-b from-white to-gray-50 
              group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white group-hover:outline-0
              "
          >
            <BsCart3 size={18} className=""/>
          </button>
        )}


      </div>
    </aside>
  );
}

export default memo (ProductActionButtons);