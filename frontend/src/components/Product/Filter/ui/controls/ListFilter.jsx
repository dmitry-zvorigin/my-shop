import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import useCollapsibleHeights from "../../useCollapsibleHeights";
import { FiltersFooter, FiltersHeader, FiltersList, FiltersSearch, FiltersSelectAll } from "../panel-parts";

export default function ListFilter({
  title = "",
  options = [],
  value = [],
  onChange,
  defaultOpen = true,
  maxCollapsed = 7, // свернутый режим: столько строк показываем
  showApplyAtEl,
}) {
  // ---- состояние
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);        // визуальное состояние:  max-height = collapsed/expanded
  const [renderAll, setRenderAll] = useState(false);    // что реально рендерим в DOM: только первые или все
  const listRef = useRef(null);
  const selectAllRef = useRef(null);

  // высоты контейнера для плавной анимации
  const [hCollapsed, setHCollapsed] = useState(0);
  const [hExpanded, setHExpanded] = useState(0);

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

  const isSelected = (v) => selectedSet.has(v);

  const nextForOne = (v) => (isSelected(v) ? value.filter(x => x !== v) : [...value, v]);

  // ---- отдельный выбор
  const toggleOne = (v) => (e) => {
    const next = nextForOne(v);
    onChange?.(next);
    const li = e.currentTarget.closest("li");
    showApplyAtEl(li); // ← якорим кнопку к строке сразу
  };

  const { hCollapsed: hC, hExpanded: hE, onToggleShowAll } = useCollapsibleHeights({
    listRef,
    isOpen,
    rowsCollapsed: COLLAPSED_ROWS,
    rowsExpanded: EXPANDED_ROWS,
    isSearching,
    showAll,
    setShowAll,
    renderAll,
    setRenderAll,
  });
  // sync back to local state vars used in styles
  if (hCollapsed !== hC) setHCollapsed(hC);
  if (hExpanded !== hE) setHExpanded(hE);

  return (
    <div className="relative border-b-1 border-gray-300">
      {/* Заголовок/кнопка свёртки */}
      <FiltersHeader
        title={title}
        isOpen={isOpen}
        hasSelection={hasSelection}
        onToggle={() => setIsOpen(v => !v)}
      />

      {/* Тело */}
      <div>
        <div
          className={clsx(
            "overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-[100vh]" : "max-h-0"
          )}
        >
          {/* Поиск */}
          <FiltersSearch value={q} onChange={setQ} show={!hasFewOptions} />

          {/* Выбрать всё (для всех отфильтрованных, видимых и скрытых) */}
          <FiltersSelectAll
            show={!hasFewOptions && !isSearching}
            allSelected={allSelected}
            someSelected={someSelected}
            onToggle={toggleAll}
            selectAllRef={selectAllRef}
          />

          {/* Опции */}
          <FiltersList
            listRef={listRef}
            showAll={showAll}
            isOpen={isOpen}
            hExpanded={hExpanded}
            hCollapsed={hCollapsed}
            visible={visible}
            isSelected={isSelected}
            toggleOne={toggleOne}
            filteredLength={filtered.length}
          />

          {/* Низ: показать всё / сброс */}
          <FiltersFooter
            hasFewOptions={hasFewOptions}
            isSearching={isSearching}
            showAll={showAll}
            onToggleShowAll={onToggleShowAll}
            hasSelection={hasSelection}
            onReset={resetAll}
          />
        </div>
      </div>
      
    </div>
  );
}


// import clsx from "clsx";
// import { useMemo, useRef, useState } from "react";
// import useCollapsibleHeights from "../../useCollapsibleHeights";
// import { FiltersFooter, FiltersHeader, FiltersList, FiltersSearch, FiltersSelectAll } from "../panel-parts";

// export default function ListFilter({
//   title = "",
//   options = [],
//   value = [],
//   onChange,
//   defaultOpen = true,
//   maxCollapsed = 7, // свернутый режим: столько строк показываем
//   showApplyAtEl,
// }) {
//   // ---- состояние
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   const [q, setQ] = useState("");
//   const [showAll, setShowAll] = useState(false);        // визуальное состояние:  max-height = collapsed/expanded
//   const [renderAll, setRenderAll] = useState(false);    // что реально рендерим в DOM: только первые или все
//   const listRef = useRef(null);
//   const selectAllRef = useRef(null);
//   // console.log();
//   // высоты контейнера для плавной анимации
//   const [hCollapsed, setHCollapsed] = useState(0);
//   const [hExpanded, setHExpanded] = useState(0);

//   const COLLAPSED_ROWS = Math.max(1, Math.floor(maxCollapsed));
//   const EXPANDED_ROWS  = COLLAPSED_ROWS + 1;

