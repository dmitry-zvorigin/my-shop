import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import ImageViewerPortal from "./ImageViewerPortal";

const FADE_MS = 1000;

function ImageViewer({
  images = [],       
  thumbnails = [],
  initialIndex = 0,
  alt,
  onClose,
}) {
  // локальный индекс просмотра
  const [viewIndex, setViewIndex] = useState(initialIndex);
  const canPrev = viewIndex > 0;
  const canNext = viewIndex < images.length - 1;

  // кросс‑фейд
  const src = images[viewIndex] || "";

  // Убираем скролл
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  // Клавиатура
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "ArrowLeft" && canPrev)  { e.preventDefault(); setViewIndex(i => i - 1); }
      if (e.key === "ArrowRight" && canNext) { e.preventDefault(); setViewIndex(i => i + 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canPrev, canNext, onClose]);

  // Переходы
  const onPrev = () => canPrev && setViewIndex(viewIndex - 1);
  const onNext = () => canNext && setViewIndex(viewIndex + 1);
  const onSelectThumb = (i) => setViewIndex(i);

  return (
    <ImageViewerPortal>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <div className="h-full w-full bg-white flex flex-col" onClick={(e)=>e.stopPropagation()}>
          {/* Header */}
          <div className="h-[60px] grid grid-cols-[1fr_auto] items-center px-5 bg-gray-100">
            <h1 className="text-[20px] font-medium truncate">{alt}</h1>
            <button onClick={onClose} className="size-9 rounded-full bg-white/90 grid place-items-center cursor-pointer">✕</button>
          </div>

          {/* Центр */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center px-6">
            <button
              onClick={onPrev}
              disabled={!canPrev}
              className="absolute inset-y-0 left-0 my-3 w-[80px] rounded-lg hover:bg-gray-200 grid place-items-center disabled:opacity-40 cursor-pointer ring-0 outline-0"
            >
              <ChevronLeftIcon className="size-5" />
            </button>

            <div className="relative max-h-full max-w-[90vw] w-full h-full grid place-items-center">
              <img
                key={`curr:${src}`}
                src={src}
                alt={alt}
                // onLoad={handleLoad}
                className={clsx(
                  "absolute inset-0 m-auto object-contain transition-opacity duration-1000 fade-in",
                  // loaded ? "opacity-100" : "opacity-0"
                )}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>

            <button
              onClick={onNext}
              disabled={!canNext}
              className="absolute inset-y-0 right-0 my-3 w-[80px] rounded-lg hover:bg-gray-200 grid place-items-center disabled:opacity-40 cursor-pointer ring-0 outline-0"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>

          {/* Thumbs */}
          <div className="shrink-0 p-2">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide p-2">
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => onSelectThumb(i)}
                  className={clsx(
                    "flex-shrink-0 rounded-lg overflow-hidden outline-1 outline-gray-200 p-2 cursor-pointer",
                    i === viewIndex ? "outline-orange-500" : "border-transparent"
                  )}
                >
                  <img src={thumb} alt={`thumb ${i+1}`} className="w-20 h-20 object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ImageViewerPortal>
  );
}

export default memo(ImageViewer);
