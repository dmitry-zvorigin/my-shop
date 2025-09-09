import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export default function useCollapsibleHeights({
  listRef,
  isOpen,
  rowsCollapsed,
  rowsExpanded,
  isSearching,
  showAll,
  setShowAll,
  renderAll,
  setRenderAll,
}) {
  const [hCollapsed, setHCollapsed] = useState(0);
  const [hExpanded, setHExpanded] = useState(0);

  // ---- измерение высоты N строк
  const measureHeights = useCallback(() => {
    const root = listRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll('[data-row="true"]'));
    const sumRows = (rows) => {
      const n = Math.min(rows, items.length);
      if (n === 0) return 48; // запас под "Ничего не найдено"
      let total = 0;
      for (let i = 0; i < n; i++) total += Math.round(items[i].getBoundingClientRect().height);
      return total;
    };

    setHCollapsed(sumRows(rowsCollapsed));
    setHExpanded(sumRows(rowsExpanded));
  }, [rowsCollapsed, rowsExpanded, listRef]);

  // при изменении состава/открытии — перемеряем
  useLayoutEffect(() => {
    if (!isOpen) return;
    measureHeights();
  }, [renderAll, isOpen, measureHeights]);

  // подхват ресайза/переносов
  useEffect(() => {
    if (!listRef.current || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => measureHeights());
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [measureHeights, listRef]);

  // поиск: раскрываем визуально. Чтобы анимация была корректной, покажем сразу весь DOM
  useEffect(() => {
    if (isSearching && !showAll) {
      setRenderAll(true);
      requestAnimationFrame(() => {
        setShowAll(true);
        requestAnimationFrame(measureHeights);
      });
    }
  }, [isSearching, showAll, measureHeights, setRenderAll, setShowAll]);

  // обработчик "Показать всё / Свернуть" — вариант B (DOM режем после transitionend)
  const onToggleShowAll = () => {
    if (!showAll) {
      // Раскрыть: сначала рендерим всё, потом анимируем к высоте "rowsExpanded"
      setRenderAll(true);
      requestAnimationFrame(() => {
        setShowAll(true);
        requestAnimationFrame(measureHeights);
      });
    } else {
      // Свернуть: анимируем к высоте "rowsCollapsed"
      setShowAll(false);
    }
  };

  // После завершения анимации max-height — можно резать DOM до первых N
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onEnd = (e) => {
      if (e.propertyName !== "max-height") return;
      if (!showAll) {
        setRenderAll(false);
        requestAnimationFrame(measureHeights);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [showAll, measureHeights, setRenderAll, listRef]);

  return { hCollapsed, hExpanded, onToggleShowAll };
}