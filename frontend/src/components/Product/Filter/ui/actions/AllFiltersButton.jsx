import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function AllFiltersButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "h-[44px] w-full flex items-center justify-center gap-2",
        "text-blue-600 hover:text-orange-500 transition outline-none",
        className
      )}
    >
      <span>Все фильтры</span>
      <ArrowRightIcon className="size-4" />
    </button>
  );
}