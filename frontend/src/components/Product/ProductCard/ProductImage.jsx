import clsx from "clsx";
import HoverGallery from "../HoverGallery";
import { memo } from "react";

function ProductImage({ gallery, name, className = "", interactive = true, onToggleOpen }) {

  const hasImages = gallery.length > 0;

  const handleClick = () => {
    if (!interactive || !hasImages) return;
    onToggleOpen?.();
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden",
        hasImages ? "cursor-pointer" : "",
        className
      )}
      onClick={handleClick}
      title={hasImages ? "Открыть изображения" : "Нет изображений"}
    >
      {hasImages ? (
        <HoverGallery
          images={gallery}
          alt={name}
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-[200px] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
          Нет фото
        </div>
      )}
    </div>
  );
}

export default memo (ProductImage);