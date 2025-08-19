import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";

function Lightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
  thumbnails = [],
  currentIndex = 0,
  onSelect,
  delayMs = 300,
}) {

  const [delayedSrc, setDelayedSrc] = useState("");
  const [fadeSrc, setFadeSrc] = useState(""); // то, что сейчас видно
  const [visible, setVisible] = useState(false);

  // Задержка перед установкой новой картинки
  useEffect(() => {
    if (!src) return;

    setVisible(false); // запускаем анимацию исчезновения

    const t = setTimeout(() => {
      setDelayedSrc(src);
      setVisible(true); // плавный показ
    }, delayMs);

    return () => clearTimeout(t);
  }, [src, delayMs]);

  // Обновляем картинку, когда delayedSrc меняется
  useEffect(() => {
    if (delayedSrc) {
      setFadeSrc(delayedSrc);
    }
  }, [delayedSrc]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || e.target?.isContentEditable;
      if (typing) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && canPrev) {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight" && canNext) {
        e.preventDefault();
        onNext();
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, canPrev, canNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="h-full w-full bg-white flex flex-col" onClick={(e)=>e.stopPropagation()}>
        {/* Header (60px) */}
        <div className="h-[60px] grid grid-cols-[1fr_auto] items-center px-5 bg-gray-100">
          <h1 className="text-[20px] font-medium truncate">{alt}</h1>
          <button onClick={onClose} className="size-9 rounded-full bg-white/90 grid place-items-center cursor-pointer">✕</button>
        </div>

        {/* Центр: занимает остаток, именно здесь и «растянутся» стрелки */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center px-6">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="absolute inset-y-0 left-0 my-3 w-[80px] rounded-lg hover:bg-gray-200 grid place-items-center disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          {fadeSrc && (
            <img
              alt={alt}
              key={fadeSrc}
              src={fadeSrc}
              className={clsx(
                'max-h-full max-w-[90vw] object-contain',
                visible ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {!fadeSrc && (
            <div className="w-3/4 h-3/4 bg-gray-200 animate-pulse rounded-lg" />
          )}

          <button
            onClick={onNext}
            disabled={!canNext}
            className="absolute inset-y-0 right-0 my-3 w-[80px] rounded-lg hover:bg-gray-200 grid place-items-center disabled:opacity-40 cursor-pointer"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        {/* Thumbs bar (фикс. высота/auto) */}
        <div className="shrink-0 p-2">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide p-2">
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={clsx(
                  "flex-shrink-0 rounded-lg overflow-hidden outline-1 outline-gray-300 cursor-pointer p-2",
                  i === currentIndex && "outline-orange-500"
                )}
              >
                <img src={thumb} alt={`thumb ${i+1}`} className="w-20 h-20 object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default memo(Lightbox);
