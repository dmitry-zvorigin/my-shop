import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function HorizontalScroller({ children, scrollStep = 300 }) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollStep, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollStep, behavior: "smooth" });
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [children]); // следим за изменением контента

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    checkScroll(); // сразу после монтирования
    window.addEventListener("resize", checkScroll); // при изменении размеров

    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]); // или [items], если передаешь их как пропсы

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Левая кнопка */}
      {canScroll && (
        <button
          onClick={scrollLeft}
          disabled={atStart}
          className={clsx(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow p-2 rounded-full hover:shadow-md transform duration-300 opacity-0",
            isHovered && "opacity-100",
            atStart ? "bg-gray-400" : "bg-white"
          )}
        >
          <ChevronLeftIcon className="size-5" />
        </button>
      )}

      {/* Область скролла */}
      <div ref={scrollRef} className="flex gap-5 overflow-x-hidden h-full py-5">
        {children}
      </div>

      {/* Правая кнопка */}
      {canScroll && (
        <button
          onClick={scrollRight}
          disabled={atEnd}
          className={clsx(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow p-2 rounded-full hover:shadow-md transform duration-300 opacity-0",
            isHovered && "opacity-100",
            atEnd ? "bg-gray-400" : "bg-white"
          )}
        >
          <ChevronRightIcon className="size-5" />
        </button>
      )}
    </div>
  );
}