//   // ---- поиск / фильтрация
//   const filtered = useMemo(() => {
//     const s = q.trim().toLowerCase();
//     if (!s) return options;
//     return options.filter(o => (o.label || "").toLowerCase().includes(s));
//   }, [q, options]);

//   const isSearching   = q.trim().length > 0;
//   const hasSelection  = Array.isArray(value) && value.length > 0;
//   const hasFewOptions = options.length <= COLLAPSED_ROWS;

//   // показываем в DOM либо все, либо только первые N (это важно для плавного "сворачивания")
//   const visible = renderAll ? filtered : filtered.slice(0, COLLAPSED_ROWS);

//   // ---- множества для "Выбрать всё"
//   const selectedSet    = useMemo(() => new Set(value), [value]);
//   const filteredValues = useMemo(() => filtered.map(o => o.value), [filtered]);
//   const filteredSet    = useMemo(() => new Set(filteredValues), [filteredValues]);

//   const selectedInFilteredCount = useMemo(
//     () => filteredValues.reduce((acc, v) => acc + (selectedSet.has(v) ? 1 : 0), 0),
//     [filteredValues, selectedSet]
//   );

//   const orderIndex = useMemo(() => new Map(options.map((o,i)=>[o.value,i])), [options]);
//   const sortByOptions = (arr) => arr.slice().sort((a,b)=>(orderIndex.get(a)??1e9)-(orderIndex.get(b)??1e9));

//   const allSelected  = filteredValues.length > 0 && selectedInFilteredCount === filteredValues.length;
//   const noneSelected = selectedInFilteredCount === 0;
//   const someSelected = !noneSelected && !allSelected;

//   const toggleAll = () => {
//     const next = allSelected
//       ? value.filter(v => !filteredSet.has(v))
//       : sortByOptions(Array.from(new Set([...value, ...filteredValues])));
//     onChange?.(next);
//     showApplyAtEl(selectAllRef.current); // ← якорим к блоку "Выбрать всё"
//   };

//   const resetAll = () => onChange?.([]);

//   const isSelected = (v) => selectedSet.has(v);

//   const nextForOne = (v) => (isSelected(v) ? value.filter(x => x !== v) : [...value, v]);

//   // ---- отдельный выбор
//   const toggleOne = (v) => (e) => {
//     const next = nextForOne(v);
//     onChange?.(next);
//     const li = e.currentTarget.closest("li");
//     showApplyAtEl(li); // ← якорим кнопку к строке сразу
//   };

//   const { hCollapsed: hC, hExpanded: hE, onToggleShowAll } = useCollapsibleHeights({
//     listRef,
//     isOpen,
//     rowsCollapsed: COLLAPSED_ROWS,
//     rowsExpanded: EXPANDED_ROWS,
//     isSearching,
//     showAll,
//     setShowAll,
//     renderAll,
//     setRenderAll,
//   });
//   // sync back to local state vars used in styles
//   if (hCollapsed !== hC) setHCollapsed(hC);
//   if (hExpanded !== hE) setHExpanded(hE);

//   return (
//     <div className="relative">
//       {/* Заголовок/кнопка свёртки */}
//       <FiltersHeader
//         title={title}
//         isOpen={isOpen}
//         hasSelection={hasSelection}
//         onToggle={() => setIsOpen(v => !v)}
//       />

//       {/* Тело */}
//       <div className="px-0">
//         <div
//           className={clsx(
//             "overflow-hidden transition-[max-height] duration-300 ease-in-out",
//             isOpen ? "max-h-[100vh]" : "max-h-0"
//           )}
//         >
//           {/* Поиск */}
//           <FiltersSearch value={q} onChange={setQ} show={!hasFewOptions} />

//           {/* Выбрать всё (для всех отфильтрованных, видимых и скрытых) */}
//           <FiltersSelectAll
//             show={!hasFewOptions && !isSearching}
//             allSelected={allSelected}
//             someSelected={someSelected}
//             onToggle={toggleAll}
//             selectAllRef={selectAllRef}
//           />

//           {/* Опции */}
//           <FiltersList
//             listRef={listRef}
//             showAll={showAll}
//             isOpen={isOpen}
//             hExpanded={hExpanded}
//             hCollapsed={hCollapsed}
//             visible={visible}
//             isSelected={isSelected}
//             toggleOne={toggleOne}
//             filteredLength={filtered.length}
//           />

//           {/* Низ: показать всё / сброс */}
//           <FiltersFooter
//             hasFewOptions={hasFewOptions}
//             isSearching={isSearching}
//             showAll={showAll}
//             onToggleShowAll={onToggleShowAll}
//             hasSelection={hasSelection}
//             onReset={resetAll}
//           />
//         </div>
//       </div>
      
//     </div>
//   );
// }