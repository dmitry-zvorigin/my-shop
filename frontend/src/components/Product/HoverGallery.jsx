import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/** Показывает images[i], где i зависит от X курсора в контейнере */
export default function HoverGallery({
  images = [],           // массив URL
  alt = "",
  className = "",
  preloadOnHover = true, // можно отключить прелоад
}) {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const count = images.length;

  // Прелоад оставшихся картинок при первом наведении
  useEffect(() => {
    if (!preloadOnHover || count <= 1) return;
    let started = false;
    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      if (started) return;
      started = true;
      images.forEach((src, i) => {
        if (i === 0) return;
        const img = new Image();
        img.src = src;
      });
    };
    el.addEventListener("mouseenter", onEnter);
    return () => el.removeEventListener("mouseenter", onEnter);
  }, [images, count, preloadOnHover]);

  // Вычисляем индекс по X. throttling через rAF чтобы не дёргать состояние слишком часто
  const rAF = useRef(0);
  const onMove = (e) => {
    if (!ref.current || count <= 1) return;
    if (rAF.current) cancelAnimationFrame(rAF.current);
    rAF.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const segment = rect.width / count;
      const next = Math.min(Math.floor(x / segment), count - 1);
      if (next !== idx) setIdx(next);
    });
  };

  const onLeave = () => {
    // Возвращать первую картинку
    setIdx(0);
  };

  if (count === 0) {
    return (
      <div className={clsx("flex items-center justify-center bg-gray-100 text-gray-400", className)}>
        Нет фото
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx(
        "relative overflow-hidden select-none",
        className
      )}
      aria-label={alt}
    >
      {/* Одно <img>, просто меняем src */}
      <img
        src={images[idx]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain transition-opacity duration-100"
        draggable="false"
      />

      {/* Невидимый overlay для клика/тача (делит на сегменты логически, а не DOM’ом) */}
      <div className="absolute inset-0" />

      {/* Опционально — маленькие индикаторы снизу */}
      {count > 1 && (
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 w-1.5 rounded-full bg-gray-300",
                i === idx && "bg-orange-500"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}