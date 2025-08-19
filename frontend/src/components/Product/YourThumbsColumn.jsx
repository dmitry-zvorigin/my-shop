import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

const THUMB_SIZE = 72; // высота превью в px (под твой layout)
const GAP = 20;        // твой gap между кнопками/элементами (см. className)

export default function YourThumbsColumn({ safeImages, alt, index, select, openLightbox, listRef, height = 500 }) {
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);

  const updateButtons = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setCanUp(el.scrollTop > 0);
    setCanDown(el.scrollTop < max - 1);
  }, [listRef]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    updateButtons();
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons, listRef]);

  const scrollThumbs = useCallback((dir) => {
    const el = listRef.current;
    if (!el) return;
    const step = (THUMB_SIZE + 8) * 3; // прокрутка ~3 миниатюр; 8 — примерный внутренний gap
    el.scrollBy({ top: dir * step, behavior: "smooth" });
  }, []);

  return (
    <div className="relative" style={{ height }}>
      {/* Кнопка ВВЕРХ */}
      <button
        type="button"
        onClick={() => scrollThumbs(-1)}
        disabled={!canUp}
        className="absolute left-1 right-1 top-1 z-10 grid place-items-center rounded-md bg-white/90 shadow hover:bg-white disabled:opacity-40"
        aria-label="Прокрутить вверх"
      >
        <ChevronUpIcon className="size-4" />
      </button>

      {/* Сама колонка превью */}
      <div
        ref={listRef}
        className="overflow-scroll scrollbar-hide rounded-lg mt-8 mb-8"
        style={{ maxHeight: height - 16 }} // оставляем место под кнопки
      >
        <div className="flex flex-col gap-5 py-2">
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              data-thumb={i}
              onMouseEnter={() => select(i)}
              onClick={openLightbox}
              className={clsx(
                "relative aspect-square overflow-hidden border-l-4 flex items-center justify-center cursor-zoom-in outline-0",
                i === index ? "border-l-4 border-orange-500 " : "border-white"
              )}
              aria-label={`Изображение ${i + 1}`}
              style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
            >
              <img
                src={src}
                alt={`${alt} — превью ${i + 1}`}
                className="w-full h-full object-cover p-2"
                loading={i > 3 ? "lazy" : "eager"}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка ВНИЗ */}
      <button
        type="button"
        onClick={() => scrollThumbs(1)}
        disabled={!canDown}
        className="absolute left-1 right-1 bottom-1 z-10 grid place-items-center rounded-md bg-white/90 shadow hover:bg-white disabled:opacity-40"
        aria-label="Прокрутить вниз"
      >
        <ChevronDownIcon className="size-4" />
      </button>
    </div>
  );
}
