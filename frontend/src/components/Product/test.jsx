import { useEffect, useMemo, useRef, useState, memo, useCallback } from "react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function preload(src) {
  const img = new Image();
  img.src = src;
}

function ProductGalleryBase({ images, originals, alt, height = 500, thumbSize = 76 }) {
  const safeImages = useMemo(() => (images && images.length ? images : []), [images]);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [isOpen, setOpen] = useState(false); // лайтбокс
  const listRef = useRef(null);
  const active = safeImages[index];

  // предзагрузка соседних
  useEffect(() => {
    if (safeImages[index + 1]) preload(safeImages[index + 1]);
    if (safeImages[index - 1]) preload(safeImages[index - 1]);
  }, [index, safeImages]);

  // клавиатура ← →
  useEffect(() => {
    const onKey = (e) => {
      if (isOpen) {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, safeImages.length - 1));
        if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, safeImages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, safeImages.length]);

  // кнопки прокрутки ленты
  const scrollThumbs = (dir) => {
    const amount = (thumbSize + 8); // шаг ≈ 1 миниатюра
    listRef.current?.scrollBy({ top: dir * amount, behavior: "smooth" });
  };

  const select = useCallback((i) => {
    setIndex(i);
    const el = listRef.current?.querySelector(`[data-thumb="${i}"]`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  const openLightbox = useCallback(() => {
    setOpen(true);
    setZoom(false);
  }, []);

  const closeLightbox = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, safeImages.length - 1)), [safeImages.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  if (!safeImages.length) {
    return (
      <div className="grid place-items-center rounded-lg" style={{ height }}>
        <div className="text-gray-500 text-sm ">Нет изображений</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-5" style={{ height }}>
      {/* Превью слева */}
      <div className="h-[500px] relative">

        <button
          onClick={() => scrollThumbs(-1)}
          className="absolute left-1/2 -translate-x-1/2 top-1 z-10 grid place-items-center rounded-full size-[30px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Прокрутить вверх"
        >
          <ChevronUpIcon className="size-4" />
        </button>

        <div
          ref={listRef}
          className="overflow-scroll scrollbar-hide rounded-lg h-full"
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
              >
                <img
                  src={src}
                  alt={`${alt} — превью ${i + 1}`}
                  className="h-full object-scale p-2"
                  loading={i > 3 ? "lazy" : "eager"}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollThumbs(1)}
          className="absolute right-1/2 translate-x-1/2 bottom-1 z-10 grid place-items-center rounded-full size-[30px] bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Прокрутить вниз"
        >
          <ChevronDownIcon className="size-4" />
        </button>

      </div>
      {/* Основное изображение */}
      <div className="relative rounded-lg grid place-items-center">
        <div
          className={clsx(
            "relative max-h-full w-full h-full grid place-items-center cursor-zoom-in",
          )}
          onClick={openLightbox}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
        >
          <img
            src={active}
            alt={alt}
            className="object-contain"
            style={{ maxHeight: height - 20 }}
          />
        </div>
      </div>

      {/* Лайтбокс */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 size-9 rounded-full bg-white/90 grid place-items-center cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <button
              onClick={prev}
              disabled={index === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 grid place-items-center disabled:opacity-40"
              aria-label="Предыдущее"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <img
              src={(originals && originals[index]) || active}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={next}
              disabled={index === safeImages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 grid place-items-center disabled:opacity-40"
              aria-label="Следующее"
            >
              <ChevronRightIcon className="size-5"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductGalleryBase);
