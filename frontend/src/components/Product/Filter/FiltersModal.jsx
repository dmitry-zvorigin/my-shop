import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function FiltersModal({ open, onClose, title, initialFocusRef, groups = [], filters=[], renderFilter }) {

  const lastActiveRef = useRef(null);
  const overlayRef = useRef(null);
  
  const groupsSorted = [...groups].sort((a,b)=>(a.order??0)-(b.order??0));

  const filtersByGroup = useMemo(() => {
    const acc = {};
    filters
      .filter(f => (f.showIn?.includes("modal") ?? true))
      .sort((a,b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach(f => {
        const ids = Array.isArray(f.groupIds) ? f.groupIds : [f.groupId];
        ids.forEach(gid => (acc[gid] ||= []).push(f));
      });
    return acc;
  }, [filters]);

  // ESC закрытие
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Лочим скролл и возвращаем фокус
  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => {
      const el = initialFocusRef?.current ?? overlayRef.current?.querySelector("[data-autofocus]");
      el?.focus();
    }, 0);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);


  // --- refs для прокрутки
  const rightPaneRef = useRef(null);              // скроллируемый контейнер справа
  const sectionRefs = useRef({});                 // { [groupId]: HTMLElement }
  const [activeGroupId, setActiveGroupId] = useState(groupsSorted[0]?.id);

  const scrollToGroup = (gid) => {
    const container = rightPaneRef.current;
    const el = sectionRefs.current[gid];
    if (!container || !el) return;
    // точный скролл относительно контейнера (учитывает padding)
    const top = el.offsetTop - container.offsetTop;
    container.scrollTo({ top, behavior: "smooth" });
    setActiveGroupId(gid);
  };

  // scroll-spy: подсветка активной группы при прокрутке справа
  useEffect(() => {
    const root = rightPaneRef.current;
    if (!root) return;
    const onScroll = () => {
      const st = root.scrollTop;
      let bestId, bestDist = Infinity;
      groupsSorted.forEach(g => {
        const gid = g.id;
        const el = sectionRefs.current[gid];
        if (!el) return;
        const top = el.offsetTop - root.offsetTop;
        const dist = Math.abs(top - st);
        if (dist < bestDist) { bestDist = dist; bestId = gid; }
      });
      if (bestId) setActiveGroupId(bestId);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // первичная инициализация
    return () => root.removeEventListener("scroll", onScroll);
  }, [groupsSorted]);

  const labelId = title ? "modal-title-" + String(title).replace(/\s+/g, "-") : undefined;

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      aria-modal="true"
      role="dialog"
      aria-labelledby={labelId}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >

      <div className="absolute inset-0 bg-black/50"/>

      <div className="relative z-10 w-[80%] max-w-[1200px] h-[80vh] rounded-lg bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 backdrop-blur bg-gray-100">
          {title && (
            <h2 id={labelId} className="text-xl font-medium">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="rounded-lg aspect-square size-8 hover:text-gray-400 outline-none"
            aria-label="Закрыть"
            data-autofocus
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* {children ? (
            <div className="h-full">{children}</div>
          ) : ( */}
            <div className="grid grid-cols-[350px_auto_1fr] h-full">

              <div className="min-h-0">
                <div className="h-full min-h-0 flex flex-col">
                  <aside className="min-h-0 overflow-auto flex flex-col" style={{ scrollbarGutter: "stable" }}>
                    {(groupsSorted ?? []).map((g) => (
                      <button 
                        key={g.id ?? g.title} 
                        onClick={() => scrollToGroup(g.id)} 
                        className={clsx(" text-left block w-full rounded-md transition relative py-5 px-10", 
                          activeGroupId == g.id ? 'text-orange-600 font-medium before:absolute before:border-2 before:h-full before:left-0 before:top-0' : '' 
                        )}
                      >
                        {g.title}
                      </button>
                    ))}
                  </aside>

                  <div className="mt-5 flex flex-col gap-2 mx-5">
                    <button
                      className="rounded-lg h-[44px] px-4 text-white bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 transition"
                      onClick={() => {
                        console.log("apply filters (modal)");
                        // setIsAllFiltersOpen(false);
                      }}
                    >
                      Применить
                    </button>
                    <button
                      className="rounded-lg h-[44px] px-4 outline-1 outline-gray-300 hover:bg-gray-100 transition"
                      onClick={() => console.log("reset filters (modal)")}
                    >
                      Сбросить
                    </button>
                  </div>

                </div>
              </div>

              <div className="border-l-[1px] my-2 border-gray-300 mx-2"/>

              <main 
                ref={rightPaneRef}
                className="min-h-0 overflow-auto grid gap-5 p-3" 
                style={{ scrollbarGutter: "stable" }}
              >
                {(groupsSorted ?? []).map((g) => (
                  <section 
                    key={g.id} 
                    data-gid={g.id} 
                    ref={(el) => {
                      if (el) sectionRefs.current[g.id] = el;
                      else delete sectionRefs.current[g.id];
                    }}
                    className="grid gap-5 scroll-mt-4"
                  >
                    <h2 className="py-2 px-2 text-xl font-medium">{g.title}</h2>    
                    <div className="grid grid-cols-2">
                       {(filtersByGroup[g.id] ?? []).map(f => renderFilter(f))}
                    </div>
                  </section>
                ))}
              </main>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>,
    document.body
  )
}