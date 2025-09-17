import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function FiltersHeader({ title, isOpen, hasSelection, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-2 px-3 py-3 hover:text-orange-500 hover:bg-orange-50 transition"
    >
      <ChevronUpIcon
        className={clsx("size-4 transition-transform", isOpen && "rotate-180", hasSelection && "text-orange-500")}
      />
      <h2 className={clsx("text-base text-start", isOpen ? "font-bold" : " ", hasSelection && "font-bold text-orange-500")}>{title}</h2>
    </button>
  );
}


