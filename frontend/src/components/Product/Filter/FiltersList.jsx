import clsx from "clsx";
import AnimatedCheckbox from "../../ui/AnimatedCheckbox";

export default function FiltersList({
  listRef,
  showAll,
  isOpen,
  hExpanded,
  hCollapsed,
  visible,
  isSelected,
  toggleOne,
  filteredLength,
}) {
  return (
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
          <li key={o.value} data-row="true" className="relative">
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
      {filteredLength === 0 && <li className="px-3 py-2 text-sm text-gray-500">Ничего не найдено</li>}
    </ul>
  );
}


