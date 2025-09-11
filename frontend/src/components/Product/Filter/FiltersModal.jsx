import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function FiltersModal({ open, onClose, title, children, initialFocusRef, groups, renderGroups }) {

  const lastActiveRef = useRef(null);
  const overlayRef = useRef(null);
  
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

  if (!open) return null;

  const labelId = title ? "modal-title-" + String(title).replace(/\s+/g, "-") : undefined;

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
          {children ? (
            <div className="h-full">{children}</div>
          ) : (
            <div className="grid grid-cols-[auto_1fr] gap-5 h-full p-5">

              <div className="min-h-0">
                <div className="h-full min-h-0 flex flex-col">
                  <div className="min-h-0 overflow-auto">
                    {(groups ?? []).map((g) => (
                      <div key={g.id ?? g.title} className="py-2 px-2 cursor-pointer">{g.title}</div>
                    ))}
                  </div>

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

              <div className="min-h-0 overflow-auto">
                {(groups ?? []).map((g) => (
                  <div>
                    <h2 key={g.id ?? g.title} className="py-2 px-2 text-xl font-medium">{g.title}</h2>    
                    <div className="grid grid-cols-2">
                      {/* Сюда должны быть опции определенной группы */}
                    </div>
                  </div>
                  
                  
                ))}
                {renderGroups}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}