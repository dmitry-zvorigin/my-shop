import { useCallback, useEffect, useRef, useState } from "react";

export default function ProductMediaStrip({ images }) {
  const blockRef = useRef(null);
  const buttonRef = useRef(null);

  const [state, setState] = useState({
    containerWidth: 0,
    imagesPerRow: 0,
  });

  const updateContainerWidth = useCallback(() => {
    const blockEl = blockRef.current;
    const btnEl = buttonRef.current;
    if (!blockEl || !btnEl) return;

    const blockWidth = blockEl.clientWidth;
    const buttonWidth = btnEl.clientWidth + 8; // gap-2
    const containWidth = blockWidth - buttonWidth;

    const imageWidth = 100; // 80 + gap-2 (8px)
    const imagesPerRow = Math.floor(containWidth / imageWidth);

    setState({ containerWidth: containWidth, imagesPerRow });
  }, []);

  useEffect(() => {
    updateContainerWidth(); // первый расчёт
    window.addEventListener("resize", updateContainerWidth);
    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, [updateContainerWidth]);

  const { imagesPerRow } = state;

  return (
    <div className="flex items-center m-5" ref={blockRef}>
      <div className="flex gap-5">
        {images.map((image, index) =>
          index < imagesPerRow ? (
            <img
              key={index}
              src={image}
              alt={image}
              className="flex-none w-20 h-20 object-fill rounded-lg cursor-pointer"
            />
          ) : null
        )}

        <button
          className="rounded-lg flex-none w-20 h-20 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          ref={buttonRef}
        >
          <p>Всего</p> {images.length}
        </button>
      </div>
    </div>
  );
}