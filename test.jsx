import { ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import AnimatedCheckbox from "../ui/AnimatedCheckbox";

export default function FiltersSidebar({
  title = "",
  options = [],
  value = [],
  onChange,
  defaultOpen = true,
  maxCollapsed = 7, // свернутый режим: столько строк показываем
}) {
  // ---- состояние
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);        // визуальное состояние:  max-height = collapsed/expanded
  const [renderAll, setRenderAll] = useState(false);    // что реально рендерим в DOM: только первые или все
  const listRef = useRef(null);
  const selectAllRef = useRef(null);

  // Test
  const wrapRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [btnTop, setBtnTop] = useState(0);
  const [btnShow, setBtnShow] = useState(false);
  const hideTimerRef = useRef(null);


  // высоты контейнера для плавной анимации
  const [hCollapsed, setHCollapsed] = useState(0);
  const [hExpanded, setHExpanded]   = useState(0);

  const COLLAPSED_ROWS = Math.max(1, Math.floor(maxCollapsed));
  const EXPANDED_ROWS  = COLLAPSED_ROWS + 1;

  // ---- поиск / фильтрация
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter(o => (o.label || "").toLowerCase().includes(s));
  }, [q, options]);

  const isSearching   = q.trim().length > 0;
  const hasSelection  = Array.isArray(value) && value.length > 0;
  const hasFewOptions = options.length <= COLLAPSED_ROWS;

  // показываем в DOM либо все, либо только первые N (это важно для плавного "сворачивания")
  const visible = renderAll ? filtered : filtered.slice(0, COLLAPSED_ROWS);

  // ---- множества для "Выбрать всё"
  const selectedSet    = useMemo(() => new Set(value), [value]);
  const filteredValues = useMemo(() => filtered.map(o => o.value), [filtered]);
  const filteredSet    = useMemo(() => new Set(filteredValues), [filteredValues]);

  const selectedInFilteredCount = useMemo(
    () => filteredValues.reduce((acc, v) => acc + (selectedSet.has(v) ? 1 : 0), 0),
    [filteredValues, selectedSet]
  );

  const orderIndex = useMemo(() => new Map(options.map((o,i)=>[o.value,i])), [options]);
  const sortByOptions = (arr) => arr.slice().sort((a,b)=>(orderIndex.get(a)??1e9)-(orderIndex.get(b)??1e9));

  const allSelected  = filteredValues.length > 0 && selectedInFilteredCount === filteredValues.length;
  const noneSelected = selectedInFilteredCount === 0;
  const someSelected = !noneSelected && !allSelected;

  const toggleAll = () => {
    const next = allSelected
      ? value.filter(v => !filteredSet.has(v))
      : sortByOptions(Array.from(new Set([...value, ...filteredValues])));
    onChange?.(next);
    showApplyAtEl(selectAllRef.current); // ← якорим к блоку "Выбрать всё"
  };

  const resetAll = () => onChange?.([]);

  // ---- отдельный выбор
  const isSelected = (v) => selectedSet.has(v);
  // const toggleOne = (v) => {
  //   if (selectedSet.has(v)) {
  //     onChange?.(value.filter(x => x !== v));
  //   } else {
  //     onChange?.([...value, v]);
  //   }
  // };

  const nextForOne = (v) => (isSelected(v) ? value.filter(x => x !== v) : [...value, v]);

  const toggleOne = (v) => (e) => {
    const next = nextForOne(v);
    onChange?.(next);
    const li = e.currentTarget.closest("li");
    showApplyAtEl(li); // ← якорим кнопку к строке сразу
  };


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

    setHCollapsed(sumRows(COLLAPSED_ROWS));
    setHExpanded(sumRows(EXPANDED_ROWS));
  }, [COLLAPSED_ROWS, EXPANDED_ROWS]);

  // при изменении состава/открытии — перемеряем
  useLayoutEffect(() => {
    if (!isOpen) return;
    measureHeights();
  }, [renderAll, filtered.length, isOpen,  measureHeights]);

  // подхват ресайза/переносов
  useEffect(() => {
    if (!listRef.current || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => measureHeights());
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [measureHeights]);

  // поиск: раскрываем визуально. Чтобы анимация была корректной, покажем сразу весь DOM
  useEffect(() => {
    if (isSearching && !showAll) {
      setRenderAll(true);
      requestAnimationFrame(() => {
        setShowAll(true);
        requestAnimationFrame(measureHeights);
      });
    }
  }, [isSearching, showAll, measureHeights]);

  // обработчик "Показать всё / Свернуть" — вариант B (DOM режем после transitionend)
  const onToggleShowAll = () => {
    if (!showAll) {
      // Раскрыть: сначала рендерим всё, потом анимируем к высоте "EXPANDED_ROWS"
      setRenderAll(true);
      requestAnimationFrame(() => {
        setShowAll(true);
        requestAnimationFrame(measureHeights);
      });
    } else {
      // Свернуть: анимируем к высоте "COLLAPSED_ROWS"
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
  }, [showAll , measureHeights]);

  // Test

  const updatePos = useCallback(() => {
    
    if (!wrapRef.current || !anchorEl) return;
    
    const wr = wrapRef.current.getBoundingClientRect();
    const ar = anchorEl.getBoundingClientRect();
    setBtnTop(ar.top - wr.top + ar.height / 2);
  }, [anchorEl]);

  const showApplyAtEl = useCallback((el) => {
    if (!el || !wrapRef.current) return;
    const wr = wrapRef.current.getBoundingClientRect();
    const ar = el.getBoundingClientRect();
    setBtnTop(ar.top - wr.top + ar.height / 2); // считаем СРАЗУ от el
    setAnchorEl(el);                             // сохраняем якорь для будущих пересчётов
    setBtnShow(true);

    // авто-скрытие через 2 сек (перезапускаем таймер)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setBtnShow(false), 2000);
  }, []);

  // пока кнопка видима — обновляем позицию при скролле/ресайзе (чтобы не «съезжала»)
  useEffect(() => {
    if (!btnShow) return;
    const onAnyScroll = () => updatePos();
    const onResize = () => updatePos();
    window.addEventListener("scroll", onAnyScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onAnyScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [btnShow, updatePos]);

  useEffect(() => () => hideTimerRef.current && clearTimeout(hideTimerRef.current), []);

  return (
    <div ref={wrapRef} className="relative">
      {/* Заголовок/кнопка свёртки */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-3 mb-2 hover:text-orange-500 hover:bg-orange-50 transition"
      >
        <ChevronUpIcon
          className={clsx("size-4 transition-transform", isOpen && "rotate-180", hasSelection && "text-orange-500")}
        />
        <h2 className={clsx("text-sm", isOpen ? "font-bold" : " ", hasSelection && "font-bold text-orange-500")}>
          {title}
        </h2>
      </button>

      {/* Тело */}
      <div className="px-0">
        <div
          className={clsx(
            "overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-[100vh]" : "max-h-0"
          )}
        >
          {/* Поиск */}
          {!hasFewOptions && (
            <div className="px-3 mb-2">
              <div className="relative">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Поиск"
                  className="text-sm w-full rounded-lg bg-gray-100 px-3 py-2 pl-10 pr-10 outline-none"
                />
                <MagnifyingGlassIcon className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {isSearching && (
                  <button
                    type="button"
                    aria-label="Очистить поиск"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setQ("")}
                  >
                    <XMarkIcon className="size-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Выбрать всё (для всех отфильтрованных, видимых и скрытых) */}
          {!hasFewOptions && !isSearching && (
            <div ref={selectAllRef} className="px-3 pt-2 pb-1 cursor-pointer hover:bg-orange-50 relative" onClick={toggleAll}>
              <div className="border-b border-gray-200 flex items-center gap-2 w-full pb-2">
                <AnimatedCheckbox checked={allSelected} indeterminate={someSelected} />
                <span className="text-sm">{allSelected ? "Снять всё" : "Выбрать всё"}</span>
              </div>
            </div>
          )}

          {/* Опции */}
          <ul
            ref={listRef}
            className={clsx(
              "transition-[max-height] duration-300 ease-in-out relative",
              showAll ? "overflow-auto overscroll-contain" : "overflow-hidden"
            )}
            style={{
              maxHeight: isOpen ? (showAll ? hExpanded : hCollapsed) : 0,
              scrollbarGutter: "stable",
            }}
          >
            {visible.map((o) => {
              const checked = isSelected(o.value);
              return (
                <li 
                  key={o.value} 
                  data-row="true"
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={toggleOne(o.value)}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 text-left outline-none"
                  >
                    <AnimatedCheckbox checked={checked} />
                    <span className="text-sm text-gray-800">{o.label}</span>
                    {typeof o.count === "number" && (
                      <span className="text-xs text-gray-500 text-left">({o.count})</span>
                    )}
                  </button>
                </li>
              );
            })}

            {/* Пусто */}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">Ничего не найдено</li>
            )}
          </ul>

          {/* Низ: показать всё / сброс */}
          <div className="grid grid-cols-2 items-center gap-2 px-3 h-[36px]">
            <div>
              {!hasFewOptions && !isSearching && (
                <button
                  className="text-sm text-blue-700 justify-self-start flex items-center border-b border-dotted hover:text-orange-500 transition-colors"
                  onClick={onToggleShowAll}
                >
                  {showAll ? "Свернуть" : "Показать всё"}
                </button>
              )}
            </div>

            {hasSelection && (
              <button
                className="text-sm text-red-500 justify-self-end border-b border-dotted hover:text-orange-500 transition-colors"
                onClick={resetAll}
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
      </div>
      {btnShow && (
        <ButtonClick
          top={btnTop}
          onClick={() => { console.log("apply filters"); setBtnShow(false); }}
        />
      )}      
    </div>
  );
}


function ButtonClick({ top, onClick }) {
  // console.log(top);
  return (
    <>
      <button className="apply-filters-btn" style={{ top }} onClick={onClick}>
        <span className="z-10">Показать</span>
      </button>
      <style>{`
        .apply-filters-btn{
          position: absolute;
          right: 8px;
          transform: translate(100%, -50%); /* вправо и по центру */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 64px; /* h-16 */
          width: 128px; /* w-32 */
          color: #ffffff;
          font-weight: 600;
          border-radius: 12px;
          background: transparent;
          box-shadow: none;
          z-index: 20;
        }
        .apply-filters-btn::after{
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          border-bottom: 2px solid #f97316;
          background: linear-gradient(#ffb347, #f79a1f);
          z-index: 1;
        }
        .apply-filters-btn::before{
          content: "";
          position: absolute;
          width: 28px;
          height: 28px;
          left: -14px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          background: linear-gradient(#ffb347, #f79a1f);
          border-bottom: 2px solid #f97316;
          border-bottom-left-radius: 6px;
          z-index: 0;
        }
        .apply-filters-btn:hover{
          box-shadow: 0 14px 30px rgba(0,0,0,.2);
        }
        .apply-filters-btn:hover::after{
          border-bottom-color: #fb923c;
          background: linear-gradient(#ffc064, #f6a13e);
        }
        .apply-filters-btn:hover::before{
          border-bottom-color: #fb923c;
          background: linear-gradient(#ffc064, #f6a13e);
        }
      `}</style>
    </>
  );
}