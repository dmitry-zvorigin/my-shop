import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ThumbsColumn from "./ThumbsColumn";
import MainImage from "./MainImage";
import ImageViewer from "./ImageViewer";

function ProductGallery({
  images, 
  alt, 
  height = 500, 
  thumbSize = 76,
}) {

  const thumbs  = useMemo(() => images?.thumb   ?? images?.medium ?? [], [images]);
  const medium  = useMemo(() => images?.medium  ?? images?.thumb  ?? [], [images]);
  const original= useMemo(() => images?.original?? medium, [images, medium]);

  const [index, setIndex] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [isMainLoading, setMainLoading] = useState(true);
  const listRef = useRef(null);

  const active = medium[index] || medium[0] || "";

  useEffect(() => {
    // предзагрузка соседей
    if (medium[index + 1]) { const im = new Image(); im.src = medium[index + 1]; }
    if (medium[index - 1]) { const im = new Image(); im.src = medium[index - 1]; }
  }, [index, medium]);

  const select = useCallback((i) => {
    setMainLoading(true);
    setIndex(i);
    const el = listRef.current?.querySelector(`[data-thumb="${i}"]`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  return (
    <div className="grid grid-cols-[80px_1fr] gap-5" style={{ height }}>
      <ThumbsColumn 
        listRef={listRef}
        thumbs={thumbs}
        index={index}
        onSelect={select}
        onOpenLightbox={() => { setOpen(true); setMainLoading(false); }}
        thumbSize={thumbSize}
        height={height}
        recomputeHookDep={active}
      />

      <MainImage
        src={active}
        alt={alt}
        onOpenLightbox={() => setOpen(true)}
        height={height}
        isLoading={isMainLoading}
        onLoad={() => setMainLoading(false)}
      />

      {isOpen && (
        <ImageViewer
          images={original}          
          thumbnails={thumbs}        
          initialIndex={index}
          alt={alt}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default memo(ProductGallery);