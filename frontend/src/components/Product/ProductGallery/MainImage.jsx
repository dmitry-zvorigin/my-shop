import { memo, useEffect, useState } from "react";
import clsx from "clsx";

function MainImage({
  src,
  alt,
  onOpenLightbox,
  height = 500,
  delayMs = 300, // задержка перед показом
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

  return (
    <div
      className="relative rounded-lg grid place-items-center overflow-hidden"
      style={{ maxHeight: height, maxWidth: "100%" }}
    >
      {fadeSrc && (
        <img
          key={fadeSrc}
          src={fadeSrc}
          alt={alt}
          onClick={onOpenLightbox}
          className={clsx(
            "object-contain transition-opacity duration-500 absolute cursor-zoom-in",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ maxHeight: height - 20, maxWidth: "100%" }}
        />
      )}
      {!fadeSrc && (
        <div className="w-3/4 h-3/4 bg-gray-200 animate-pulse rounded-lg" />
      )}
    </div>
  );
}

export default memo(MainImage);
