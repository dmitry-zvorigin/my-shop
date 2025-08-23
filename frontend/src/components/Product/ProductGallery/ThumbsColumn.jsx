import { memo, useCallback } from "react";
import useScrollState from "./useScrollState";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function ThumbsColumn({
  listRef,
  thumbs = [],
  index,
  onSelect,
  onOpenLightbox,
  thumbSize = 76,
  height = 500,
}) {

  const { canUp, canDown } = useScrollState(listRef);

  const scrollThumbs = useCallback((dir) => {
    const amount = thumbSize + 8;
    listRef.current?.scrollBy({ top: dir * amount, behavior: "smooth" });
  }, [listRef, thumbSize]);


  return (      
    <div className="relative py-5" style={{ height }}>

      {canUp && (
        <button
          onClick={() => scrollThumbs(-1)}
          className="absolute left-1/2 -translate-x-1/2 top-1 z-10 grid place-items-center rounded-full size-[30px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Прокрутить вверх"
        >
          <ChevronUpIcon className="size-4" />
        </button>
      )}

      <div
        ref={listRef}
        className="overflow-scroll scrollbar-hide h-full"
      >
        <div className="flex flex-col gap-5">
          {thumbs.map((src, i) => (
            <button
              key={src + i}
              data-thumb={i}
              onMouseEnter={() => onSelect(i)}
              onClick={onOpenLightbox}
              className={clsx(
                "relative aspect-square overflow-hidden border-l-4 flex items-center justify-center cursor-zoom-in outline-0",
                i === index ? "border-l-4 border-orange-500 " : "border-white"
              )}
              aria-label={`Изображение ${i + 1}`}
            >
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                className="h-full object-scale p-2"
                loading={i > 3 ? "lazy" : "eager"}
              />
            </button>
          ))}
        </div>
      </div>

      {canDown && (
        <button
          onClick={() => scrollThumbs(1)}
          className="absolute right-1/2 translate-x-1/2 bottom-1 z-10 grid place-items-center rounded-full size-[30px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Прокрутить вниз"
        >
          <ChevronDownIcon className="size-4" />
        </button>
      )}

    </div>
  );
}

export default memo(ThumbsColumn);