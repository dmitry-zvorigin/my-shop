// src/components/ui/DropdownSelect.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function DropdownSelect({
  value,
  onChange,
  options,                // [{ value, label }]
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
  placeholder = "Выбрать...",
  labelPrefix,            // например: "Сортировка:"
  // рендеры на всякий случай (опционально)
  renderButtonLabel,      // (currentOption) => ReactNode
  renderOptionLabel,      // (opt) => ReactNode
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);           // highlighted index (для клавиатуры)
  const rootRef = useRef(null);
  const btnRef = useRef(null);

  const byValue = useMemo(() => {
    const map = new Map(options.map(o => [o.value, o]));
    return map;
  }, [options]);

  const current = byValue.get(value) || null;

  // закрытие по клику вне и ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHi(i => Math.min(options.length - 1, (i < 0 ? 0 : i + 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHi(i => Math.max(0, (i < 0 ? options.length - 1 : i - 1)));
      }
      if (e.key === "Enter" && hi >= 0) {
        e.preventDefault();
        const opt = options[hi];
        if (opt) {
          onChange?.(opt.value);
          setOpen(false);
          btnRef.current?.focus();
        }
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, hi, options, onChange]);

  const toggle = () => {
    setOpen(v => {
      const next = !v;
      if (next) {
        const idx = Math.max(0, options.findIndex(o => o.value === value));
        setHi(idx);
      }
      return next;
    });
  };

  return (
    <div ref={rootRef} className="relative inline-flex items-center gap-1">
      {labelPrefix && <span className="text-sm text-gray-600">{labelPrefix}</span>}

      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={clsx(
          "text-sm flex items-center gap-1 hover:text-orange-500 transition outline-none",
          open ? "text-orange-500" : "text-blue-800",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{renderButtonLabel ? renderButtonLabel(current) : (current?.label.toLowerCase() || placeholder)}</span>
        <ChevronDownIcon className={clsx("size-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          className={clsx(
            "absolute top-7 z-20 min-w-72  left-1/2 -translate-x-1/2  max-w-80 max-h-96 overflow-auto rounded-lg  outline-1 outline-gray-200 bg-white shadow",
            menuClassName
          )}
        >
          <ul>
            {options.map((opt, idx) => {
              const selected = opt.value === value;
              const highlighted = idx === hi;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setHi(idx)}
                    onClick={() => { onChange?.(opt.value); setOpen(false); btnRef.current?.focus(); }}
                    className={clsx(
                      "w-full text-left px-4 py-2 text-base flex items-center gap-2 text-gray-800",
                      highlighted && "bg-orange-50",
                      // selected ? "text-orange-600 font-medium" : "",
                      optionClassName
                    )}
                  >
                    {/* псевдо-радио */}
                    <span className={clsx(
                      "inline-block size-4 rounded-full border",
                      selected ? "border-orange-500 border-[5px]" : "border-gray-300"
                    )} />
                    <span>{renderOptionLabel ? renderOptionLabel(opt) : opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
