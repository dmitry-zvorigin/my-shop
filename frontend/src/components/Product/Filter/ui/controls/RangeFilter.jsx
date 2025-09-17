import { useEffect, useMemo, useState } from "react";
import { FiltersHeader, FiltersList } from "../panel-parts";
import clsx from "clsx";
import { generatePriceBuckets } from "../panel-parts/generatePriceBuckets";
import { CheckboxRow, Radio } from "../primitives";

export default function RangeFilter({ title, value, onChange, min, max, step, unit, buckets, variant = 'sidebar' }) {
  const [isOpen, setIsOpen] = useState(true);
  const [minStr, setMinStr] = useState(value?.min ?? '');
  const [maxStr, setMaxStr] = useState(value?.max ?? '');

  const noneSelected = value?.min == null && value?.max == null;

    // если пресеты не пришли — сгенерим из min/max
  const presets = useMemo(
    () => buckets?.length ? buckets : generatePriceBuckets(min, max, 6, unit),
    [buckets, min, max, unit]
  );

  useEffect(() => {
    setMinStr(value?.min ?? '');
    setMaxStr(value?.max ?? '');
  }, [value?.min, value?.max]);

  const clamp = (n) => Math.min(Math.max(n, min ?? n), max ?? n);

  const applyInputs = () => {
    const hasMin = minStr !== "" && !Number.isNaN(Number(minStr));
    const hasMax = maxStr !== "" && !Number.isNaN(Number(maxStr));
    if (!hasMin && !hasMax) return onChange?.({ min: null, max: null });
    const next = {
      min: hasMin ? clamp(Math.floor(Number(minStr))) : null,
      max: hasMax ? clamp(Math.floor(Number(maxStr))) : null,
    };
    if (next.min != null && next.max != null && next.min > next.max) {
      // обмен местами
      [next.min, next.max] = [next.max, next.min];
    }
    onChange?.(next);
  };

  const clearRange = () => {
    setMinStr("");
    setMaxStr("");
    // Если ты используешь адаптеры, можешь слать undefined:
    // onChange?.(undefined)
    onChange?.({ min: null, max: null });
  };

  const selectPreset = (p) => onChange?.({ min: p.min, max: p.max });

  const isPresetActive = (p) => value?.min != null && value?.max != null && p.min === value.min && p.max === value.max;

  return (
    <div className="border-b-1 border-gray-300">
      <FiltersHeader         
        title={title}
        onToggle={() => setIsOpen(v => !v)} 
        isOpen={isOpen}
        // hasSelection={hasSelection}
      />
        <div
          className={clsx(
            "overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-[100vh]" : "max-h-0"
          )}
        >
          <div className="grid grid-cols-2 gap-5 mx-2 my-2">
            <InputNumber
              value={minStr}
              placeholder="от"
              onChange={setMinStr}
              onCommit={applyInputs}
              min={min}
              max={max}
            />
            <InputNumber
              value={maxStr}
              placeholder="до"
              onChange={setMaxStr}
              onCommit={applyInputs}
              min={min}
              max={max}
            />
          </div>
          {presets.length > 0 && (
            <ul role="radiogroup">
              <li>
                <Radio selected={noneSelected} label={"Все"} onToggle={clearRange}/>
              </li>
              {presets.map((p) => (
                <li key={p.key}>
                  <Radio selected={isPresetActive(p)} label={p.label} onToggle={() => selectPreset(p)} />
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
}

function InputNumber({
  value,
  onChange,
  onCommit,
  placeholder,
  className = "",
  min,
  max,
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
        "h-10 rounded-lg px-3 outline-1 outline-gray-300",
        "focus:outline-2 focus:outline-orange-300",
        className
      )}
    />
  );
}