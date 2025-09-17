import clsx from "clsx";

export default function Radio({ selected, onToggle, label, className }) {

  return (
  <button
    type="button"
    role="option"
    aria-selected={selected}
    onClick={onToggle}
    className={clsx(
      "w-full text-left px-3 py-2 text-base flex items-center gap-2 text-gray-800 hover:bg-orange-50",
      className
    )}
  >
    {/* псевдо-радио */}
    <span className={clsx(
      "inline-block size-4 rounded-full border",
      selected ? "border-orange-500 border-[5px]" : "border-gray-300"
    )} />
    <span className={clsx("text-sm text-gray-800 flex-1")}>{label}</span>
  </button>
  );
}