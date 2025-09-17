import { useEffect, useMemo, useState } from "react";
import { FiltersFooter, FiltersHeader } from "../panel-parts";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckboxRow } from "../primitives";
import { generatePriceBuckets } from "../panel-parts/generatePriceBuckets";

// TODO
// price=499-4000,4001-6000

export default function PriceFilter({ title, value = [], onChange, min, max, buckets, unit, showApplyAtEl }) {
  const [isOpen, setIsOpen] = useState(true);
  const [minStr, setMinStr] = useState("");
  const [maxStr, setMaxStr] = useState("");

  const presets = useMemo(
    () => (buckets?.length ? buckets : generatePriceBuckets(min, max, 6, unit)),
    [buckets, min, max, unit]
  );

  // Синхронизируем внутренние строки при изменении внешнего value
  useEffect(() => {
    // value — массив выбранных диапазонов
    const isSingle = value.length === 1;
  
    // Совпадает ли единственный диапазон с каким-либо пресетом?
    const matchesAnyPreset =
      isSingle &&
      presets.some(p =>
        (p.min ?? null) === (value[0]?.min ?? null) &&
        (p.max ?? null) === (value[0]?.max ?? null)
      );
  
    if (isSingle && !matchesAnyPreset) {
      // Один кастомный диапазон — показываем его в инпутах
      setMinStr(value[0]?.min ?? "");
      setMaxStr(value[0]?.max ?? "");
    } else {
      // Либо пресеты (один/несколько), либо пусто — инпуты чистые
      setMinStr("");
      setMaxStr("");
    }
  }, [value, presets]);

  const clamp = (n) => {
    const lowerBound = min ?? n;
    const upperBound = max ?? n;
    return Math.min(Math.max(n, lowerBound), upperBound);
  };

  const rangesEqual = (a, b) =>
    (a?.min ?? null) === (b?.min ?? null) && (a?.max ?? null) === (b?.max ?? null);

  // Текущие выбранные пресеты считаем из value (источник правды — value)
  const selectedPresetKeys = useMemo(() => {
    const keys = new Set();
    for (const r of value) {
      const match = presets.find(
        (p) => rangesEqual({ min: p.min ?? null, max: p.max ?? null }, r)
      );
      if (match) keys.add(match.key);
      else {
        // Если есть кастомный диапазон — никакие чекбоксы не должны светиться
        return new Set(); 
      }
    }
    return keys;
  }, [value, presets]);

  // Ввод в инпут: очищаем чекбоксы (фактически заменяем value на один кастомный диапазон)
  const addTyped = (minS = minStr, maxS = maxStr) => {
    const hasMin = minS !== "" && !Number.isNaN(Number(minS));
    const hasMax = maxS !== "" && !Number.isNaN(Number(maxS));
    if (!hasMin && !hasMax) {
      // Полная очистка
      setMinStr("");
      setMaxStr("");
      onChange?.([]);
      return;
    }

    let localMin = hasMin ? clamp(Math.floor(Number(minS))) : null;
    let localMax = hasMax ? clamp(Math.floor(Number(maxS))) : null;

    if (localMin != null && localMax != null && localMin > localMax) {
      [localMin, localMax] = [localMax, localMin];
    }

    setMinStr(localMin == null ? "" : String(localMin));
    setMaxStr(localMax == null ? "" : String(localMax));

    // Кастомный диапазон всегда заменяет пресеты
    onChange?.([{ min: localMin, max: localMax }]);
  };

  // Тоггл пресета: очищаем инпуты и формируем массив диапазонов из отмеченных чекбоксов
  const togglePreset = (p, checked, e) => {
    // 1) очищаем инпуты визуально
    setMinStr("");
    setMaxStr("");

    // 2) строим новое множество выбранных ключей
    const nextKeys = new Set(selectedPresetKeys);
    // console.log(selectedPresetKeys);
    if (checked) nextKeys.add(p.key);
    else nextKeys.delete(p.key);

    // 3) пересчитываем value как массив диапазонов из пресетов
    if (nextKeys.size === 0) {
      onChange?.([]);
      // TODO
      const li = e?.currentTarget?.closest?.("li");
      showApplyAtEl?.(li);
      return;
    }
    const nextRanges = presets
      .filter((x) => nextKeys.has(x.key))
      .map((x) => ({ min: x.min ?? null, max: x.max ?? null }));

    onChange?.(nextRanges);
    const li = e?.currentTarget?.closest?.("li");
    showApplyAtEl?.(li); // ← якорим кнопку к строке сразу
  };

  const handleReset = () => {
    setMinStr("");
    setMaxStr("");
    onChange?.([]);
  };

  return (
    <div className="border-b-1 border-gray-300">
      <FiltersHeader         
        title={title}
        onToggle={() => setIsOpen(v => !v)} 
        isOpen={isOpen}
        hasSelection={value.length > 0}
      />
        <div
          className={clsx(
            "overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-[100vh]" : "max-h-0"
          )}
          style={{
            scrollbarGutter: "stable",
          }}
        >
          <div className="grid grid-cols-2 gap-5 mx-2 my-2">
            <InputNumber
              value={minStr}
              placeholder={'от ' + min}
              onChange={setMinStr}
              onCommit={() => addTyped(minStr, maxStr)}
              onClear={() => { setMinStr(''); addTyped('', maxStr); }}
            />
            <InputNumber
              value={maxStr}
              placeholder={'до ' + max}
              onChange={setMaxStr}
              onCommit={() => addTyped(minStr, maxStr)}
              onClear={() => { setMaxStr(''); addTyped(minStr, ''); }}
            />
          </div>

          {presets.length > 0 && (
            <ul role="checkgroup">
              {presets.map((p) => (
                <li key={p.key}>
                  <CheckboxRow 
                    label={p.label} 
                    checked={selectedPresetKeys.has(p.key)} 
                    onToggle={(checked, e) => togglePreset(p, checked, e)} 
                    className="px-3 py-2"
                  />
                </li>
              ))}
            </ul>
          )}

          <FiltersFooter
            hasFewOptions={false}
            isSearching={true}
            showAll={false}
            onReset={handleReset}
            hasSelection={value.length > 0}
          />
        </div>
    </div>
  );
}

function InputNumber({
  value,
  onChange,
  onCommit,
  onClear,
  placeholder,
  className = "",
}) {
  const handleChange = (e) => {
    // оставляем только цифры
    const cleaned = e.target.value.replace(/\D/g, "");
    onChange?.(cleaned);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onCommit?.();
  };

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onBlur={onCommit}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className={clsx(
          "h-10 w-full rounded-lg pr-8 pl-3 outline-1 outline-gray-300",
          className
        )}
      />
      {!!value && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClear}
          aria-label="Очистить"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="size-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}