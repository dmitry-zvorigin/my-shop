import clsx from "clsx";
import { AnimatedCheckbox } from ".";

export default function CheckboxRow({ checked, label, count, onToggle, disabled , className, classText = "text-sm"}) {
  return (
    <button
      type="button"
      onClick={(e) => onToggle?.(!checked, e)}
      disabled={disabled}
      className={clsx("w-full flex items-center gap-2 hover:bg-orange-50 text-left rounded-md", className)}
      aria-pressed={checked}
    >
      <AnimatedCheckbox checked={checked} />
      <span className={clsx("text-gray-800 flex-1", classText)}>{label}</span>
      {typeof count === "number" && <span className="text-xs text-gray-500">{count}</span>}
    </button>
  );
}